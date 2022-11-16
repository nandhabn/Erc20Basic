import aws from "aws-sdk";
import axios from "axios";
import { UploadRequestOption } from "rc-upload/lib/interface";

aws.config.update({
  region: "ap-south-1",
});

export const s3Instance = new aws.S3({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
});

export const SignType = {
  get: "getObject",
  put: "putObject",
};

export const getSignedS3url = async (
  key: string,
  contentType: string,
  method = SignType.get,
  bucket = process.env.REACT_APP_AWS_S3_BUCKET_NAME
) => {
  return s3Instance.getSignedUrlPromise(method, {
    Bucket: bucket,
    Key: key,
    ContentType: method === SignType.get ? undefined : contentType,
    // ContentEncoding: "base64",
  });
};

export const putFileToS3 = async (
  presignedUrl: string,
  file: UploadRequestOption["file"]
) => {
  return (await axios.put(presignedUrl, file)).data;
};
