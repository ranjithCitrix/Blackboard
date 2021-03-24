import chai, { expect } from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import _cloneDeep from 'lodash/cloneDeep';
import defaultRequest from '../../../commons/test/request-examples/citrixRequest1.json';
import { transformResponseAttributes } from './attributesTransform';
import { CitrixResponseAttributeNames } from '../../../commons/src/lib/ssql-constants';
import { GraphResponseAttributeNames } from './constants';

chai.use(deepEqualInAnyOrder);

describe('src/script/attributeTransform#transformRequestAttributes', () => {
	it('Maps all supported attributes', () => {
		const request = _cloneDeep(defaultRequest);
		request.return.attributes = CitrixResponseAttributeNames;
		expect(transformResponseAttributes(request)).to.be.deep.equalInAnyOrder(GraphResponseAttributeNames);
	});

	it('When attributes is empty then return all possible attributes', () => {
		const request = _cloneDeep(defaultRequest);
		request.return.attributes = [];
		expect(transformResponseAttributes(request)).to.be.deep.equalInAnyOrder(GraphResponseAttributeNames);
	});

	it('When not specified in the query then return all possible attributes', () => {
		const request = _cloneDeep(defaultRequest);
		request.return.attributes = undefined;
		expect(transformResponseAttributes(request)).to.be.deep.equalInAnyOrder(GraphResponseAttributeNames);
	});

	it('When return is not specified then return all possible attributes', () => {
		const request = _cloneDeep(defaultRequest);
		request.return = undefined;
		expect(transformResponseAttributes(request)).to.be.deep.equalInAnyOrder(GraphResponseAttributeNames);
	});

	it('Ignore unknown attributes', () => {
		const request = _cloneDeep(defaultRequest);
		request.return.attributes = [ 'hello', ...CitrixResponseAttributeNames, 'world' ];
		expect(transformResponseAttributes(request)).to.be.deep.equalInAnyOrder(GraphResponseAttributeNames);
	});
});
