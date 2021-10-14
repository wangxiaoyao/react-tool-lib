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
];

export default routeConfig;
