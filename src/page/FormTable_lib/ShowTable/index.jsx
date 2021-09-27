import React from "react";
import { Table, Popconfirm } from "antd";

const ShowTable = ({ showTableData, getFormTableDataFun, headFormVal }) => {
  // 分页: 若是前端分页 只需要将paginationProps 设置为变量（useState）
  let paginationProps = {};
  if (
    showTableData.paginator &&
    Object.keys(showTableData.paginator).length !== 0
  ) {
    paginationProps = {
      // 数据总数
      total: showTableData.paginator.items,
      // 当前页码
      current: showTableData.paginator.page,
      // 每页多少数据：若是后端控制此处不需要设置
      // pageSize: 10,
      // 是否展示每页多少数据
      showSizeChanger: true,
      // 是否支持快速跳转
      showQuickJumper: true,
      // 共有多少条数据
      showTotal: (total) => `共有 ${total} 条`,
    };
  }
  // 行
  const columns = [
    {
      title: "执行月份",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "规划状态",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        switch (text) {
          case "DAISHENGXIAO":
            return <p>待生效</p>;
          case "YISHENGXIAO":
            return <p>已生效</p>;
          case "YISHIXIAO":
            return <p>已失效</p>;
          default:
            break;
        }
      },
    },
    {
      title: "操作",
      dataIndex: "result",
      key: "result",
      render: (_, record) => (
        <div>
          <span
            style={{ color: "rgb(37,147,252)", cursor: "pointer" }}
            onClick={() => handleTableEdit(record)}
          >
            编辑
          </span>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleTableDel(record)}
            okText="确定"
            cancelText="取消"
          >
            <span
              style={{ color: "red", marginLeft: "5px", cursor: "pointer" }}
              // onClick={}
            >
              删除
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //event
  // 表格操作
  const handleTableDel = (recordVal) => {
    console.log("recordVal", recordVal);
  };
  const handleTableEdit = (recordVal) => {
    console.log("recordVal", recordVal);
  };

  // 改变页码
  const handleChangePageNum = (page) => {
    // 当调到第3页， 而此时调整每页条数，此时的page.current从第一页开始。这是符合逻辑的
    const params = {
      ...headFormVal,
      pageNo: page.current,
      pageSize: page.pageSize,
    };
    getFormTableDataFun(params);
  };

  return (
    <Table
      // 兼容最小1100px表格滑动
      scroll={{ x: 1100 }}
      columns={columns}
      dataSource={showTableData.resultList || []}
      pagination={paginationProps}
      // 页码改变的回调
      onChange={handleChangePageNum}
      // 为了解决antd key报错。 确保表格数据有id
      rowKey={(record) => record.id}
    />
  );
};

export default ShowTable;
