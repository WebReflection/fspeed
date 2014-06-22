// node 10 bench.js
// VS
// node 10 bench.js ./fspeed

var
  numberOfRequests = Math.abs(
    parseInt(process.argv[2], 10)
  ) || 1,
  whichFS = process.argv[3] || 'fs'
;


console.log(
  'benchmark for ' + numberOfRequests +
  ' using require("' + whichFS + '").readFile'
);

for (var
  callback = function () {
    if (!--i) console.log(Date.now() - t);
  },
  fs = require(whichFS),
  i = 0,
  t = Date.now();
  i < numberOfRequests; i++
) {
  fs.readFile(__filename, callback);
}