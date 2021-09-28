const mockFormTable = {
  "GET /api/formTable.json": {
    errorCode: "",
    errorLevel: "",
    message: "",
    success: true,
    data: {
      paginator: {
        beginIndex: 1,
        endIndex: 11,
        firstPage: 1,
        items: 100, // 数据总数
        itemsPerPage: 200,
        lastPage: 1,
        length: 11,
        nextPage: 2,
        offset: 0,
        page: 2, // 当前页码
        pages: 5,
        previousPage: 1,
        slider: [1],
      },
      resultList: [
        {
          id: 1,
          month: "2020-12", // 执行月份
          status: "DAISHENGXIAO", // DAISHENGXIAO(待生效),YISHENGXIAO(已生效),YISHIXIAO(已失效)
        },
      ],
    },
  },
  "GET /api/formModal.json": {
    errorCode: "",
    errorLevel: "",
    message: "",
    success: true,
    data: {
      name: "xiaoyao",
      id: 1,
    },
  },
};

module.exports = mockFormTable;
