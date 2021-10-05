import {transformResponseAttributes} from './attributesTransform'
import {ResponseAttributesMapping} from './constants'
import {ContentType} from "../../../commons/src/lib/ssql-constants";

export function mapResponseAttributes(request) {
    return response => {
        try {
            const resources = getArrayOrElseEmpty(response.value)
                .map(flatten)

            const resultAttributes = transformResponseAttributes(request)

            return resources.map(resource => {
                const result = Object.entries(resource).map(([graphAttr, value]) => {
                    if (resultAttributes.includes(graphAttr)) {
                        const citrixAttr = ResponseAttributesMapping.findKeyForValue(graphAttr)
                        // FIXME convert size, date format?
                        return [citrixAttr, value]
                    } else {
                        return []
                    }
                })
                    .filter(entry => entry.length > 0)
                    .reduce((acc, [k, v]) => {
                        acc[k] = v;
                        return acc;
                    }, {})
                return ({
                    ...result,

                    // contentType is mandatory attribute which must be always present
                    // contentType is not available in the response and must be determined
                    contentType: contentType(resource),
                })
            })
        } catch (e) {
            throw new Error(`mapResponseAttributes Error ${e.message} ${e.stack}`)
        }
    }
}

function getArrayOrElseEmpty(object) {
    return Array.isArray(object) ? object : []
}

function getKey(key, keyPrefix) {
    if (keyPrefix) {
        return `${keyPrefix}.${key}`
    } else {
        return key
    }
}

function setObjectValueWithPrefix(rootAcc, prefix, obj) {
    return Object.entries(obj)
        .forEach(([key, value]) => {
            if (isObject(value)) {
                setObjectValueWithPrefix(rootAcc, getKey(key, prefix), value)
            } else {
                rootAcc[getKey(key, prefix)] = value
            }
        })
}

export function flatten(obj) {
    return Object.entries(obj)
        .reduce((acc, [key, value]) => {
            if (isObject(value)) {
                setObjectValueWithPrefix(acc, key, value)
            } else if (value != null) {
                acc[key] = value
            }
            return acc
        }, {})
}

// TODO replace with _.isObject()
function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function isType(type) {
    return name => name.match(new RegExp(type, "i"))
}

function isProperty(type, propertyNames) {
    return propertyNames.find(isType(type)) !== undefined
}

function contentType(resource) {
    const propertyNames = Object.keys(resource)
    if (isProperty('folder', propertyNames)) {
        return ContentType.FOLDER
    } else if (isProperty('file', propertyNames)) {
        return ContentType.FILE
    } else {
        const defaultResult = ContentType.FILE
        console.warn(`Can't detect contentType for resource id=${resource.id}, returning ${defaultResult}`)
        return defaultResult
    }
}