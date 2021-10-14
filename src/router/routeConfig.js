const routeConfig = [
  {
    title: "首页",
    path: "/",
    component: require("@page/Home").default,
    key: "home",
  },
  {
    title: "首页之page1",
    path: "/home/page1",
    component: require("@page/Home/Page1").default,
    key: "homePage1",
  },
  {
    title: "首页之page2",
    path: "/home/page2",
    component: require("@page/Home/Page2").default,
    key: "homePage2",
  },
  // 功能性
  {
    title: "表单表格页面",
    path: "/formTable",
    component: require("@page/FormTable_lib").default,
    key: "formTable",
  },
  {
    title: "表格下载",
    path: "/download",
    component: require("@page/Download_lib").default,
    key: "download",
  },
  {
    title: "动态表单",
    path: "/dynamicForm",
    component: require("@page/DynamicForm_lib").default,
    key: "dynamicForm",
  },
  {
    title: "粘贴图片上传",
    path: "/pasteUpImg",
    component: require("@page/PasteUpImg_lib").default,
    key: "pasteUpImg",
  },
  {
    title: "可视化g2图形",
    path: "/g2",
    component: require("@page/G2_lib").default,
    key: "g2",
  },
  {
    title: "树形结构",
    path: "/tree",
    component: require("@page/Tree_lib").default,
    key: "tree",
  },
];

export default routeConfig;
