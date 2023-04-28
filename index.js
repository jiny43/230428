// const { program } = require("commander");

// const app = program.command("kdt");
// app.action(() => {
//   console.log("wow!내가 만든 명렁어!");
// });

// program.parse(process.argv);

//npm commander.js 사용법
// const { program } = require("commander");

// program.option("--first").option("-s, --separator <char>");

// program.parse();

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));
//node index.js -s /--first a/b/c
//[ 'a/b/c' ]

const { Command } = require("commander");
const program = new Command();

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("split")
  .description("Split a string into substrings and display as an array")
  .argument("<string>", "string to split")
  .option("--first", "display just the first substring")
  .option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
