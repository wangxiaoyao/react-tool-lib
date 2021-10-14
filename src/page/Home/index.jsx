/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getHomeData, postHomeData } from "./service";
import style from "./style.less";

const Home = () => {
  const history = useHistory();

  const getHomeDataFun = async (paramVal) => {
    const data = await getHomeData(paramVal);
    // 健壮性：对后端传入的值进行检测。防止前端页面崩溃。
    // 1 可以利用 || 防止k是undefined的情况：  let value = k || ''
    // 2 map没有数据会报错。 (arrVal || []).map()。
    if (data && Object.keys(data).length !== 0) {
      console.log("getHomeData", data);
    }
  };

  const postHomeDataFun = async (paramVal) => {
    const data = await postHomeData(paramVal);
    if (data && Object.keys(data).length !== 0) {
      console.log("postHomeData", data);
    }
  };

  const handleClickToPage2 = () => {
    history.push({
      pathname: "/home/page2",
      search: "?sort=name",
      hash: "#the-hash",
      state: { name: "xiaoyao" },
    });
  };

  useEffect(() => {
    const param = {
      name: "逍遥",
      age: 18,
    };
    getHomeDataFun(param);
    // debugger; 用来对框架式页面进行调试
    postHomeDataFun(param);
  }, []);
  return (
    <div className={style.home}>
      <div>home</div>
      <Link
        to={{
          pathname: "/home/page1",
          search: "?sort=name",
          hash: "#the-hash",
          state: { name: "xiaoyao" },
          query: JSON.stringify({ k: 1 }),
        }}
        // target="_blank"
      >
        点击方式：跳转page1
      </Link>
      <div>
        <a href="" onClick={handleClickToPage2}>
          push方式：跳转路由到page2
        </a>
      </div>
    </div>
  );
};

export default Home;
