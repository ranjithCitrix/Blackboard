import { expect } from 'chai';
import { transformQuery } from './queryTransform';
import { and, equals, ftcontains, or } from '../../../commons/src/lib/ssqlBuilder';
import { CitrixRequestAttributes } from '../../../commons/src/lib/ssql-constants';

describe('Citrix search query transformation', () => {
	describe('searches by file', () => {
		it('Search "book"', () => {
			const citrixQuery = and(equals('book', CitrixRequestAttributes.file));
			const msGraphQuery = 'book';
			expect(transformQuery(citrixQuery)).to.be.deep.equals(msGraphQuery);
		});

		it('Search "book" or "SAP"', () => {
			const citrixQuery = or(
				equals('book', CitrixRequestAttributes.file),
				equals('sap', CitrixRequestAttributes.file)
			);
			const msGraphQuery = '(book OR sap)';
			expect(transformQuery(citrixQuery)).to.be.deep.equals(msGraphQuery);
		});
	});

	it('Nested operands AND, OR', () => {
		const citrixQuery = and(or(ftcontains('mp3'), ftcontains('wav')), ftcontains('speech'));
		const msGraphQuery = '((mp3 OR wav) AND speech)';
		expect(transformQuery(citrixQuery)).to.be.deep.equals(msGraphQuery);
	});
});

describe('Utility functions', () => {
	describe('transformArrayExpression', () => {
		it('no item', () => {
			expect(transformQuery(and())).to.be.equal('');
		});

		it('single item', () => {
			expect(transformQuery(and(ftcontains('hello')))).to.be.equal('hello');
		});

		it('multiple single items', () => {
			expect(transformQuery(and(ftcontains('hello'), ftcontains('world')))).to.be.equal('(hello AND world)');
		});
	});
});
