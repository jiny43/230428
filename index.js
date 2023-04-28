const { program } = require("commander");

const app = program.command("kdt");
app.action(() => {
  console.log("wow!내가 만든 명렁어!");
});

program.parse(process.argv);
