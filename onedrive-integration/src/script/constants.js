import { CitrixRequestAttributes, CitrixResponseAttributes } from '../../../commons/src/lib/ssql-constants';

/**
 * Citrix request attribute => Graph attribute
 */
export const RequestAttributesMapping = {
	[CitrixRequestAttributes.file]: 'filename',
	[CitrixRequestAttributes.title]: 'title',
	[CitrixRequestAttributes.path]: 'filename',
	[CitrixRequestAttributes.creator]: 'createdBy',
	[CitrixRequestAttributes.uploadDate]: 'createdDateTime',
	[CitrixRequestAttributes.size]: 'size'
};
export const BASE_URL = 'https://graph.microsoft.com/v1.0';
export const ENDPOINT_URL = '/search/query';

export const GraphRequestAttributeNames = Object.values(RequestAttributesMapping);

// placeholder to have one source of attribute names even if their value is generated/derived.
const GENERATED_VALUE = '__generated_value__';

/**
 * Citrix response attribute => Graph attribute
 * Only static attributes, dynamic attributes contentType, foundIn is added on the fly.
 */
export const ResponseAttributesMapping = {
	[CitrixResponseAttributes.itemId]: 'id',
	[CitrixResponseAttributes.contentType]: GENERATED_VALUE,
	[CitrixResponseAttributes.foundIn]: GENERATED_VALUE,
	[CitrixResponseAttributes.mimeType]: 'fields.mimeType',
	[CitrixResponseAttributes.title]: 'fields.fileName',
	[CitrixResponseAttributes.path]: 'webUrl',
	[CitrixResponseAttributes.creator]: 'createdBy.user.displayName',
	[CitrixResponseAttributes.uploadDate]: 'createdDateTime',
	[CitrixResponseAttributes.size]: 'fields.size',
	[CitrixResponseAttributes.parentId]: 'parentReference.id',
	siteId: 'parentReference.siteId',
	findKeyForValue: function(value) {
		const result = Object.entries(this)
			.filter(([ _, graphAttr ]) => value === graphAttr)
			.map(([ citrixAttr ]) => citrixAttr)[0];
		if (result === undefined) throw new Error(`ResponseAttributesMapping element not found by value = ${value}`);
		return result;
	},
	findValue: function(key) {
		const value = this[key];
		return value !== GENERATED_VALUE ? value : undefined;
	}
};

export const GraphResponseAttributeNames = Object.values(ResponseAttributesMapping).filter(
	(name) => name !== GENERATED_VALUE && typeof name !== 'function'
);
