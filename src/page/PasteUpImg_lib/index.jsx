/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { postPasteUpImg } from "./service";

function getBase64(img, callback) {
  const reader = new FileReader();
  // console.log("reader", reader);
  // readAsDataURL 读取给定的File/Blob文件。返回一个result属性给reader。此为base64表示的二进制内容
  reader.readAsDataURL(img);
  reader.addEventListener("load", () => callback(reader.result));
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const PasteUpImg_lib = () => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const postPasteUpImgFun = async (paramVal) => {
    const data = await postPasteUpImg(paramVal);
    console.log("postPasteUpImgFun", data);
    // 这是方法一：等后端生成资源URL
    // setImageUrl(data.url)
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const handlePaste = (e) => {
    let items = e.clipboardData.items;
    // 这是一个类数组对象！可以用for...of 遍历是因为其内部实现了可迭代协议
    for (let item of items) {
      // 这一步很重要，因为直接把item打印出来是看不到具体内容的（如上图），需要遍历它
      if (item.kind === "file") {
        // 取得文件对象，一切好办
        var pasteFile = item.getAsFile();
        console.log("pasteFile", pasteFile);

        // 以前端的方式进行展示: 这是方法二：
        getBase64(pasteFile, (imageUrl) => {
          setImageUrl(imageUrl);
        });

        // formData格式
        let formData = new FormData();
        formData.append("file", pasteFile);
        // 上传文件 ： 注意参数的格式。不能写成对象格式。最终为body:formData 具体查看request。
        const param = formData;
        postPasteUpImgFun(param);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
  }, []);

  return (
    <div>
      <h1> </h1>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:3000/api/pasteUpImg.json"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default PasteUpImg_lib;
