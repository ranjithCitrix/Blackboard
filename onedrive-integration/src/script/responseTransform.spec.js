import chai, { expect } from 'chai';
import equalInAnyOrder from 'deep-equal-in-any-order';

import { flatten, mapResponseAttributes } from './responseTransform';
import request from '../../../commons/test/request-examples/citrixRequest1.json';
import response from '../../test/response-examples/bookSearchResponse.json';

chai.use(equalInAnyOrder);

describe('src/script/responseTransform#mapResponseAttributes', () => {
	it('Happy path, all possible attributes', () => {
		const expected = {
			contentType: 'folder',
			creator: 'Adele Vance',
			foundIn: 'iwsbeta2.sharepoint.com/sites/NewTeam/SiteAssets/NewTeam Notebook',
			itemId: '65E0D32C-9A2A-42E5-8E37-2CA9FE96C92D',
			mimeType: 'Folder',
			parentId: '01L6E5QHJRUGZR7ISHR5BJ5KLJMWZ27NVX',
			path: 'https://iwsbeta2.sharepoint.com/sites/NewTeam/SiteAssets/NewTeam Notebook',
			siteId: 'iwsbeta2.sharepoint.com,27a5118f-1573-4200-bd52-d89280a70701,e61c5b9d-20f7-4afd-ad71-2c43648581e1',
			size: 0,
			title: 'NewTeam Notebook',
			uploadDate: '2020-06-01T10:40:14Z'
		};
		expect(mapResponseAttributes(request)(response)).to.be.deep.equalInAnyOrder([ expected ]);
	});
	it('flatten 1st level', () => {
		const obj = { a: 1 };
		expect(flatten(obj)).to.be.deep.equal(obj);
	});

	it('flatten 2st level', () => {
		const obj = { a: 1, b: { c: '123' } };
		expect(flatten(obj)).to.be.deep.equal({ a: 1, 'b.c': '123' });
	});

	it('flatten 3rd level', () => {
		const obj = { a: { b: { c: { d: '123' } } } };
		expect(flatten(obj)).to.be.deep.equal({ 'a.b.c.d': '123' });
	});

	it('flatten 4th level', () => {
		const obj = { a: { b: { c: { d: { e: '123' } } } } };
		expect(flatten(obj)).to.be.deep.equal({ 'a.b.c.d.e': '123' });
	});
});
