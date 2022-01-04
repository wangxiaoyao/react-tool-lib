// JS常用工具函数

/**
 * 比较某个对象某个属性值最大
 * @param {arr} arrVal
 * @param {string} objKey
 * @returns
 */

export const maxObjKey = (arrVal, objKey) => {
  return Math.max.apply(
    Math,
    arrVal.map(function (obj) {
      return obj.objKey;
    })
  );
};

/**
 * 利用set数组去重
 * @param {array} arr
 * @returns
 */

export const removeDuplicates = (arr) => [...new Set(arr)];

/**
 * goole.com?search=easy&page=3  =》 { search : "easy", page : 3 }
 * @returns 获取url查询参数
 */

export const getUrlParam = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));

/**
 * 子数组的某些属性，去找到父数组中全部信息
 * @param {arr} parArr
 * @param {arr} childArr
 * @param {string} key
 * @returns {arr}
 */

export const utilDoubleArr = (parArr, childArr, key) => {
  const dataTemp = [];
  let temp = [];
  for (let index = 0; index < childArr.length; index++) {
    temp = parArr.filter((item) => item[key] === childArr[index]);
    dataTemp.push(temp[0]);
  }
  return dataTemp;
};
