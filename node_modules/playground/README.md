# Playground [![Build Status](https://travis-ci.org/jas/playground.svg?branch=master)](https://travis-ci.org/jas/playground)

> Create Xcode Playgrounds for the Swift programming language with rich documentation generated from Markdown

Follow me on Twitter [@jasonsandmeyer](http://twitter.com/jasonsandmeyer) or watch this repo for updates!

![Playground example](screenshot.png)

#### Contents
* [Markdown Format](README.md#markdown-format)
* [Installation](README.md#installation)
* [Command-line Usage](README.md#command-line-usage)
* [Node.js Usage](README.md#nodejs-usage)
  * [Arguments](README.md#arguments)
  * [Options](README.md#options)
  * [Example](README.md#example)
* [Why Node.js?](README.md#why-nodejs)
* [License](README.md#license)

## Markdown Format

Swift code is extracted from the Markdown with the same syntax used to specify languages for code blocks in GitHub-flavored Markdown. All other text is parsed normally as Markdown using [marked](https://github.com/chjj/marked).

    # A Swift Tour

    Tradition suggests that the first program in a new language should print the words "Hello, world"
    on the screen. In Swift, this can be done in a single line:

    ```swift
    println("Hello, world!")
    ```

## Installation

1. This tool requires [Node.js](http://nodejs.org). Download the installer from the Node.js website and follow the instructions.

2. In your Terminal, run the following command to install the Playground Builder:

   ```sh
   $ npm install -g playground
   ```

3. That's it! You should now be able to use the `playground` command.

## Command-line Usage

```
Usage: playground <paths>... [options]

paths     Markdown files(s), or directory containing Markdown files,
          from which to build the Playground(s).
          
          The Markdown file(s) must have one of these common Markdown
          file extensions: .md .markdown .mdown .mkdn .mkd

Options:

   -d, --destination   Directory in which to output the Playground(s);
                       defaults to the current working directory

   -p, --platform      Specifies which platform's frameworks can be imported
                       in the Playground(s); only one platform can be choosen
                       [options: ios, osx] [default: osx]

   -n, --noreset       Don't allow edited code to be reset from the
                       "Editor → Reset Playground" menu in Xcode

   -s, --stylesheet    Path to custom stylesheet

   -v, --version       Print "playground" version and exit
```

## Node.js Usage

You can also import the Playground Builder as a Node.js module.

```js
var playground = require('playground');

playground.createFromFile('file.md', options);
playground.createFromFiles(['file.md', 'directory/of/files/'], options);
playground.createFromString('String containing markdown.', options);
```

### Arguments

* **`paths` (`String` or `Array`)** or **`markdown` (`String`)**
  * `createFromFile` and `createFromFiles` expect a path to a Markdown file or directory containing Markdown files. An array of file and/or directory paths is also acceptable.
  * `createFromString` expects a string containing Markdown.

* **`options` (`Object`, optional)**
  See the "Options" section below for available options.

* **`callback` (`Function`, optional)**
  Function to be called once all Playground files have been output. First argument is `err` which contains an `Error`, if any.

### Options

* **`name` (default: `'MyPlayground'`)**
  When using `createFromString`, specify a name for the playground. The name will be used for
  the filename. (The `.playground` extension is appended automatically.)

* **`outputDirectory` (default: `process.cwd()`)**
  Path to directory in which to output the built Playground(s).

* **`allowsReset` (default: `true`)**
  A Playground's code can be modified and saved. The Playground can be reset to its original code from the "Editor → Reset Playground" menu. This menu can be disabled for a Playground by setting this option to `false`.`

* **`platform` (default: `'osx'`)**
  Set the platform to `osx` or `ios` to be able to import each platform's respective frameworks.

* **`stylesheet`**
  Path to a custom stylesheet.


### Example

```js
var playground = require('playground');

// Outputs `Introduction.playground` to current working directory
playground.createFromFile('Introduction.md');

// Outputs `Variables.playground` to `/User/Jason/Playgrounds`
playground.createFromString(markdown, {
  name: 'Variables',
  outputDirectory: '/User/Jason/Playgrounds'
});

// outputs `Constants.playground` and `Closures.playground` to CWD
playground.createFromFiles(['Constants.md', 'Closures.md'], {
  allowsReset: false,
  platform: 'ios'
});

// outputs playgrounds for Markdown files in `./playgrounds` directory,
// then invokes callback function
playground.createFromFiles('./playgrounds', function(err) {
  if (err) { throw err; }
  console.log('Done building playgrounds!');
});
```

## Why Node.js?

You may be wondering why I chose to use Node.js for this project.

I wrote this script with the intention of using it as part of a web-based CMS. It would be awesome to have downloadable playgrounds when I post Swift-related articles on my website, and a huge time-saver if they are generated automatically from the post's Markdown. Although this version already works very well from the Terminal, I'd love to one day rewrite it in Swift itself.

If the fact that this is written in JavaScript is unappealing to you, I ask that you please give it a chance. Node is very easy to install — especially on OS X!  — and the Playground Builder is used just like any other command-line tool.

## License

The MIT License

Copyright (c) 2014 Jason Sandmeyer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
