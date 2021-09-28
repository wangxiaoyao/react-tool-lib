// let _check = /^([1-9][\d]{0,6}|0)(\.[\d]{1,2})?$/; //限制小数点前后位数

// 输入非负数金额:可以为小数，0
export const nonNegativeValidator = () => ({
  validator(rule, value) {
    const reg = RegExp(/^([1-9][\d]*|0)(\.[\d]+)?$/);
    if (typeof value === "string" && value.match(reg)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("请输入非负数金额"));
  },
});

// 金额：为空，正数，负数，0(小数点保留2位),
export const amountNumValidator = () => ({
  validator(_, value) {
    const reg = RegExp(/^-?\d+\.?\d{0,2}$/);
    if (value === undefined || value === "") {
      return Promise.resolve();
    }
    if (typeof value === "string" && value.match(reg)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("请输入正确金额"));
  },
});

// 数字
export const numberValidator = () => ({
  validator(rule, value) {
    const reg = RegExp(/^\d+$/);
    if (typeof value === "string" && value.match(reg)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("请输入数字"));
  },
});

// 手机号码验证
export const phoneNumValidator = () => ({
  validator(rule, value) {
    const reg = RegExp(/^1[3-9]\d{9}$/);
    if (typeof value === "string" && value.match(reg)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("请输入正确手机号码"));
  },
});

// 匹配中文相关符号
export const ChinaSymbolValidator = () => ({
  validator(rule, value) {
    const reg = RegExp(
      /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
    );
    if (typeof value === "string" && value.match(reg)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("不能输入中文符号"));
  },
});
