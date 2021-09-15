#!/usr/bin/env node
require('dotenv').config()
require('esm')(module);

import fetch from "node-fetch";

async function callMobileFriendlyApi(data = {}) {

  const apiURL = "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key="+apiKey
  
  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export function cli(args) {

  const apiKey = process.env.API_KEY;
  const urlToCheck = args[2];

  if (!apiKey || apiKey === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
    console.log('\x1b[34m', 'It seems that you have not set any API keys, AMP Test will be skipped' ,'\x1b[0m');
    process.exit()
  }

  if (!urlToCheck) {
    console.log('\x1b[41m', 'You forgot to enter url to check, run: MobileBulkChecker [url]' ,'\x1b[0m');
    process.exit()
  }
  
  callMobileFriendlyApi({
    "url": urlToCheck,
    "requestScreenshot": false
    }).then(data => {
      console.log(data);
    });


}