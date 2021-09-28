const routeConfig = [
  {
    title: "首页",
    path: "/",
    component: require("@page/Home").default,
    key: "home",
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
  // {
  //   title: "树形结构",
  //   path: "/tree",
  //   component: require("@page/Tree_lib").default,
  //   key: "tree",
  // },
  // {
  //   title: "下拉刷新",
  //   path: "/iscroll",
  //   component: require("@page/Iscroll_lib").default,
  //   key: "iscroll",
  // },
  // {
  //   title: "可视化g2Plot",
  //   path: "/g2Plot",
  //   component: require("@page/G2Plot_lib").default,
  //   key: "g2Plot",
  // },
  // {
  //   title: "可视化g2",
  //   path: "/g2",
  //   component: require("@page/G2_lib").default,
  //   key: "g2",
  // },
  // {
  //   title: "规则树：或且等",
  //   path: "/ruleTree",
  //   component: require("@page/RuleTree_lib").default,
  //   key: "ruleTree",
  // },
  // {
  //   title: "页面拖拽",
  //   path: "/gridLayout",
  //   component: require("@page/GridLayout_lib").default,
  //   key: "gridLayout",
  // },
  // {
  //   title: "表单和table",
  //   path: "/formTable",
  //   component: require("@page/FormTable_lib").default,
  //   key: "formTable",
  // },

  // {
  //   title: "表单验证",
  //   path: "/formValidate",
  //   component: require("@page/FormValidate_lib").default,
  //   key: "formValidate",
  // },
];

export default routeConfig;
