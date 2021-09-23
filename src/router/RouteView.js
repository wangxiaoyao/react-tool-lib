import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
class RouteView extends Component {
  render() {
    //props接收配置文件
    //routers 下一级路由的参数
    //defaultConfig默认传参
    const { routers, defaultConfig } = this.props;
    let routerDate = routers ? routers : defaultConfig;
    //数据二次处理

    //筛除带有重定向的
    let routerDatepath = routerDate.filter((item) => {
      return !item.redirect;
    });
    //筛选重定向
    let defualtRouter = routerDate.filter((item) => {
      return item.redirect;
    });
    //重定向
    let defualtRedirect = defualtRouter.map((item, i) => {
      return <Redirect key={i} path={item.path} to={item.redirect}></Redirect>;
    });
    return (
      <Switch>
        {routerDatepath &&
          routerDatepath
            .map((item, index) => {
              const Comp = item.component;
              // 一个大坑 要用render 不然用component会导致页面的回流
              return (
                <Route
                  path={item.path}
                  render={
                    //api 路由相关参数参数及其它
                    (api) => {
                      //动态的title
                      document.title = item.title || "后台管理系统";
                      //把下一级路由参数存入props中
                      return <Comp routers={item.children} {...api}></Comp>;
                    }
                  }
                  key={"key" + item.key}
                ></Route>
              );
              //重定向
            })
            .concat(defualtRedirect)}
      </Switch>
    );
  }
}
export default RouteView;
