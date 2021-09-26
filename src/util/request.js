// const codeMessage = {
//   200: "服务器成功返回请求的数据。",
//   201: "新建或修改数据成功。",
//   202: "一个请求已经进入后台排队（异步任务）。",
//   204: "删除数据成功。",
//   400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
//   401: "用户没有权限（令牌、用户名、密码错误）。",
//   403: "用户得到授权，但是访问是被禁止的。",
//   404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
//   406: "请求的格式不可得。",
//   410: "请求的资源被永久删除，且不会再得到的。",
//   422: "当创建一个对象时，发生一个验证错误。",
//   500: "服务器发生错误，请检查服务器。",
//   502: "网关错误。",
//   503: "服务不可用，服务器暂时过载或维护。",
//   504: "网关超时。",
// };

// 字符串拼接，并对发送的url的param进行编码
const encodeParam = (objParamVal) => {
  let encodeParamVal = "";
  let index = 0;
  for (const key in objParamVal) {
    index += 1;
    if (index === Object.keys(objParamVal).length) {
      encodeParamVal +=
        encodeURIComponent(key) + "=" + encodeURIComponent(objParamVal[key]);
    } else {
      encodeParamVal +=
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(objParamVal[key]) +
        "&";
    }
  }
  return encodeParamVal;
};

// 用于拼接GET的参数
const combineUrlParam = (urlVal, paramVal) => {
  let combineUrl = "";
  if (paramVal && Object.keys(paramVal).length !== 0) {
    combineUrl = urlVal + "?" + encodeParam(paramVal);
  } else {
    combineUrl = urlVal;
  }
  return combineUrl;
};

const request = (urlVal, reqInfo) => {
  if (reqInfo.method === "GET" || reqInfo.method === null) {
    return fetch(combineUrlParam(urlVal, reqInfo.data), {
      method: "GET",
    }).then((res) => res.json());
  }
  if (reqInfo.method === "POST") {
    return fetch(urlVal, {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      // 既然头部信息告知传的是Json，就把对象转一下
      body: JSON.stringify(reqInfo.data),
      method: "POST",
    }).then((res) => res.json());
  }
};

export default request;
