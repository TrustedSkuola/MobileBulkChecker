#!/usr/bin/env node

const apiKey = process.argv[2];
const urlToCheck = process.argv[3];

if (!apiKey) {
	return console.log('\x1b[41m', 'You forgot to enter api key, run: MobileBulkChecker [api-key] [url]' ,'\x1b[0m');
}

if (!urlToCheck) {
	return console.log('\x1b[41m', 'You forgot to enter url to check, run: MobileBulkChecker [api-key] [url]' ,'\x1b[0m');
}


async function callMobileFriendlyApi(data = {}) {
  
  const response = await fetch("https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run", {
    method: 'POST',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}