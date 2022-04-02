import React, { useEffect } from "react";
import { Form, DatePicker, Button, Input, TimePicker } from "antd";
import moment from "moment";
import { nonNegativeValidator } from "@src/util/formValidate";

// moment(momentObj).format("YYYY-MM-DD HH:mm:ss")： 转为字符串
// moment(momentObj).valueOf()： 转为时间戳
// moment("val", 'YYYY-MM') : 字符串转为moment对象

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

  // 日期限制区间: .endOf("day") 锁定日期     .endOf("months") 锁定月份
  const disabledDateVal = (current) =>
    current < moment().subtract(0, "months").endOf("day") ||
    current > moment().add(1, "months").endOf("months");

  useEffect(() => {
    // 1 对于area中，对后端数据字符串中的\n进行替换。才能回显出换行效果。
    // const remindDescVal = data.remindDesc.replace(/\\n/gm, "<br/>");

    // 2 若设置的对象key为变量。则需要加上[]包裹转为string类型。
    const flag = "flagVal";

    form.setFieldsValue({
      // 由于Input 输入都是 String 类型。所以回显的时候，必须将其转为String类型。而不能是其他类型
      executeTime: moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD"),

      [`${flag}time`]: 1,
      // 一定注意时间转换使用HH:mm:ss  。 大写就出错了
      "time-Picker": moment(moment().format("HH:mm:ss"), "HH:mm:ss"),

      // areaInput: remindDescVal,
    });
  }, [form]);

  return (
    <div>
      <Form form={form}>
        <Form.Item name="executeTime" label="执行月份">
          <DatePicker
            style={{ width: "220px" }}
            disabledDate={disabledDateVal}
          />
        </Form.Item>

        <Form.Item name="time-Picker" label="选择时间">
          <TimePicker style={{ width: "220px" }} />
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
