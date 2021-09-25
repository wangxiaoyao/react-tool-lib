# react-tool-lib

依据 create-react-app 创建一个 react 库，积累开发过程中常见库/案例的使用

两个分支：

- master：基本框架
- lib：常用库/案例： 放在 page 目录下。 文件夹以 '\_lib' 结尾。

## 1 主分支 master

内容：构建基本框架，确定基本目录结构，路由，请求 service 以及 Mock 数据 ，less

```
## 固定稳定版本node
brew update
brew install node@14.17.6

## 依据 create-react-app 脚手架创建项目
npx create-react-app Myapp

## 暴露webpack（建好项目后立刻处理）
npm run eject

## 目录架构调整
- page
- router
- service
- util

## 引用路径简化
alias: {
"@src": path.resolve("src"),
"@page": path.resolve("src/page")
}
```

### 1 配置路由

```
## 安装
npm install react-router-dom

## 两个文件

- 1 路由配置项：routeConfig。 该文件定义了此项目所有路由路径。非常简单的路由处理：没有redirect，没有内嵌children

- 2 RouteView：用来分解routeConfig配置文件。

没有找到的路由，展示为404
```

### 2 service 和 Mock 数据

- 1 利用 fetch Api 接口封装了一个请求放在文件夹 util/request.js 中。

- 2 使用 node.js 原生自启一个本地服务。端口设为 3001。此服务将 Mock 文件夹下任意名称文件,以及 src/page 文件夹所有名为 "\_mock.js" 文件集合。 依据请求路径，作为路由输出。 注意：后端返回接口标准：参见\_testMock.js

- 3 使用 proxy 代理，将所有请求转为对自启服务的请求。修改 package.json。 补上 proxy

```
"proxy": http://127.0.0.1:3001
```

- 4 若希望接口值的变化，可以使用 Mock.js 进行值的变动处理。

- 5 修改 package.json：中的 script 保证前端和服务端”&“ 并行运行

```
"start": "node scripts/start.js & node nodeServer/server.js",
```

### 3 css 处理

1 初始化 css 放入 index.css 中

2 使用 less, localIdentName

## 2 lib 分支

内容：体现在 page 目录下各种库以及案例

```
## 创建分支

```
