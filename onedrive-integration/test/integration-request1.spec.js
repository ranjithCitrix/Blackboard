import {expect} from 'chai'
import {transformRequest} from '../src/script/queryTransform'

describe('Integration tests of full request', () => {
    for (let i = 1; i <= 1; i++) {
        const inputRequest = `citrixRequest${i}.json`
        const outputRequest = `graphRequest${i}.json`
        it(`Testing input request ${inputRequest} to be equal to desired request ${outputRequest}`, () => {
            const citrixRequest = require(`../../commons/test/request-examples/${inputRequest}`)
            const graphRequest = require(`./request-examples/${outputRequest}`)
            expect(transformRequest(citrixRequest)).to.be.deep.equal(graphRequest)
        })
    }
})
