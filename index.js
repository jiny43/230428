// const { program } = require("commander");

// const app = program.command("kdt");
// app.action(() => {
//   console.log("wow!내가 만든 명렁어!");
// });

// program.parse(process.argv);

//npm commander.js 사용법 예시
// const { program } = require("commander");

// program.option("--first").option("-s, --separator <char>");

// program.parse();

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));
//node index.js -s /--first a/b/c
//[ 'a/b/c' ]

// const { Command } = require("commander");
// const program = new Command();

// program
//   .name("string-util")
//   .description("CLI to some JavaScript string utilities")
//   .version("0.8.0");

// program
//   .command("split")
//   .description("Split a string into substrings and display as an array")
//   .argument("<string>", "string to split")
//   .option("--first", "display just the first substring")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

// program.parse();
//node index.js help split
//ode index.js split --separator=/ ?/!/@
// [ '?', '!', '@' ]

// CommonJS (.cjs) npm 예제코드
// const { Command } = require("commander");
// const program = new Command();
// //첫번째 인자로 옵션의 이름을, 두 번째 인자로 옵션의 설명
// //<>로 감싸진 값은 필수값을 의미.
// program
//   .option("-d, --debug", "output extra debugging")
//   .option("-s, --small", "small pizza size")
//   .option("-p, --pizza-type <type>", "flavour of pizza");

// //srgv 배열을 파싱하여 명령 줄 인자를 해석하고,
// program.parse(process.argv);
// //program.opts()사용하여 파싱 된 옵션 객체를 반환한다.
// const options = program.opts();

// //if문을 사용해서 옵션 객체의 각 프로퍼티를 검사하고, 해당 옵션에 대한 메세지를 출력한다.
// if (options.debug) console.log(options);
// console.log("pizza details:");
// if (options.small) console.log("- small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);
//node index.js --debug --small --pizza-type=cheese
//{ debug: true, small: true, pizzaType: 'cheese' }
//pizza details:
//- small pizza size
//- cheese

const { Command } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
//디렉토리에 저장해야하므로 fs모듈 사용

const program = new Command();

program
  .option("-t, --title <title>", "HTML page title")
  .option("-r, --root", "Use top-level <div> with ID 'root'")
  .option("-b, --body <body>", "Body content for the HTML page");

program.parse(process.argv);

const options = program.opts();

//질문 생성하기

const Q = [
  {
    type: "input",
    name: "filename",
    message: "HTML 파일 명을 입력하시오",
    //validate 입력값을 인자로 받아 검증 결과를 반한 true면 유효
    //예시
    // function validateNumber(input) {
    //   const isValid = !isNaN(input) && input !== "";
    //   return isValid || "숫자가 아닙니다.";
    // } input 숫자인지 검증해서 true나 실패메세지 반환
    //isValid 변수에는 true, false 값이 저장됨.

    //입력값이 빈 문자열인지 확인
    validate: (value) => {
      if (value.length) {
        return true;
      } else {
        return "파일명을 입력하세요";
      }
    },
  },
  {
    type: "input",
    name: "title",
    message: "HTML 의 타이틀을 입력하세요",
    //when() inquirer.js에서 제공하는 함수
    //조건부 질문을 구현할 때 사용되는데 이전 답변에 따라 질문의 유무나 종류를 결정하는 등의 기능구현할 때 용이
    //첫번째 인자는 이전 질문에서 입력된 값을 평가하여 true,false반환함
    //두번째 인자는 true 일 때 출력한 질문
    //when 함수를 사용하여 출력되는 질문 객체는 반드시 name속성에 정의되어 있어야 함.
    when: () => !options.title,
    //options 객체 안에 title 속성이 존재하지 않거나
    //title 속성 값이 false인 경우
  },
  {
    type: "confirm",
    name: "useRoot",
    message: `body에 <div id="root">를 추가하시겠습니까?`,
    default: true,
    when: () => !options.useRoot,
    //options 객체 안에 useRoot값이 false인 경우
  },
  {
    //type : (문자열) 프롬프트의 유형입니다.
    // 기본값: input- 가능한 값: input, number, confirm, list,
    //rawlist, expand, checkbox, password,editor

    type: "input",
    name: "PtagContents",
    message: "<P>안에 작성할 내용을 입력해주세요.</P>",
    when: () => !options.PtagContents,
  },
];
//inquirer.prompt(questions, answers) -> promise를 반환하므로
//Promise의 then() 메소드를 사용하여 입력값을 처리한다.
//inquirer.prompt(questions).then((answers)=>{})
//입력값은 answers객체에 저장된다.

// //질문에 대한 답변을 받아와 answers 에 저장
// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };
// const returnedTarget = Object.assign(target, source);
// console.log(target);
// console.log(returnedTarget);

nquirer.prompt(questions).then((answers) => {
  const { filename, title, useRoot, PtagContents } = Object.assign(
    {},
    options,
    answers
  );
  //{},options,answers 형태로 하나의 객체를 만듦
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body>
      ${useRoot ? '<div id="root">' : ""}
      ${PtagContents}
      ${useRoot ? "</div>" : ""}
      
    </body>
    </html>`;

  fs.mkdirSync("result", { recursive: true });
});
