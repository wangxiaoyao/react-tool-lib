import React, { useState } from "react";
import { Tree } from "antd";
import style from "./style.less";

const { TreeNode } = Tree;
// 数据
const treeDataMock = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf1",
            key: "0-0-0-1",
            disableCheckbox: true,
          },
          {
            title: "leaf2",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1890ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const DragTree = (props) => {
  const [treeData, setTreeData] = useState(treeDataMock);

  // 通过key 找到对应的元素
  const loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      // 注意这里的id是否需要对字符串转换 toString()
      if (item.key.toString() === key) {
        return callback(item, index, arr);
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };

  const onDrop = (info) => {
    const data = [...treeData];
    // 拖拽目的地上方或者下方的key:
    const dropKey = info.node.props.eventKey;
    // 拖拽的那个key
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // 分离出 dragObject 和 原本的数组
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    console.log("dragObj:就是找到的那个对象", dragObj);

    // 放的目的地位置： 一般用于排序需要。这里处理：
    // 1 通过css隐藏了top的线，保证preDragObj是上方那个节点
    // 2 当放到树顶端时， dropPosition 就会是-1. 此时preDragObj会是下面那个节点
    let preDragObj;
    let prevPriority;
    loop(data, dropKey, (item) => {
      preDragObj = item;
    });
    console.log("目的地位置的上面的对象", preDragObj);
    if (info.dropPosition === -1) {
      prevPriority = 0;
    } else {
      prevPriority = preDragObj.priority;
    }

    // 将dragObject 和 排除dragObject后的数组  两者组合
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setTreeData(data);
    // 拖拽调用接口： 可能需要preDragObj这个对象值
    // editDragCateRelationApiFun(editParams);
  };

  // 选择哪一个treeNode
  const onSelectTreeItem = (selectedKeys, e) => {
    console.log("selectedKeys", selectedKeys);
    if (e.selected === true) {
      console.log("e", e);
    }
  };

  const loopNode = (data) =>
    data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.key}
            title={item.title}
            disabled={item.disabled}
            // 可以依据node的信息改变节点的样式
            // className={item.status === 0 ? styles.prohibitItem : null}
          >
            {loopNode(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.key}
          title={item.title}
          disabled={item.disabled}
          // className={item.status === 0 ? styles.prohibitItem : null}
        />
      );
    });

  return (
    <div className={style.dragTree}>
      <Tree
        defaultExpandAll
        showLin
        blockNode
        draggable
        onDrop={onDrop}
        onSelect={onSelectTreeItem}
      >
        {loopNode(treeData)}
      </Tree>
    </div>
  );
};

export default DragTree;
