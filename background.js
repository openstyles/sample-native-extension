'use strict';

var channel = chrome.runtime.connectNative('com.add0n.stylus');
channel.onDisconnect.addListener(() => {
  console.error('Unexpended exit of the native client');
});
channel.onMessage.addListener(request => {
  console.log(request);
});
// Test application
channel.postMessage({
  method: 'spec'
});
// Test node modules
channel.postMessage({
  permissions: ['path'],
  script: `
    var path = require('path');
    push(path.delimiter);
    close();
  `
});
// Test error handling
channel.postMessage({
  script: `
    var path = require('path');
    push(path.delimiter);
    close();
  `
});
