const homeMock = {
  "GET /api/home.json": {
    data: {
      num: 2,
    },
    errorCode: "",
    errorLevel: "",
    message: "",
    success: false,
  },
  "POST /api/home.json": {
    data: {
      num: 222,
    },
    errorCode: "",
    errorLevel: "",
    message: "post错误",
    success: false,
  },
};

module.exports = homeMock;
