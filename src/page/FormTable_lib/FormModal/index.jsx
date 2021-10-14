import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";

const FormModal = (props) => {
  const { formModal, modalData } = props;
  const { Option } = Select;
  const layout = {
    // 控制左右移动
    labelCol: { span: 4 },
    // 控制长度
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    // 表单回显
    if (modalData && Object.keys(modalData).length !== 0) {
      formModal.setFieldsValue({
        name: modalData.name,
        id: modalData.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);

  return (
    <div>
      <Form form={formModal} {...layout} preserve={false}>
        <Form.Item name="name" label="名字">
          <Input />
        </Form.Item>

        <Form.Item
          name="id"
          label="值"
          rules={[{ required: true, message: "不能为空" }]}
        >
          <Select>
            {[0, 1].map((item) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormModal;
