var fs = require('fs');

function commonBoost(method) {
  var cache = Object.create(null);
  return function (name, then) {
    if (name in cache) {
      cache[name].push(then);
    } else {
      cache[name] = [then];
      method.call(fs, name, function () {
        var
          list = cache[name],
          i = 0,
          length = list.length
        ;
        delete cache[name];
        while (i < length) {
          list[i++].apply(this, arguments);
        }
      });
    }
  };
}

function fastBind(method) {
  return function () {
    return method.apply(fs, arguments);
  };
}

module.exports = {
  rename: fastBind(fs.rename),
  ftruncate: fastBind(fs.ftruncate),
  truncate: fastBind(fs.truncate),
  chown: fastBind(fs.chown),
  fchown: fastBind(fs.fchown),
  lchown: fastBind(fs.lchown),
  chmod: fastBind(fs.chmod),
  fchmod: fastBind(fs.fchmod),
  lchmod: fastBind(fs.lchmod),
  lchmod: fastBind(fs.lchmod),
  stat: commonBoost(fs.stat),
  lstat: commonBoost(fs.lstat),
  fstat: commonBoost(fs.fstat),
  link: fastBind(fs.link),
  symlink: fastBind(fs.symlink),
  readlink: commonBoost(fs.readlink),
  realpath: fastBind(fs.realpath),
  unlink: commonBoost(fs.unlink),
  rmdir: commonBoost(fs.rmdir),
  mkdir: fastBind(fs.mkdir),
  readdir: commonBoost(fs.readdir),
  close: commonBoost(fs.close),
  open: fastBind(fs.open),
  utimes: fastBind(fs.utimes),
  fsync: commonBoost(fs.fsync),
  write: fastBind(fs.write),
  read: fastBind(fs.read),
  readFile: commonBoost(fs.readFile),
  writeFile: fastBind(fs.writeFile),
  appendFile: fastBind(fs.appendFile),
  watchFile: fastBind(fs.watchFile),
  unwatchFile: fastBind(fs.unwatchFile),
  watch: fastBind(fs.watch),
  exists: commonBoost(fs.exists),
  createReadStream: fastBind(fs.createReadStream),
  createWriteStream: fastBind(fs.createWriteStream)
};
