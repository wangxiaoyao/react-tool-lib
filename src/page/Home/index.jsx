import React, { useEffect } from "react";
import { getHomeData, postHomeData } from "./service";

const Home = () => {
  const getHomeDataFun = async (paramVal) => {
    const data = await getHomeData(paramVal);
  };

  const postHomeDataFun = async (paramVal) => {
    const data = await postHomeData(paramVal);
  };

  useEffect(() => {
    const param = {
      name: "逍遥",
      age: 18,
    };
    getHomeDataFun(param);
    postHomeDataFun(param);
  }, []);
  return <div>home</div>;
};

export default Home;
