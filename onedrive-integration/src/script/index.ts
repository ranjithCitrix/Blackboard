import {Dictionary, FunctionArgs, IClient} from 'src/sdk/script-api-types'
import * as base64Encoder from "../../../commons/src/lib/encoding-utils";
import {getSuccessJson, handleErrorWithLogging} from '../../../commons/src/lib/validation'
import {transformQuery} from './queryTransform'
import {mapResponseAttributes} from './responseTransform'
import {validateRequest} from '../../../commons/src/lib/ssql-validation'
import {badRequest, processUnauthorizedResponse, withHttpResponse} from '../../../commons/src/lib/httpResponse'

const _ = library.load('lodash')

const BASE_URL = 'https://graph.microsoft.com/v1.0'

export async function searchByRequestInternal({client, parameters}: FunctionArgs): Promise<any> {
    console.log(JSON.stringify(parameters.requestBody));
    
    const ssqlRequestStr = base64Encoder.decodeContent(parameters.requestBody)
    const ssqlRequest = JSON.parse(ssqlRequestStr)

    const validationResult = validateRequest(ssqlRequest)
    if (validationResult.filter(result => !!result.error).length > 0) {
        return badRequest({
            error: {
                message: 'Request contains validation errors. Unable to continue.',
                errors: validationResult.filter(result => !!result.error),
                warning: validationResult.filter(result => !!result.warning),
            }
        })
    } else if (validationResult.filter(result => !!result.warning).length > 0) {
        // TODO return warning in response metadata or in headers
        validationResult.filter(result => !!result.warning).forEach(({warning, message}) => {
            console.warn(`Request validation contains warning: code=${warning}, message=${message}`)
        })
    }

    const graphQuery = transformQuery(ssqlRequest.query)
    const url = getSearchUri(graphQuery)
    return client.fetch(url)
        .then(processUnauthorizedResponse)
        .then(getSuccessJson(`Graph request to '${url}' failed`))
        .then(mapResponseAttributes(ssqlRequest))
        .then(postProcessAttributes(ssqlRequest, client))
        .then(results => ({results}))
        .then(JSON.stringify)
}

function postProcessAttributes(ssqlRequest: any, client: IClient): (results: any[]) => Promise<any[]> {
    return (results: any[]) => {
        // TODO do nothing when foundIn is not required in the ssqlRequest
        return appendFoundInAttribute(client, results)
    }
}

function appendFoundInAttribute(client: IClient, results: any[]): Promise<any[]> {
    
    return fetchDriveItems(client, results)
        .then(mapDriveItemToFoundId(results))
}

function mapDriveItemToFoundId(results: any[]): (driveItems: Dictionary) => any[] {
    
    
    return (driveItems: Dictionary) => results.map(result => {
        const parentWebUrl = driveItems[result.parentId]
        console.log(`parentweb-> ${JSON.stringify(driveItems)}`);
        
        if (parentWebUrl) {
            
            const protocolMatches = parentWebUrl.match(/^([^:]+:\/\/)(.*)$/)
            const foundIn = Array.isArray(protocolMatches) && protocolMatches.length === 3
                ? protocolMatches[2]
                : parentWebUrl
            return {...result, foundIn}
        } else {
            return result
        }
    })
}

function fetchDriveItems(client: IClient, results: any[]): Promise<Dictionary> {
    const requests = _.uniq(results.map(({parentId}) => parentId))
        .filter((parentId: string) => {
            if (parentId) {
                return true;
            } else {
                console.warn(`postProcessAttributes - checking parentIds and found empty id, probably 'parentId' attribute mapping error?`)
                return false;
            }
        })
        .map((parentId: string) => ({url: `/me/drive/items/${parentId}`, method: 'GET', id: parentId}))

    if (requests.length === 0) {
        // Graph API cannot handle empty batch request
        return Promise.resolve({})
    }

    const url = `${BASE_URL}/$batch`
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({requests})
    }
    return client.fetch(url, options)
        .then(getSuccessJson(handleErrorWithLogging(`Can't fetch drive items for resolving folder names`)))
        .then(({responses}: { responses: any[] }) => {
            console.log(`responses-> ${JSON.stringify(responses)}`);
            
            return responses.map(({id, body: {webUrl}}: any) => ({
                id,
                webUrl,
            }))
                .reduce((acc: { [key: string]: string }, {id, webUrl}) => {
                    console.log(`acc ${JSON.stringify(acc)}`);
                    
                    acc[id] = webUrl
                    return acc;
                }, {})
        })
}

export const searchByRequest = withHttpResponse(searchByRequestInternal)

export function debug({parameters}: FunctionArgs): string {
    console.log('Got parameters', JSON.stringify(parameters))
    return JSON.stringify(parameters)
}

function getSearchUri(query: string): string {
    return `${BASE_URL}/me/drive/search(q='${query}')`
}

// ./run.bat exec -fn searchByRequestInternal  --config ..\local\onedrive_config.json ..\dist\script.js