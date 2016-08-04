'use strict';

let fs = require('fs');
let matter = require('gray-matter');
let extend = require('util')._extend;
let fsi = require('fs-filesysteminfo');
let path = require('path');

class FrontMatterService {
  constructor() {
  }

  _printObject(obj){
    console.log(JSON.stringify(obj, null, 2));
  }

  read(filePath) {
    // this.sourcePath = filePath;
    this.file = fs.readFileSync(filePath);
    this.fileSystemInfo = new fsi.FileSystemInfo(filePath);
    this.matter = matter(String(this.file));
    return this;
  }

  show(flag) {
    let output = flag ? this.matter[flag] : this.matter;
    this._printObject(output);
    return this;
  }

  extend(func) {
    func(this.matter.data, this.matter.content, this.matter);
    return this;
  }

  data(func) {
    // this.matter = extend(this.matter, obj);
    func(this.matter.data, this.matter);
    return this;
  }

  content(func) {
    func(this.matter.content, this.matter);
    return this;
  }

  fileInfo(){
    // let info = new fsi.FileSystemInfo(this.sourcePath);
    this._printObject(this.fileSystemInfo);
    return this;
  }


  save(dirPath, options, callback){
    let filename = this.fileSystemInfo.name;
    if (options) {
      if (options.filename) filename = options.filename;
      if (options.prefix) filename = `${options.prefix}${filename}`;
      if (options.postfix) filename = `${filename}${options.postfix}`;
    }

    let dest = path.join(dirPath, filename);
    let data = matter.stringify(this.matter.content, this.matter.data);
    fs.writeFile(dest, data,  (err) => {
      callback(err, data);
    });
  }


}

module.exports = new FrontMatterService();


// module.exports = function(filePath){
//
//   return this;
// }
// module.exports.prototype.show = function(){
//   console.log(this.)
// }

