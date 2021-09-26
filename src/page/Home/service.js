import request from "@src/util/request.js";

export const getHomeData = async (params) => {
  const data = await request("/api/home.json", {
    method: "GET",
    data: params,
  });
  console.log("data", data);
  return data;
};

export const postHomeData = async (params) => {
  const data = await request("/api/home.json", {
    method: "POST",
    data: params,
  });
  console.log("data", data);
  return data;
};
