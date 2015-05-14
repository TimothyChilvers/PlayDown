#!/usr/bin/env node

var updateNotifier = require('update-notifier');
var pkg = require('../package.json');
var name = Object.keys(pkg.bin)[0];

var nomnom = require('nomnom')
  .script(name)
  .option('paths', {
    position: 0,
    list: true,
    required: true,
    help: 'Markdown files(s), or directory containing Markdown files, from which to build the Playground(s)'
  })
  .option('destination', {
    abbr: 'd',
    help: 'Directory in which to output the Playground(s)'
  })
  .option('platform', {
    abbr: 'p',
    choices: ['ios', 'osx'],
    default: 'osx',
    help: 'Specifies which platform\'s frameworks can be imported in the Playground(s)'
  })
  .option('noReset', {
    full: 'noreset',
    abbr: 'n',
    flag: true,
    help: 'Don\'t allow edited code to be reset from the "Editor → Reset Playground" menu'
  })
  .option('stylesheet', {
    abbr: 's',
    help: 'Path to custom stylesheet'
  })
  .option('noUpdateNotifier', {
    full: 'noupdate',
    abbr: 'u',
    flag: true,
    help: 'Don\'t check for updates'
  })
  .option('version', {
    abbr: 'v',
    flag: true,
    help: 'Print "playground" version and exit',
    callback: function() {
      return pkg.version;
    }
  });

var opts = nomnom.nom();

if (!opts.noUpdateNotifier) {
  var notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
  });
  notifier.notify();
}

var playground = require('./index');
playground.createFromFiles(opts.paths, {
  outputDirectory: opts.destination,
  allowsReset: !opts.noReset,
  platform: opts.platform,
  stylesheet: opts.stylesheet
}, function(err) {
  if (err) { throw err; }
});
