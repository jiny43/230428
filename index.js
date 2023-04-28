// const { program } = require("commander");

// const app = program.command("kdt");
// app.action(() => {
//   console.log("wow!내가 만든 명렁어!");
// });

// program.parse(process.argv);

//npm commander.js 사용법
const { program } = require("commander");

program.option("--first").option("-s, --separator <char>");

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));
