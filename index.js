'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('yeoman-assert');
const _ = require('lodash');
const deep = require('deep-equal');

const ignored = [
	'.git',
	'.gitkeep',
	'.idea',
	'node_modules',
	'.DS_Store'
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
					return util.tree(filename + '/' + child);
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

				if (typeof item.children !== 'undefined') {

					tmp[item.name] = util.ftree(item);

					formatted.push(Object.assign({}, tmp));

					tmp = [];

				} else {

					formatted.push(item.name);

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

	files: dir => fs.readdirSync(dir)

};