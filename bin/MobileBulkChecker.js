#!/usr/bin/env node

require = require('esm')(module);
require('../src/index').cli(process.argv);