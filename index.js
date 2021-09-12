#!/usr/bin/env node

const apiKey = process.argv[2];

if (!apiKey) {
	return console.log('\x1b[41m', 'Please enter api key, run: MobileBulkChecker [api-key]' ,'\x1b[0m');
}