const MockTree = {
  "GET /api/layoutTree.json": {
    data: [
      {
        businessCode: "WANGSHANG", // key
        businessDesc: "网商",
        businessValue: "网商贷", // 展示
        id: 1,
        parentId: 0,
        level: 1,
        children: [
          {
            businessCode: "WANGSHANG30", // key
            businessValue: "网商贷30", // 展示
            id: 30,
            parentId: 0,
            parentCode: "WANGSHANG30", // 父级业务码
            level: 2,
            children: [
              {
                businessCode: "WANGSHANG40", // key
                businessValue: "网商贷40", // 展示
                id: 40,
                parentId: 0,
                parentCode: "WANGSHANG40", // 父级业务码
                level: 3,
              },
            ],
          },
        ],
      },
      {
        businessCode: "WANGSHANG1", // key
        businessDesc: "网商1",
        businessValue: "网商贷1", // 展示
        id: 2,
        parentId: 0,
      },
    ],
    errorCode: "",
    errorLevel: "",
    message: "请求成功",
    success: true,
  },
};

module.exports = MockTree;
