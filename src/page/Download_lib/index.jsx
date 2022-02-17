import React from "react";
import { downloadDataToExcel } from "./downloadUtil";
import downloadData from "./data";

/**
 * 专门用来处理下载数据的函数。构成表的每一行
 * @param {obj} sheetData
 * @param {obj} data
 * @returns
 */

const dealDownTableData = (excelStruct, data) => {
  data.forEach((item) => {
    // 可以防止Excell转为科学计数法
    const arrItem = [item.name, `${item.num1}`, `${item.num2}`];
    // 在基本表结构基础上补充数据
    excelStruct.push(arrItem);
    if (item.children) {
      dealDownTableData(excelStruct, item.children);
    }
  });
  return excelStruct;
};

const Download_lib = () => {
  const handleDownLoad = () => {
    const excelConfig = {
      title: "表名称",
      data: downloadData,
      // 表结构：也就是表的固定,除数据外的基本布局。null相当与占位符
      excelStruct: [
        [null, "测试合并单元格用"],
        ["表名", "num1", "num2"],
        [null],
      ],
    };
    downloadDataToExcel(excelConfig, dealDownTableData);
  };
  return (
    <div>
      <h1>已知数据生成Excel表格，并下载的功能</h1>
      <button onClick={handleDownLoad}>点击下载</button>
    </div>
  );
};

export default Download_lib;
