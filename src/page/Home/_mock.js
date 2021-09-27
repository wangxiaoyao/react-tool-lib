const homeMock = {
  "GET /api/home.json": {
    data: {
      num: 1,
    },
    errorCode: "",
    errorLevel: "",
    message: "",
    success: true,
  },
  "POST /api/home.json": {
    data: {
      num: 2,
    },
    errorCode: "",
    errorLevel: "",
    message: "post错误",
    success: false,
  },
};

module.exports = homeMock;
