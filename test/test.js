/*global describe, it, require*/

'use strict';

const util = require('../index.js');

describe('brei-util -- Test (test/test.js)', function () {
	it('Test assert', function () {
		util.assert(true);
	});

	it('Test deep equal', function () {
		let obj1 = {
			'test': 'foo',
			'bar': {
				'baz': 1
			}
		};
		let obj2 = {
			'test': 'foo',
			'bar': {
				'baz': 1
			}
		};
		let obj3 = {
			'test': 'foo',
			'bar': {
				'baz': 2
			}
		};

		util.assert(util.deep(obj1, obj2));
		util.assert(!util.deep(obj1, obj3));
	});

	it('Test deep object diff', function () {
		let obj1 = {
			'test': 'foo',
			'bar': {
				'baz': 1
			}
		};
		let obj2 = {
			'test': 'foo',
			'bar': {
				'baz': 1
			}
		};

		util.assert(util.deepNotOnly(obj1, obj2) !== {});
	});
});
