'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const _ = require('lodash');
const deep = require('deep-equal');
const deepdiff = require('deep-object-diff');

const ignored = [
	'.git',
	'.gitkeep',
	'.gitignore',
	'.idea',
	'node_modules',
	'.DS_Store',
	'package-lock.json'
];

const util = module.exports = {

	assert: assert,

	deep: deep,

	tree: (filename) => {

		const stats = fs.lstatSync(filename),
			info = {
				name: path.basename(filename)
			};

		if (stats.isDirectory()) {
			if (_.indexOf(ignored, info.name) === -1) {
				info.children = fs.readdirSync(filename).map(function (child) {
					if (_.indexOf(ignored, child) === -1) {
						return util.tree(filename + '/' + child);
					}
				});
			}
		}

		return info;
	},

	ftree: (dirtree) => {

		let formatted = [];
		let tmp = [];

		if (typeof dirtree.children !== 'undefined') {

			dirtree.children.forEach(function (item) {

				if (typeof item !== 'undefined') {

					if (typeof item.children !== 'undefined') {

						tmp[item.name] = util.ftree(item);

						formatted.push(Object.assign({}, tmp));

						tmp = [];

					} else {

						formatted.push(item.name);

					}

				}

			});

		}

		return formatted;

	},

	has: (list, arr) => {

		let diff = _.difference(list, arr);

		if (diff.length === 0) {
			return true;
		} else {
			throw new Error('Missing: ' + diff);
		}

	},

	hasOnly: (list, arr) => {

		// Remove ignored files and directories
		arr = _.difference(arr, ignored);

		let forward = _.difference(list, arr);
		let backward = _.difference(arr, list);

		return forward.length === backward.length;

	},

	files: dir => fs.readdirSync(dir),

	deepNotOnly: (obj1, obj2) => {

		// Checks if object 2 contains all the items in object 1.
		// It does this by doing an added Diff.
		// Essentially, it checks to see if any items have been added in object 1.
		// If every item matches, the result is an empty object.

		return deepdiff.addedDiff(obj2, obj1);

	}

};