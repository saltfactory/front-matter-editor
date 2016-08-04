'use strict';

const editor = require('../index');
const path = require('path');
const extend = require('util')._extend;

describe('FrontMatterEditor tests', () =>{
  let filePath = path.join(__dirname, 'sample.md');

  it('show()', () => {
    editor.read(filePath).show();
  });

  it("show('orig')", () => {
    editor.read(filePath).show('orig');
  });

  it("show('data')", () => {
    editor.read(filePath).show('data');
  });

  it("show('content')", () => {
    editor.read(filePath).show('content');
  });

  it("data()", () => {
    editor.read(filePath)
      .show('data')
      .data((data, matter) => {
        matter.data = extend(data, {author: "saltfactory"});
      })
      .show('data');
  });

  it("content()", () => {
    editor.read(filePath)
      .show('content')
      .content((content, matter) => {
        matter.content = `add content  ${content}`;
      })
      .show('content');
  });

  it("extend()", () => {
    editor.read(filePath)
      .show()
      .extend((data, content, matter) => {
        matter.data = extend(data, {author:'saltfactory'});
        matter.content = `add Content ${content}`
      })
      .show();
  });

  it("fileInfo()", () => {
    editor.read(filePath)
      .fileInfo();
  });

  it("save()", () => {
    editor.read(filePath)
      .data((data, matter) => matter.data.author = "saltfactory")
      .save(path.join(__dirname, './'), {prefix:"2016-08-03-", postfix:".bak", filename:"abc.md"}, (err, matter) => {
        console.log(matter);
      });
  })

});