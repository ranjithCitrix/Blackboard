import { transformResponseAttributes } from './attributesTransform';
import { ResponseAttributesMapping } from './constants';
import { ContentType } from '../../../commons/src/lib/ssql-constants';

export function mapResponseAttributes(request) {
	return (response) => {
		try {
			let resources = '';

			response.value.map((value) => {
				value.hitsContainers.map((hitsValue) => {
					resources = getArrayOrElseEmpty(hitsValue.hits).map(flatten);
				});
			});

			const resultAttributes = transformResponseAttributes(request);

			return resources.map((resource) => {
				const result = Object.entries(resource)
					.map(([ graphAttr, value ]) => {
						if (resultAttributes.includes(graphAttr.slice(9))) {
							const citrixAttr = ResponseAttributesMapping.findKeyForValue(graphAttr.slice(9));
							return [ citrixAttr, value ];
						} else {
							return [];
						}
					})
					.filter((entry) => entry.length > 0)
					.reduce((acc, [ k, v ]) => {
						acc[k] = v;
						return acc;
					}, {});

				return {
					...result,
					foundIn: foundIn(result),
					// contentType is mandatory attribute which must be always present
					// contentType is not available in the response and must be determined
					contentType: contentType(result)
				};
			});
		} catch (e) {
			throw new Error(`mapResponseAttributes Error ${e.message} ${e.stack}`);
		}
	};
}

function getArrayOrElseEmpty(object) {
	return Array.isArray(object) ? object : [];
}

function getKey(key, keyPrefix) {
	if (keyPrefix) {
		return `${keyPrefix}.${key}`;
	} else {
		return key;
	}
}

function setObjectValueWithPrefix(rootAcc, prefix, obj) {
	return Object.entries(obj).forEach(([ key, value ]) => {
		if (isObject(value)) {
			setObjectValueWithPrefix(rootAcc, getKey(key, prefix), value);
		} else {
			rootAcc[getKey(key, prefix)] = value;
		}
	});
}

export function flatten(obj) {
	return Object.entries(obj).reduce((acc, [ key, value ]) => {
		if (isObject(value)) {
			setObjectValueWithPrefix(acc, key, value);
		} else if (value != null) {
			acc[key] = value;
		}
		return acc;
	}, {});
}

function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

function contentType(resource) {
	if (resource.mimeType.includes('Folder')) return ContentType.FOLDER;
	else return ContentType.FILE;
}

function foundIn(resource) {
	const parentWebUrl = resource.path;
	const protocolMatches = parentWebUrl.match(/^([^:]+:\/\/)(.*)$/);
	const foundIn = Array.isArray(protocolMatches) && protocolMatches.length === 3 ? protocolMatches[2] : parentWebUrl;
	return foundIn;
}
