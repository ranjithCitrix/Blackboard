import { Dictionary, FunctionArgs, IClient } from 'src/sdk/script-api-types';
import * as base64Encoder from '../../../commons/src/lib/encoding-utils';
import { getSuccessJson, handleErrorWithLogging } from '../../../commons/src/lib/validation';
import { transformQuery } from './queryTransform';
import { mapResponseAttributes } from './responseTransform';
import { validateRequest } from '../../../commons/src/lib/ssql-validation';
import { badRequest, processUnauthorizedResponse, withHttpResponse } from '../../../commons/src/lib/httpResponse';
import graphRequest from './graphRequest';
import { BASE_URL, ENDPOINT_URL } from './constants';

const _ = library.load('lodash');

export async function searchByRequestInternal({ client, parameters }: FunctionArgs): Promise<any> {
	const ssqlRequestStr = base64Encoder.decodeContent(parameters.requestBody);
	const ssqlRequest = JSON.parse(ssqlRequestStr);

	const validationResult = validateRequest(ssqlRequest);
	if (validationResult.filter((result) => !!result.error).length > 0) {
		return badRequest({
			error: {
				message: 'Request contains validation errors. Unable to continue.',
				errors: validationResult.filter((result) => !!result.error),
				warning: validationResult.filter((result) => !!result.warning)
			}
		});
	} else if (validationResult.filter((result) => !!result.warning).length > 0) {
		validationResult.filter((result) => !!result.warning).forEach(({ warning, message }) => {
			console.warn(`Request validation contains warning: code=${warning}, message=${message}`);
		});
	}

	const graphQuery = transformQuery(ssqlRequest.query);
	const url = getSearchUri();
	const queryString = await getQueryString(graphQuery, client);
	const requestBody = graphRequest(queryString, ssqlRequest.options);

	return client
		.fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		})
		.then(processUnauthorizedResponse)
		.then(getSuccessJson(`Graph request to '${url}' failed`))
		.then(mapResponseAttributes(ssqlRequest))
		.then(postProcessAttributes(ssqlRequest, client))
		.then((results) => ({ results }))
		.then(JSON.stringify);
}

function postProcessAttributes(ssqlRequest: any, client: IClient): (results: any[]) => Promise<any[]> {
	return (results: any[]) => {
		// To update the web URL(Preview URL)
		return updateWebURL(client, results);
	};
}

function updateWebURL(client: IClient, results: any[]): Promise<any[]> {
	return fetchDriveItems(client, results).then(mapDriveItemToWebURL(results));
}

function mapDriveItemToWebURL(results: any[]): (driveItems: Dictionary) => any[] {
	return (driveItems: Dictionary) =>
		results.map((result) => {
			const parentWebUrl = driveItems[result.itemId];
			if (parentWebUrl && result.mimeType != 'Document') {
				const path = parentWebUrl;
				return { ...result, path };
			} else return result;
		});
}

async function fetchDriveItems(client: IClient, results: any[]): Promise<Dictionary> {
	const request = _.uniq(results.map((item) => item))
		.filter((item: any) => {
			if (item.parentId && item.siteId && item.itemId) return true;
			else return false;
		})
		.map((item: any) => ({
			url: `/sites/${item.siteId}/drive/items/${item.parentId}/children`,
			method: 'GET',
			id: item.itemId
		}));

	if (request.length === 0) {
		// Graph API cannot handle empty batch request
		return Promise.resolve({});
	}

	let index = 0;
	let size = 20;
	let batchRequest: Dictionary = [];

	// Graph API can handle batch request only upto 20 (requests/batch API call)
	do {
		const requests = request.slice(index, size);
		const url = `${BASE_URL}/$batch`;
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ requests })
		};
		await client
			.fetch(url, options)
			.then(getSuccessJson(handleErrorWithLogging(`Can't fetch drive items for updating webURL`)))
			.then(({ responses }: { responses: any[] }) => {
				responses.forEach((value) => {
					batchRequest.push(value);
				});
			});
		index = size;
		size = size + 20;
	} while (index < request.length);

	return batchRequest
		.map(({ id, body: { value } }: any) => ({ id, value }))
		.filter((result: any) => {
			if (result.value) return true;
			else return false;
		})
		.map(({ id, value }: any) => {
			return value
				.map((value: any) => {
					return { id: id, webUrl: value.webUrl, eTag: value.eTag };
				})
				.filter((val: any) => {
					if (val.eTag.includes(id)) return true;
					else return false;
				});
		})
		.reduce((acc: { [key: string]: string }, value: any) => {
			acc[value[0].id] = value[0].webUrl;
			return acc;
		}, {});
}

export const searchByRequest = withHttpResponse(searchByRequestInternal);

function getSearchUri(): string {
	return `${BASE_URL}${ENDPOINT_URL}`;
}

async function getQueryString(query: string, client: IClient) {
	const req = await client
		.fetch(`${BASE_URL}/sites/root`)
		.then(getSuccessJson(`Graph request to '${BASE_URL}/sites/root' failed`))
		.then((results) => ({ results }));

	return `${query} path:\"${req.results.webUrl}\"`;
}
// ./run.bat exec -fn searchByRequest  --config ..\local\config.json ..\dist\script.js
