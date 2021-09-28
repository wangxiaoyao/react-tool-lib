import request from "@src/util/request.js";

export const postPasteUpImg = async (params) => {
  const data = await request("/api/pasteUpImg.json", {
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
