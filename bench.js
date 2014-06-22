// node bench.js
// VS
// node bench.js ./fspeed
for (var
  // require another file or 'fs' by default
  fs = require(process.argv[2] || 'fs'),
  i = 0,
  // start time
  t = Date.now();
  // 25000 simultaneous requests
  i < 25000; i++
) {
  fs.readFile(__filename, function () {
    // end time if all requests have been satisfied
    // will be async anyway ^_^
    if (!--i) console.log(Date.now() - t);
  });
}