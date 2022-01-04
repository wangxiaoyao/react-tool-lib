// 用于保存映射关系：constant常量 和 对应的转化fun
export const Atypes = [
  { key: "BA", value: "投行" },
  { key: "CA", value: "逍遥" },
];

export const AtypesFun = (val) => {
  switch (val) {
    case "BA":
      return "投行";
    case "CA":
      return "逍遥";
    default:
      break;
  }
};
