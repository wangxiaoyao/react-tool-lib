import request from "@src/util/request.js";

export const getLayoutTreeData = async (params) => {
  const data = await request("/api/layoutTree.json", {
    method: "GET",
    data: params,
  });
  return data;
};
