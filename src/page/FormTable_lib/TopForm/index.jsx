import React, { useEffect } from "react";
import { Form, DatePicker, Button, Input } from "antd";
import moment from "moment";
import { nonNegativeValidator } from "@src/util/formValidate";

const TopForm = (props) => {
  const { form, handleSubmit, handleButtonOpenModal } = props;

  const onFinish = () => {
    form.validateFields().then((formVal) => {
      handleSubmit(formVal);
    });
  };
  const handleOpenModal = () => {
    handleButtonOpenModal();
  };

  useEffect(() => {
    form.setFieldsValue({
      // 由于Input 输入都是 String 类型。所以回显的时候，必须将其转为String类型。
      executeTime: moment(moment().format("YYYY-MM"), "YYYY-MM"),
    });
  }, [form]);

  return (
    <div>
      <Form form={form}>
        <Form.Item name="executeTime" label="执行月份">
          <DatePicker picker="month" style={{ width: "220px" }} />
        </Form.Item>
        <Form.Item
          name="formValidate"
          label="表单正则校验"
          rules={[
            {
              required: true,
              message: "不能为空",
              whitespace: true,
            },
            nonNegativeValidator,
          ]}
        >
          <Input style={{ width: "220px" }}></Input>
        </Form.Item>
      </Form>
      <div>
        <Button type="primary" onClick={onFinish}>
          查询
        </Button>
        <Button type="primary" onClick={handleOpenModal}>
          弹框
        </Button>
      </div>
    </div>
  );
};

export default TopForm;
