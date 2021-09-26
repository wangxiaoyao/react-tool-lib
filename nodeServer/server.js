const http = require("http");
const fs = require("fs");
const path = require("path");

//1 读取所有的Mock文件并合成一个对象：
const mockObject = {};
// - 1 Mock文件夹下所有文件
const mockPath = path.resolve(__dirname, "../Mock");
// 不仅是文件夹还有文件
const getMockFileByPathFun = (pathVal) => {
  const readMockDir = fs.readdirSync(pathVal);
  if (readMockDir.length !== 0) {
    readMockDir.map((item) => {
      let stat = fs.statSync(path.join(pathVal, item));
      if (stat.isDirectory() === true) {
        const fpath = path.join(pathVal, item);
        getMockFileByPathFun(fpath);
      }
      if (stat.isFile() === true) {
        Object.assign(mockObject, require(pathVal + "/" + item));
      }
    });
  }
  return null;
};
getMockFileByPathFun(mockPath);
// - 2 page页面内所有的 '_mock.js'文件
const readPageMockDir = path.resolve(__dirname, "../src/page");
const getPageMockFileByPathFun = (pathVal) => {
  const readMockDir = fs.readdirSync(pathVal);
  if (readMockDir.length !== 0) {
    readMockDir.map((item) => {
      let stat = fs.statSync(path.join(pathVal, item));
      if (stat.isDirectory() === true) {
        const fpath = path.join(pathVal, item);
        getPageMockFileByPathFun(fpath);
      }
      if (stat.isFile() === true && item === "_mock.js") {
        Object.assign(mockObject, require(pathVal + "/" + item));
      }
    });
  }
  return null;
};
getPageMockFileByPathFun(readPageMockDir);

//2 依据请求在mockObject对象中筛选对应的可以 返回res
const getResbyFilterReqFun = (reqKeyVal) => {
  if (reqKeyVal) {
    for (let key in mockObject) {
      // 注意当get带参数时需要去掉？后面的部分。否则无法和mockObject匹配
      if (
        key ===
        (reqKeyVal.indexOf("?") === -1
          ? reqKeyVal.toString()
          : reqKeyVal.toString().slice(0, reqKeyVal.indexOf("?")))
      ) {
        return mockObject[key];
      }
    }
  }
  console.log("没有请求的方法和url");
  return null;
};

const server = http.createServer((req, res) => {
  const reqKey = req.method + " " + req.url;
  const resResult = getResbyFilterReqFun(reqKey);
  if (resResult) {
    res.writeHead(200, { "Content-Type": "application/json" });
    // 返回的只能是：<string> | <Buffer> 类型。
    res.end(JSON.stringify(resResult));
  }
});

server.listen(3001, "127.0.0.1", () => {
  console.log("服务器启动了");
});
