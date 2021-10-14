import React, { useState, useEffect } from "react";
import { message, Tree } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import style from "./style.less";
import { nanoid } from "nanoid";

const { TreeNode } = Tree;

export default function LayoutTree(props) {
  const { treeData, level } = props;

  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  // 输入框的值
  const [inputVal, setInputVal] = useState("");

  // 展开
  const onExpand = (expandedKeysVal) => {
    // console.log('expandedKeysVal', expandedKeysVal);
    // 记录折叠的key值
    setExpandedKeys(expandedKeysVal);
  };

  useEffect(() => {
    setData(treeData);
  }, [treeData]);

  const addNode = (key, dataVal, levelVal) =>
    dataVal.forEach((item) => {
      if (item.key === key) {
        if (item.children) {
          // console.log('levelVal', levelVal);
          item.children.push({
            isEditable: true,
            // value: "新增分类",
            level: levelVal + 1,
            key: `${nanoid()}N`, // 这个 key 应该是唯一的
          });
        } else {
          item.children = [];
          item.children.push({
            isEditable: true,
            // value: "新增分类",
            level: levelVal + 1,
            key: `${nanoid()}N`,
          });
        }
      }
      if (item.children) {
        addNode(key, item.children, levelVal);
      }
    });

  const onAdd = (key, item) => {
    // 看一下是否符合层级深度 当前的层级
    // 没有找到，则展开新的子项
    console.log("??", item);
    if (expandedKeys.indexOf(key) === -1) {
      expandedKeys.push(key);
    }
    setExpandedKeys(expandedKeys.slice());
    addNode(key, treeData, item.level);
    // useState里数据务必为immutable （不可赋值的对象），所以必须加上slice()返回一个新的数组对象
    setData(treeData.slice());
  };

  // 编辑
  const editNode = (key, dataVal) =>
    dataVal.forEach((item) => {
      // 这样点击另外一个编辑，之前的编辑则恢复原样：value 需要回退到 defaultvalue
      if (item.key === key) {
        item.isEditable = true;
        // 输入框设置值
        setInputVal(item.defaultValue);
      } else {
        item.isEditable = false;
      }
      item.value = item.defaultValue;
      if (item.children) {
        editNode(key, item.children);
      }
    });

  const onEdit = (key) => {
    editNode(key, treeData);
    setData(treeData.slice());
  };

  // 输入框
  const changeNode = (key, value, dataVal) =>
    dataVal.forEach((item) => {
      if (item.key === key) {
        item.value = value;
      }
      if (item.children) {
        changeNode(key, value, item.children);
      }
    });

  const onChange = (e, key) => {
    setInputVal(e.target.value);
    changeNode(key, e.target.value, treeData);
    setData(treeData.slice());
  };

  // 通过key找到businessTreeData 中的parentCode 找到上一级的businessCode
  // const findPar = (target, treeDataVal, parItem, kval) => {
  //   treeDataVal.map((item) => {
  //     if (item.key === target) {
  //       kval.push(parItem);
  //     }
  //     if (item.children && item.children.length !== 0) {
  //       findPar(target, item.children, item, kval);
  //     }
  //     return null;
  //   });
  // };

  // 保存
  const saveNode = (key, dataVal) =>
    dataVal.forEach((item) => {
      if (item.key === key) {
        item.defaultValue = item.value;
      }
      if (item.children) {
        saveNode(key, item.children);
      }
      item.isEditable = false;
    });

  const onSave = (key, item) => {
    if (inputVal === "") {
      message.error("输入框不能为空");
    } else {
      saveNode(key, treeData);
      setData(treeData.slice());
      // 这里进行service
    }
  };

  // 关闭： 删除该行
  // const closeNode = (key, defaultValue, dataVal) =>
  //   dataVal.forEach((item) => {
  //     item.isEditable = false;
  //     if (item.key === key) {
  //       item.value = defaultValue;
  //     }
  //     if (item.children) {
  //       closeNode(key, defaultValue, item.children);
  //     }
  //   });
  // const onClose = (key, defaultValue) => {
  //   closeNode(key, defaultValue, treeData);
  //   setData(treeData);
  // };

  // 删除
  const deleteNode = (key, dataVal) =>
    dataVal.forEach((item, index) => {
      if (item.key === key) {
        dataVal.splice(index, 1);
        return null;
      }
      if (item.children) {
        deleteNode(key, item.children);
      }
    });

  const onDelete = (key) => {
    deleteNode(key, treeData);
    setData(treeData.slice());
    // console.log('key', key);
    // 请求进行删除： 判断是否为本地新增的key,
    if (!key.endsWith("N")) {
      const param = {
        id: Number(key),
      };
      console.log("param", param);
      // 删除service
    }
  };

  // 展开信息
  const onShowInfo = (key, itemVal) => {
    console.log(key, itemVal);
  };

  const renderTreeNodes = (dataVal) => {
    const nodeArr = dataVal.map((item) => {
      if (item.isEditable) {
        item.title = (
          <div>
            <input
              value={item.value || ""}
              onChange={(e) => onChange(e, item.key)}
              placeholder="请填写新增分类的名称"
            />

            <CloseOutlined
              style={{ marginLeft: 10 }}
              onClick={() => onDelete(item.key, item.defaultValue)}
            />

            <CheckOutlined
              style={{ marginLeft: 10 }}
              onClick={() => onSave(item.key, item)}
            />
          </div>
        );
      } else {
        item.title = (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {item.parentKey === "0" ? (
              <span style={{ fontWeight: "bolder" }}>{item.value}</span>
            ) : (
              <span>{item.value}</span>
            )}

            <span>
              {item.parentKey === "0" ? (
                <span
                  style={{ marginLeft: 10, color: "rgb(24,144,255)" }}
                  onClick={() => onAdd(item.key, item)}
                >
                  {/* <PlusOutlined  /> */}
                  添加子类
                </span>
              ) : (
                <span>
                  {item.level < level ? (
                    <span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(24,144,255)" }}
                        onClick={() => onAdd(item.key, item)}
                      >
                        添加子类
                      </span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(24,144,255)" }}
                        onClick={() => onEdit(item.key)}
                      >
                        编辑名称
                      </span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(255,77,79)" }}
                        onClick={() => onDelete(item.key, item)}
                      >
                        删除
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(24,144,255)" }}
                        onClick={() => onShowInfo(item.key, item)}
                      >
                        查看成员
                      </span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(24,144,255)" }}
                        onClick={() => onEdit(item.key)}
                      >
                        编辑名称
                      </span>
                      <span
                        style={{ marginLeft: 10, color: "rgb(255,77,79)" }}
                        onClick={() => onDelete(item.key, item)}
                      >
                        删除
                      </span>
                    </span>
                  )}
                </span>
              )}
            </span>
          </div>
        );
      }
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode title={item.title} key={item.key} />;
    });

    return nodeArr;
  };

  return (
    <div className={style.layoutTree}>
      <Tree expandedKeys={expandedKeys} onExpand={onExpand}>
        {renderTreeNodes(data)}
      </Tree>
    </div>
  );
}
