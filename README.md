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

### 2 css 处理

1 初始化 css 放入 index.css 中

2 使用 less, localIdentName

## 2 lib 分支

内容：体现在 page 目录下各种库以及案例

```
## 创建分支

```
