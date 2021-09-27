import React, { useEffect } from "react";
import { getHomeData, postHomeData } from "./service";
import style from "./style.less";

const Home = () => {
  const getHomeDataFun = async (paramVal) => {
    const data = await getHomeData(paramVal);
    console.log("getHomeData", data);
  };

  const postHomeDataFun = async (paramVal) => {
    const data = await postHomeData(paramVal);
    console.log("postHomeData", data);
  };

  useEffect(() => {
    const param = {
      name: "逍遥",
      age: 18,
    };
    getHomeDataFun(param);
    postHomeDataFun(param);
  }, []);
  return (
    <div className={style.home}>
      home
      <p className={style.content}>欢迎光临</p>
    </div>
  );
};

export default Home;
