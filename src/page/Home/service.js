import wrapRequestMsg from "@src/util/request.js";

export const getHomeData = async (params) => {
  const data = await wrapRequestMsg("/api/home.json", {
    method: "GET",
    data: params,
  });
  return data;
};

export const postHomeData = async (params) => {
  const data = await wrapRequestMsg("/api/home.json", {
    method: "POST",
    data: params,
  });
  return data;
};
