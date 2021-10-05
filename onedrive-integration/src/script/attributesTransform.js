import {GraphResponseAttributeNames, ResponseAttributesMapping} from './constants'
import {CitrixResponseAttributes} from "../../../commons/src/lib/ssql-constants";

const _ = library.load('lodash')

export function transformResponseAttributes(request) {
    // 1) ensure that required attribute itemId is always present
    // 2) parentReference.id is for resolving foundIn attribute
    return _.uniq([
        ...optionalAttributes(request),
        ResponseAttributesMapping[CitrixResponseAttributes.itemId],
        ResponseAttributesMapping[CitrixResponseAttributes.parentId]
    ])
}

function optionalAttributes(request) {
    const {attributes} = request?.return ?? {}
    if (attributes == null || (Array.isArray(attributes) && attributes.length === 0)) {
        return GraphResponseAttributeNames
    } else {
        return attributes.map(attr => ResponseAttributesMapping.findValue(attr)).filter(attr => !!attr)
    }
}