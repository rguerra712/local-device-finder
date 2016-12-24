# local-device-finder
Given an ip on your local network, find a device based on a given function

# Usage
1. First install the npm package `npm install local-device-finder`
1. Next pass in a function for which to confirm a local network ip matches the device, and what happens if found
Example:
```
var finder = require('local-device-finder');

var isCorrectIp = function(ip) {
  // Pass in some function (normally a GET) that verifies the ip is what you seek, e.g. validate a port, etc
  return ip === '10.0.0.12'; // Assuming this would be some function to find my current IP
}

var onIpFound = function(ip) {
  console.log('IP Found: ' + ip);
};

var onIpNotFound = function(ip) {
  console.log('IP Not Found: ' + ip);
};

finder.scan(isCorrectIp, '11-13')
  .then(onIpFound)
  .catch(onIpNotFound);

// Assuming my IP is 10.0.0.12, the below should output:
// IP Not Found: 10.0.0.11
// IP Found: 10.0.0.12
// IP Not Found: 10.0.0.13
```
