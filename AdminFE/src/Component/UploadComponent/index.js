import React from "react";
import { useState } from "react";
import { Button, message, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
export default function UploadComponent(props) {
  //   const [previewVisible, setPreviewVisible] = useState(false);
  //   const [previewImage, setPreviewImage] = useState();
  //   const handleCancel = () => setPreviewVisible(false);
  //   const handlePreview = (file) => {
  //     setPreviewImage(file.thumbUrl);
  //     setPreviewVisible(true);
  //   };

  return (
    <div>
      <Upload listType="picture" {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </div>
  );
}
