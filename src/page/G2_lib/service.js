import request from "@src/util/request.js";

export const getG2BaseData = async (params) => {
  const data = await request("/api/g2Base.json", {
    method: "GET",
    data: params,
  });
  return data;
};
