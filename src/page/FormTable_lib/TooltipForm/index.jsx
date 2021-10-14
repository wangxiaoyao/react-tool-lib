import React from "react";
import { Form, Select, Tooltip } from "antd";

// 悬浮框内有form的select情况：
// 1 select看不见下拉内容：tooltip的z-index值高达1070
// 2 解决方法是在tooltip外层包裹一个div：z-index设置小一点。并设置getPopupContainer，让其在父节点下。而非body上

const TooltipForm = (props) => {
  const { Option } = Select;
  const [formKanban] = Form.useForm();

  const toolTipAddDom = (
    <Form form={formKanban} layout="vertical" name="addKanban">
      <Form.Item
        label="请选择要添加的看板:"
        name="addToKanban"
        rules={[{ required: true, message: "请选择添加看板" }]}
      >
        <Select mode="tags" style={{ width: "100%" }}>
          <Option key="1">1</Option>
        </Select>
      </Form.Item>
    </Form>
  );

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1",
      }}
    >
      <Tooltip
        color="#FFFFFF"
        title={toolTipAddDom}
        overlayStyle={{ width: "500px" }}
        placement="bottomRight"
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        <span>悬浮有select情况</span>
      </Tooltip>
    </div>
  );
};

export default TooltipForm;
