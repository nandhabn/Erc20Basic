import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import { putFileToS3 } from "../../utils/apiServices/s3.service";
import { beforeUpload, getBase64 } from "./service";

const ImageUpload = (props: { preSignedUrl: string; imageReload: any }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // Triggers on each time the upload status updates
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{imageUrl ? "Reupload" : "Upload"}</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={async ({ file, onSuccess, onError }) =>
        putFileToS3(props.preSignedUrl, file)
          .then(onSuccess)
          .then(props.imageReload)
          .catch(onError)
      }
      onChange={handleChange}
    >
      {uploadButton}
    </Upload>
  );
};

export default ImageUpload;
