/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import Icon from "@ant-design/icons";
import moment from "moment";

const UpFile_lib = () => {
  const [intellectFileList, setIntellectFileList] = useState([]);

  // 算法文件
  const propsIntellectUpload = {
    name: "file",
    action: "/liquidity/monthlyPlan/uploadIntellectFile.json",
    accept: ".xls,.xlsx,.csv",
    data: {
      month: moment().format("YYYYMM"),
    },
    beforeUpload(file, fileList) {
      // console.log('monthDate', monthDate);
    },
    showUploadList: {
      showRemoveIcon: false,
    },
    onPreview(info) {
      // 点击上传的文件可以进行下载
      window.location.href = info.url;
    },
    onChange(info) {
      if (info.file.status === "removed") {
        message.success(`${info.file.name} file removed successfully`);
      }
      if (info.file.status === "done") {
        if (info.file.response) {
          if (info.file.response.success === true) {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.response.success === false) {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
      }
      // 关键点：change时候：fileList的文件状态一直是uploading。需要内部进行set
      setIntellectFileList([...info.fileList]);
    },
  };

  return (
    <div>
      <Upload {...propsIntellectUpload} fileList={intellectFileList}>
        <Button>
          <Icon type="upload" /> 上传文件
        </Button>
      </Upload>
    </div>
  );
};

export default UpFile_lib;
