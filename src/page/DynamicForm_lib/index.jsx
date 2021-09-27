import React, { useState } from "react";
import { Form, Input } from "antd";
import style from "./style.less";

const DynamicForm_lib = () => {
  const [form] = Form.useForm();
  // [1,2,3] 从1开始的递增数组
  const [dynItemArr, setDyaItemArr] = useState([]);

  // 增
  const handleAddItem = () => {
    const num = (dynItemArr[dynItemArr.length - 1] || 0) + 1;
    const result = [...dynItemArr, num];
    setDyaItemArr(result);
  };
  // 减
  const handleDelItem = (item) => {
    // 清空表单
    form.setFieldsValue({
      [`name${item}`]: "",
    });
    const result = dynItemArr.filter((val) => val !== item);
    setDyaItemArr(result);
  };

  const submitForm = () => {
    form.validateFields().then((formVal) => {
      const result = [];
      dynItemArr.map((item) => {
        const val = {
          [`name${item}`]: formVal[`name${item}`],
        };
        result.push(val);
        return null;
      });
      console.log("所有的表单值formVal", formVal);
    });
  };

  return (
    <div className={style.dyanamicForm}>
      <h1>动态增加/减少表单:</h1>
      <Form form={form}>
        {dynItemArr.length !== 0 &&
          dynItemArr.map((item, index) => (
            <div className={style.dyaItem} key={item}>
              <Form.Item
                name={`name${item}`}
                label={`姓名${index}`}
                rules={[{ required: true, message: "不能为空" }]}
              >
                <Input style={{ width: "136px" }}></Input>
              </Form.Item>
              <span
                onClick={() => {
                  handleDelItem(item);
                }}
              >
                删除
              </span>
            </div>
          ))}
      </Form>
      <button onClick={handleAddItem}>新增</button>
      <button onClick={submitForm}>提交表单</button>
    </div>
  );
};

export default DynamicForm_lib;
