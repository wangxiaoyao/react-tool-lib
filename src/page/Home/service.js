import { request } from "@src/util/request.js";

export const getHomeData = async () => {
  const result = await fetch("/api/home.json", {
    method: "GET",
  });
  const data = await result.json();
  return data;
};
