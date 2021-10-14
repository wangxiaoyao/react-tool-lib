import React from "react";
import { downloadDataToExcel } from "./downloadUtil";
import downloadData from "./data";

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
    downloadDataToExcel(excelConfig);
  };
  return (
    <div>
      <h1>已知数据生成Excel表格，并下载的功能</h1>
      <button onClick={handleDownLoad}>点击下载</button>
      <div>
        一般性下载文件可以使用a标签。由后端给href的地址。注意文件名也由后端给，不要使用download属性
      </div>
    </div>
  );
};

export default Download_lib;
