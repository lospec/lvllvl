import { suite, test, expect, beforeAll, afterAll } from 'vitest';
import {getIdentifier} from '../../build-util/get-identifier';

suite('getIdentifier()', () => {

	test('is valid', () => {
		expect(getIdentifier).to.be.a('function');
	});

	test('works', () => {
		const BUILD_VARS = {
			lastIdIndex: 0,
			allIds: []
		};
		expect(getIdentifier(BUILD_VARS)).to.equal('a1');
		expect(BUILD_VARS.lastIdIndex).to.equal(1);
		expect(BUILD_VARS.allIds).to.deep.equal(['a1']);
	});

	test('works with multiple', () => {
		const BUILD_VARS = {
			lastIdIndex: 0,
			allIds: []
		};
		expect(getIdentifier(BUILD_VARS)).to.equal('a1');
		expect(getIdentifier(BUILD_VARS)).to.equal('a2');
		expect(BUILD_VARS.lastIdIndex).to.equal(2);
	});

	test('rejects existing id', () => {
		const BUILD_VARS = {
			lastIdIndex: 0,
			allIds: [0]
		};
		expect(getIdentifier(BUILD_VARS)).to.throw('ID Already exists 0');
	});
});
