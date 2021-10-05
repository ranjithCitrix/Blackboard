import chai, {expect} from 'chai'
import equalInAnyOrder from 'deep-equal-in-any-order'

import {flatten, mapResponseAttributes} from './responseTransform'
import request from '../../../commons/test/request-examples/citrixRequest1.json'
import response from '../../test/response-examples/bookSearchResponse.json'

chai.use(equalInAnyOrder)

describe('src/script/responseTransform#mapResponseAttributes', () => {
    it('Happy path, all possible attributes', () => {
        const expected = {
            itemId: '01TLHSDBXUZJT3HRKYKJF2KXEFJHRWXDVU',
            // TODO remove parentId which is not required in the result?
            parentId: "01TLHSDBV6Y2GOVW7725BZO354PWSELRRZ",
            contentType: 'file',
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            creator: 'Paul Atreides',
            title: 'Book.xlsx',
            size: 8395,
            path: 'https://citrixiwsdev-my.sharepoint.com/personal/manager_citrixiwsdev_onmicrosoft_com/_layouts/15/Doc.aspx?sourcedoc=%7BB367CAF4-58C5-4B52-A55C-8549E36B8EB4%7D&file=Book.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1',
            uploadDate: '2021-02-16T12:00:00Z'
        }
        expect(mapResponseAttributes(request)(response)).to.be.deep.equalInAnyOrder([expected])
    })
    // TODO move to some utils
    it('flatten 1st level', () => {
        const obj = {a: 1}
        expect(flatten(obj)).to.be.deep.equal(obj)
    })
    it('flatten 2st level', () => {
        const obj = {a: 1, b: {c: '123'}}
        expect(flatten(obj)).to.be.deep.equal({a: 1, 'b.c': '123'})
    })
    it('flatten 3rd level', () => {
        const obj = {a: {b: {c: {d: '123'}}}}
        expect(flatten(obj)).to.be.deep.equal({'a.b.c.d': '123'})
    })
    it('flatten 4th level', () => {
        const obj = {a: {b: {c: {d: {e: '123'}}}}}
        expect(flatten(obj)).to.be.deep.equal({'a.b.c.d.e': '123'})
    })
})