# front-matter-editor
Front Matter Editor help you to edit markdowns in Jekyll or font-matter included documents


## Installation

```
npm install front-matter-editor --save
```


## Usage

```
let editor = require('front-matter-editor');
let path = require('path');

let filePath = path.join('./sample.md');
let destPath = path.join('/output');

// if add author property to front-matter
editor.read(filePath)
  .data((data, matter) => {
    data.author = 'saltfactory';
    matter.data = data;
  })
  .show()
  .save(destPath, {postfix:'new'}, (err) => {
      if (err) {
        console.log('could not save', err);
      }
  });
```

## front-matter-editor methods

### .read(path)

This method is read file from path

```
let filePath = path.join(___dirname, 'sample.md');
editor.read(filePath);
```

### .show()

This method print parsed document information by JSON. And
this method have options like [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **empty** : if it have not any options, this run by default option. default option is will show parsed document information by JSON.
- **orig** : this options is original data like simply read some file.
```
editor.read(filePath).show('orig');
```
- **data** : this option only show front matter information by JSON
```
editor.read(filePath).show('data');
```
- **content** : this option only show content excluded front matter information
```
editor.read(filePath).show('content');
```

## .data()

This method update front matter data in file.

```
let extend = require('util')._extend;

function updateHandler(data, matter) {
  data.author = 'saltfactory';
  matter.data = data;
  // or
  matter.data = extend(data, {author:saltfactory})
}

editor.read(filePath).data(updateHandler);
```

## .content()
This method update content in file.
```
function updateHandler(content, matter) {
  matter.content = `${content} \n this content is updated.`;
}

editor.read(filePath).content(updateHandler);
```

## .save(destDirPath, options, callback)

this method save to file. if this method have not options, save file by default options. default options is same filename with source file.

you can use options
- **prefix**: this value append it before filename.
- **postfix**: this value append it after filename.
- **filename**: this value change with new filename.

```
function updateHandler(data, matter) {
  data.author = 'saltfactory';
  matter.data = data;
}

editor.read(filePath)
  .data(updateHandler)
  .save(path.join(__dirname, './'), {prefix:"2016-08-03-", postfix:".bak", filename:"rename.md"}, (err, matter) => {
    console.log(matter);
  });
```


## License

The MIT License (MIT)

Copyright (c) 2016 SungKwang Song

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
