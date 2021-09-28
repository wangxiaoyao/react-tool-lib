# react-tool-lib

依据 create-react-app 创建一个 react 库，积累开发过程中常见库/案例的使用

两个分支：

- master：基本框架
- lib：常用库/案例： 放在 page 目录下。 文件夹以 '\_lib' 结尾。

注意： 涉及到主体架构的修改。切换分支到 main，然后 lib 分支 来合并 main 的修改内容。

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
- page:功能页面和路由对应
- router:路由配置页面
- util:工具js页面
- nodeServer:服务端server

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

- 1 路由配置项：routeConfig。 该文件定义了此项目所有路由路径。非常简单的路由处理：没有redirect，没有内嵌children。

- 2 RouteView：用来分解routeConfig配置文件。

没有找到的路由，展示为404
```

### 2 service 和 Mock 数据

- 1 利用 fetch Api 接口封装了一个 request 的请求。放在文件夹 util 中。方便处理 http 的请求头，以及 get 请求参数的拼接。delete 和 put 方法类似 post 就不写了。人懒~

- 2 统一处理“返回信息”的函数。以及弹出信息。而不依赖 antd 的组件 message

- 3 使用 node.js 原生自启一个本地服务。端口设为 3001。此服务用来将 Mock 文件夹下任意名称文件,以及 src/page 文件夹所有名为 "\_mock.js" 文件集合起来。得到一个 Mock 的对象数据集。 此对象 key 为：http 的请求方法+请求路径。 value 为对应的数据。 之后在 http 中对 requset 进行匹配，将对应数据并作为 response 输出。 注意：后端返回接口标准：参见\_testMock.js

- 4 使用 proxy 代理，将所有请求转为对自启服务的请求。修改 package.json。 补上 proxy。 但是查看 network 的请求路径，依旧是对 3000 端口的请求

```
"proxy": http://127.0.0.1:3001
```

- 5 若希望接口值的变化，可以使用 Mock.js 进行值的变动处理。这里不添加了。

- 6 修改 package.json：中的 script 保证前端和服务端”&“ 并行运行

```
"start": "node scripts/start.js & node nodeServer/server.js",
```

### 3 css 处理

1 初始化 css 放入 index.css 中

2 使用 less, localIdentName。原因：由于 antd 使用了 less 所以......

> 使用 less 进行 css 的解析。并配置 localIdentName 作为 class 的命名规则。 在生产环境下修改规则，生成更短的 class 名，可以提高 CSS 的压缩率。选择 base64 的 5 个字符。

```
## 安装: 特别注意less-loader高版本有问题
npm install less less-loader@7.3.0 --save-dev
```

```
## webpack修改：注意写在file-loader上面
            // less
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                 {
                  importLoaders: 2,
                  modules: {
                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  },
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                "less-loader"
              ),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                "less-loader"
              ),
            },
```

## lib 分支

### 1 表单表格页面：

```
## 安装antd

## 下载antd的同时会下载出moment。下面这样引用
import moment from "moment";
```

结构为：头部 form + 底部 table + 弹出框 modal

功能：

- 1 头部 form 点击查询，获得 table 数据。
- 2 点击弹框：modalform 表单反选，以及 layout 的布局方式。 Modal 销毁，modalform 的清空
- 3 table 分页功能。前端分页，后端分页
- 4 表单校验：输入参数值的校验：各种正则等。命名以 Validator 结尾

### 2 下载组件

```
## 下载组件xlsx
npm install xlsx
```

功能：已知数据生成 Excel 表格，并下载的功能。

### 3 动态表单增减

功能：动态增删 Form.Item，以及提交 Form 表单的功能。

### 4 粘贴图片上传功能

功能：ctrl+v 粘贴到本页面上。

包含两部分功能：

- 1 传给后端二进制数据。
- 2 前端页面展示问题： 有两种方法 第一种是等后端生成资源的 URL。第二种是前端生成二进制文件（比如 base64）进行展示

### 5 G2 图形库

```
## 安装
npm install @antv/g2

- G2Base.js  基础版本
```

功能：利用 G2 渲染图表。统一由 index.jsx 分配数据。多种不同要求的图形形成多种 js 文件。 以下是注意点：

- 1 当图表无法渲染，注意是否存在多个 id 命名为 container。

### 6 tree

```
## nanoid 会随antd带过来

- DragTree: 可以拖拽的树
- LayoutTree : 利用renderTreeNodes重新渲染树的每一个节点
```

功能： 树的相关内容。
