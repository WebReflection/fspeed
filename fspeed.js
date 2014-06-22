/*! (C) Andrea Giammarchi - Mit Style License */
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

function directBind(method) {
  return function () {
    return method.apply(fs, arguments);
  };
}

module.exports = {
  rename: directBind(fs.rename),
  ftruncate: directBind(fs.ftruncate),
  truncate: directBind(fs.truncate),
  chown: directBind(fs.chown),
  fchown: directBind(fs.fchown),
  lchown: directBind(fs.lchown),
  chmod: directBind(fs.chmod),
  fchmod: directBind(fs.fchmod),
  lchmod: directBind(fs.lchmod),
  lchmod: directBind(fs.lchmod),
  stat: commonBoost(fs.stat),
  lstat: commonBoost(fs.lstat),
  fstat: commonBoost(fs.fstat),
  link: directBind(fs.link),
  symlink: directBind(fs.symlink),
  readlink: commonBoost(fs.readlink),
  realpath: directBind(fs.realpath),
  unlink: commonBoost(fs.unlink),
  rmdir: commonBoost(fs.rmdir),
  mkdir: directBind(fs.mkdir),
  readdir: commonBoost(fs.readdir),
  close: commonBoost(fs.close),
  open: directBind(fs.open),
  utimes: directBind(fs.utimes),
  fsync: commonBoost(fs.fsync),
  write: directBind(fs.write),
  read: directBind(fs.read),
  readFile: commonBoost(fs.readFile),
  writeFile: directBind(fs.writeFile),
  appendFile: directBind(fs.appendFile),
  watchFile: directBind(fs.watchFile),
  unwatchFile: directBind(fs.unwatchFile),
  watch: directBind(fs.watch),
  exists: commonBoost(fs.exists),
  createReadStream: directBind(fs.createReadStream),
  createWriteStream: directBind(fs.createWriteStream)
};
