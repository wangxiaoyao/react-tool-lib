import React, { useEffect } from "react";
import { getHomeData } from "./service";

const Home = () => {
  const getHomeJsonFun = () => {
    fetch("/api/home.json")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    getHomeJsonFun();
    // async function getHomeDataFun() {
    //   const data = await getHomeData();
    //   return data;
    // }
    // getHomeDataFun();
  }, []);
  return <div>home</div>;
};

export default Home;
