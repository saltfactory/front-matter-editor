'use strict';

const editor = require('../index');
const path = require('path');
const fs = require('fs');
const extend = require('util')._extend;
const chai = require('chai');

const expect = chai.expect;

describe('FrontMatterEditor tests', () =>{
  let filePath = path.join(__dirname, 'sample.md');
  let file, originalPrintObject, printedObject;

  beforeEach(() => {
      file = editor.read(filePath);
      originalPrintObject = editor._printObject;
      editor._printObject = (obj) => {
          printedObject = obj;
      };
  });

  afterEach(() => {
      editor._printObject = originalPrintObject;
  });

  describe( 'show()', () => {
      it('outputs all parts of parsed page', () => {
        file.show();
        expect(printedObject).to.deep.equal({
            content: "\n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it.",
            data: {
                layout: 'post',
                title: 'What is the front-matter-editor?'
            },
            orig: "---\nlayout: post\ntitle: What is the front-matter-editor?\n---\n\n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it."
        });
      });

      it('outputs only orig part of page with "orig" parameter', () => {
          file.show('orig');
          expect(printedObject).to.equal(
              "---\nlayout: post\ntitle: What is the front-matter-editor?\n---\n\n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it."
          );
      });

      it('outputs the front matter data with "data" parameter', () => {
          file.show('data');
          expect(printedObject).to.deep.equal({
              layout: 'post',
              title: 'What is the front-matter-editor?'
          });
      });

      it('outputs only content part of page with "content" parameter', () => {
          file.show('content');
          expect(printedObject).to.equal(
              "\n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it."
          );
      });

  } );

  describe( 'data()', () => {
      it('can change the data with a callback', () => {
          file.data((data, matter) => {
              matter.data = extend(data, {author: 'saltfactory'});
          }).show('data');
          expect(printedObject).to.deep.equal({
              layout: 'post',
              title: 'What is the front-matter-editor?',
              author: 'saltfactory'
          });
      });

  } );

  describe( 'content()', () => {
      it('can change change the page content with a callback', () => {
          file.content((content, matter) => {
              matter.content = `add content  ${content}`;
          }).show('content');
          expect(printedObject).to.deep.equal(
              "add content  \n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it."
          );
      });

  } );

  describe( 'extend()', () => {
      it('can change change the front matter and page content with a callback', () => {
          file.extend((data, content, matter) => {
              matter.data = extend(data, {author: 'saltfactory'});
              matter.content = `add content  ${content}`;
          }).show();
          expect(printedObject).to.deep.equal({
              content: "add content  \n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it.",
              data: {
                  layout: 'post',
                  title: 'What is the front-matter-editor?',
                  author: 'saltfactory'
              },
              orig: "---\nlayout: post\ntitle: What is the front-matter-editor?\n---\n\n# Abstract\n\nfront-matter-editor help you to edit front-matter in markdown of jekyll or included it."
          });
      });

  } );

  describe( 'fileInfo()', () => {
      it('outputs file metadata', () => {
          file.fileInfo();
          // spot check important properties
          expect(printedObject.exists).to.equal(true);
          expect(printedObject.flags.isFile).to.equal(true);
          expect(printedObject.name).to.equal("sample.md");
          expect(printedObject.extension).to.equal(".md");
      });

  } );

  describe( 'save()', () => {
      const expectedOutputPath = path.join(__dirname, './2016-08-03-abc.md.bak');

      beforeEach(() => {
          if (fs.existsSync(expectedOutputPath)) {
              fs.unlinkSync(expectedOutputPath);
          }
      })

      it('writes changes to specified file', (done) => {
          // TODO use mock-fs to avoid writing to the real file system
          file.data((data,matter) => {
             matter.data = extend(data, {author: 'saltfactory'});
          }).save(
              path.join(__dirname, './'),
              {prefix:"2016-08-03-", postfix:".bak", filename:"abc.md"},
              (err, matter) => {
                expect(err).to.equal(null);
                expect(fs.existsSync(expectedOutputPath)).to.equal(true);
                expect(fs.readFileSync(expectedOutputPath, 'utf8')).to.contain.string( "\nauthor: saltfactory")
                done();
              }
          );
      });

  } );

});
