#!/usr/bin/env node

require('dotenv').config()
require('esm')(module /*, options*/);

import fetch from "node-fetch";


async function checkMobileFriendly(apiKey, data = {}) {

  const apiURL = "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key="+apiKey
  
  const response = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export function cli(args) {

  const apiKey = process.env.API_KEY;
  const argv = require('minimist')(process.argv.slice(2));

  const url = argv.url;
  const file = argv.file;
  const mode = argv.mode;

  const isValid = /^(http|https):\/\/[^ "]+$/.test(url);


  if ( !apiKey || apiKey === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' ) {
    console.log('\x1b[41m', 'You forgot to set any API keys, this is a bad thing.' ,'\x1b[0m');
    process.exit()
  }

  if ( !url ) {
    console.log('\x1b[41m', 'You forgot to enter url to check, run: MobileBulkChecker --url=URL_TO_CHECK' ,'\x1b[0m');
    process.exit()
  }

  if ( !isValid ) {
    console.log('\x1b[41m', 'You forgot to enter url to check, run: MobileBulkChecker [url]' ,'\x1b[0m');
    process.exit()
  }

  if ( url && file ){
    console.log('\x1b[33m', 'Sorry dude but for now is only possible check url or file once at time' ,'\x1b[0m');
    process.exit()
  }

  if ( url ){

    checkMobileFriendly(apiKey,{
      "url": url,
      "requestScreenshot": false
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        console.log(data);
      });

  }


}