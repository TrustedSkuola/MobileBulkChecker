#!/usr/bin/env node
import fetch from "node-fetch";

const apiKey = process.env.API_KEY;
const urlToCheck = process.argv[2];

if (!apiKey || apiKey === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
	console.log('\x1b[34m', 'It seems that you have not set any API keys, AMP Test will be skipped' ,'\x1b[0m');
}

if (!urlToCheck) {
  process.exit();
	console.log('\x1b[41m', 'You forgot to enter url to check, run: MobileBulkChecker [url]' ,'\x1b[0m');
}

async function callMobileFriendlyApi(data = {}) {
  
  const response = await fetch("https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run", {
    method: 'POST',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

callMobileFriendlyApi({
  "url": urlToCheck,
  "requestScreenshot": false,
}).then(data => {
  console.log(data);
});