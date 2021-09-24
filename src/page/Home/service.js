export const getHomeData = async () => {
  const result = await fetch("/api/home.json", {
    method: "GET",
  });
  const data = await result.json();
  console.log(123, data);
  return data;
};
