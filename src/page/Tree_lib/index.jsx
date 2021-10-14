import React, { useEffect, useState } from "react";
import DragTree from "./DragTree";
import LayoutTree from "./LayoutTree";

import { getLayoutTreeData } from "./service";

const businessTreeDataVal = [
  {
    value: "事件分类",
    defaultValue: "事件分类",
    key: "",
    parentKey: "0",
    isEditable: false,
    businessCode: "ABNORMAL_EVENT",
    children: [],
    level: 0,
  },
];

const Tree_lib = (props) => {
  const [layoutTreeData, setLayoutTreeData] = useState([]);

  const getLayoutTreeDataFun = async (paramVal) => {
    const data = await getLayoutTreeData(paramVal);
    console.log("??", data);
    if (data.length !== 0) {
      businessTreeDataVal[0].children = convertData(data);
      setLayoutTreeData(businessTreeDataVal.slice());
    } else {
      setLayoutTreeData(businessTreeDataVal.slice());
    }
  };

  // id 就是key
  const convertData = (dataVal) => {
    const newData = dataVal.map((item) => {
      if (item.children && item.children.length !== 0) {
        return {
          value: item.businessValue,
          defaultValue: item.businessValue,
          key: item.id.toString(),
          isEditable: false,
          parentCode: item.parentCode,
          businessCode: item.businessCode,
          children: convertData(item.children),
          level: item.level,
        };
      }
      return {
        value: item.businessValue,
        defaultValue: item.businessValue,
        key: item.id.toString(),
        isEditable: false,
        parentCode: item.parentCode,
        businessCode: item.businessCode,
        level: item.level,
      };
    });
    return newData;
  };

  useEffect(() => {
    getLayoutTreeDataFun();
  }, []);

  return (
    <div>
      <h1>树结构</h1>
      <div>
        <p>1 可拖拽的树</p>
        <DragTree />
      </div>
      <div>
        <p>2 利用renderTreeNodes重新渲染树的每一个节点</p>
        <LayoutTree treeData={layoutTreeData} level={3} />
      </div>
    </div>
  );
};

export default Tree_lib;
