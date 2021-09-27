import React, { useEffect } from "react";
import { Form, DatePicker, Button } from "antd";
import moment from "moment";

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
      executeTime: moment(moment().format("YYYY-MM"), "YYYY-MM"),
    });
  }, [form]);

  return (
    <div>
      <Form form={form}>
        <Form.Item name="executeTime" label="执行月份">
          <DatePicker picker="month" style={{ width: "220px" }} />
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
