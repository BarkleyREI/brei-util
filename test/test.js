/*global describe, it, require, __dirname*/

'use strict';

const util = require('../index.js');

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

describe('Verify file and folder structure', function () {

	it('Deep object comparison check', function () {

		let ttree = util.tree(root)

		let files = util.ftree(ttree);

		util.assert(util.deep(valid, files));

	});

});