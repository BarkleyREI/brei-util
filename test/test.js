/*global describe, it, require, __dirname*/

'use strict';

const util = require('../index.js');
const u = require('util');

const root = __dirname + '/..';

let valid = [
	'.gitignore',
	'.travis.yml',
	'README.md',
	'index.js',
	'package.json',
	{
		test: [
			'test.js'
		]
	}
];

describe('brei-util -- Verify file and folder structure', function () {

	it('Deep object comparison check', function () {

		let ttree = util.tree(root);

		let actual = util.ftree(ttree);

		let expected = util.filterObject(valid);

		console.log('\n------- actual --------\n');
		console.log(u.inspect(actual, false, null));

		console.log('\n------- expected --------\n');
		console.log(u.inspect(expected, false, null));

		util.assert(util.deep(expected, actual));

	});

});