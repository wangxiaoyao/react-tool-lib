import React, { useEffect } from "react";
import { getHomeData } from "./service";

const Home = () => {
  const getHomeDataFun = async () => {
    const data = await getHomeData();
    console.log("data", data);
  };
  useEffect(() => {
    getHomeDataFun();
  }, []);
  return <div>home</div>;
};

export default Home;
