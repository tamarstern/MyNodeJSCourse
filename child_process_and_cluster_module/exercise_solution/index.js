const program = require('commander');
const exec = require('child_process').exec;

let listFunction = (directory,options) => {
  const cmd = 'dir';
  let params = [];
  if (options.all) params.push('on');
  if (options.long) params.push('w');
  let fullCommand = params.length 
                  ? cmd + ' /' + params.join('')
                  : cmd
  if (directory) fullCommand += ' ' + directory;
  let execCallback = (error, stdout, stderr) => {
    if (error) console.log("exec error: " + error);
    if (stdout) console.log("Result: " + stdout);
    if (stderr) console.log("shell error: " + stderr);
  };
  exec(fullCommand, execCallback);
};

program
  .version('0.0.1')
  .command('list [directory]')
  .description('List files and folders')
  .option('-a, --all','All files in alphbetic order')
  .option('-l, --long','')
  .action(listFunction);
program.parse(process.argv);