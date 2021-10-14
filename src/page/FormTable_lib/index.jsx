import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import moment from "moment";

import TopForm from "./TopForm";
import ShowTable from "./ShowTable";
import FormModal from "./FormModal";
import TooltipForm from "./TooltipForm";

import { getFormTableData, getFormModalData } from "./service";
import styles from "./style.less";

const FormTable_lib = () => {
  // 1 state
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  const [showTableData, setShowTableData] = useState([]);
  const [headFormVal, setHeadFormVal] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  // 2 server
  // table数据
  const getFormTableDataFun = async (paramVal) => {
    const data = await getFormTableData(paramVal);
    setShowTableData(data);
  };
  // modal数据
  const getFormModalDataFun = async (paramVal) => {
    const data = await getFormModalData(paramVal);
    setModalData(data);
  };

  // 3 event
  // 头部提交
  const handleSubmit = (val) => {
    const params = {
      month: val.executeTime.format("YYYYMM"), // yyyyMM
      pageNo: 1,
      pageSize: 10,
    };
    setHeadFormVal(params);
    getFormTableDataFun(params);
  };

  // 弹框部分
  const handleModalOk = () => {
    formModal.validateFields().then((formVal) => {
      console.log("modal表单数据", formVal);
      setIsModalVisible(false);
    });
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  // 传给topForm的打开modal
  const handleButtonOpenModal = () => {
    setIsModalVisible(true);
    getFormModalDataFun();
  };

  // 4 useEffect
  useEffect(() => {
    const params = {
      month: moment().format("YYYY-MM"),
      pageNo: 1,
      pageSize: 10,
    };
    setHeadFormVal(params);
    getFormTableDataFun(params);
  }, []);

  return (
    <div className={styles.formTable_lib}>
      <div className={styles.title}>
        <p>完整的一个form，table，modal页面。</p>
      </div>

      <TopForm
        form={form}
        handleSubmit={handleSubmit}
        handleButtonOpenModal={handleButtonOpenModal}
      />
      <ShowTable
        showTableData={showTableData}
        headFormVal={headFormVal}
        getFormTableDataFun={getFormTableDataFun}
      />
      <Modal
        title="弹出框"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width="600px"
        // Modal表单销毁则表单清空
        destroyOnClose={true}
      >
        <FormModal formModal={formModal} modalData={modalData} />
      </Modal>

      <div>
        <p>一个悬浮小组件：</p>
        <TooltipForm />
      </div>
    </div>
  );
};

export default FormTable_lib;
