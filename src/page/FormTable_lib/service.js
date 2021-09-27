import request from "@src/util/request.js";

export const getFormTableData = async (params) => {
  const data = await request("/api/formTable.json", {
    method: "GET",
    data: params,
  });
  return data;
};

export const getFormModalData = async (params) => {
  const data = await request("/api/formModal.json", {
    method: "GET",
    data: params,
  });
  return data;
};
