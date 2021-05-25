let chokidar = require('chokidar');

// let log as console.log
let log = console.log.bind(console);

function main(){
  // Try to monitor current directory
  let watcher = chokidar.watch('.', {
	ignored: /[\/\\]\./,
	persistent: true
  });

  watcher
    .on('add', function(path) { log('File', path, 'has been added'); })
    .on('unlink', function(path) { log('File', path, 'has been removed'); })
    .on('addDir', function(path) { log('Directory', path, 'has been added'); })
    .on('unlink', function(path) { log('Directory', path, 'has been removed'); })
    .on('error', function(error) { log('Error happened', error); })
    .on('ready', function() { log('Initial scan compplete. Ready for changes.'); })
    .on('raw', function(event, path, details) { log('Raw event info:', event, path, details); });

  watcher.on('change', function(path, stats) { 
    if (stats) og('File', path, 'changed size to', stats.size);
  });

}

main();
