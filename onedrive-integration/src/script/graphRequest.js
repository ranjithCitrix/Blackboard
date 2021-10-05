import { extractPagination } from './queryTransform';

const template = {
	entityTypes: [ 'listItem' ],
	query: {},
	fields: [ 'id', 'fileName', 'createdDateTime', 'webUrl', 'createdBy', 'parentReference', 'size', 'mimeType' ],
	from: 0,
	size: 9
};

export default function(queryString, options, fields) {
	const { from, size } = extractPagination(options);
	return {
		requests: [
			{
				...template,
				query: { ...template.query, queryString },
				fields: Array.isArray(fields) && fields.length > 0 ? fields : template.fields,
				from: from,
				size: size
			}
		]
	};
}
