const fs = require("fs");

function mkdir(dirPath) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

mkdir("./test/mkdir"); //비동기방식
fs.mkdirSync; //동기방식 파일시스템에서 새 디렉토리를 만들고,
//작업이 완료될때까지 코드의 실행이 일시 중지 됨.
//에러가 발생하면 예외를 던진다.
fs.mkdirSync("./test/jieun");
