import { CitrixRequestAttributes, DEFAULT_RESULTS } from '../../../commons/src/lib/ssql-constants';

export function transformQuery(query) {
	const { and, or, equals, ftcontains } = query;
	if (Array.isArray(or)) {
		return transformArrayExpression('OR', or);
	} else if (Array.isArray(and)) {
		return transformArrayExpression('AND', and);
	} else if (equals) {
		if (equals.attr === CitrixRequestAttributes.file) {
			return equals.value;
		} else {
			throw new Error(`Unsupported attribute in equals: ${equals.attr}`);
		}
	} else if (ftcontains) {
		if (ftcontains.attr === CitrixRequestAttributes.file || ftcontains.attr == null) {
			return ftcontains.value;
		} else {
			throw new Error(`Unsupported attribute in ftcontains: ${ftcontains.attr}`);
		}
	} else {
		throw new Error(`Unsupported tokens in query: ${Object.keys(query)}`);
	}
}

function transformArrayExpression(operatorName, expressions) {
	if (expressions.length === 0) {
		return '';
	} else {
		const result = expressions.map(transformQuery).join(` ${operatorName} `);
		if (expressions.length === 1) {
			return result;
		} else {
			return `(${result})`;
		}
	}
}

export function extractPagination(requestOptions) {
	const { page } = requestOptions || {};
	const { from: reqFrom, size: reqSize } = page || {};
	const from = parseInt(reqFrom, 10);
	const size = parseInt(reqSize, 10);
	return {
		from: !Number.isNaN(from) ? from : 1,
		size: !Number.isNaN(size) ? size : DEFAULT_RESULTS
	};
}
