import React, { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "bootstrap";
import "./App.css";
import ContractDetails from "./components/ContractDetails/ContractDetails";
import TokenTransfer from "./components/TokenTransfer/TokenTransfer";
import Balance from "./components/Balance/Balance";
import ImageUpload from "./components/ImageUpload/imageUpload";
import { getSignedS3url, SignType } from "./utils/axios/s3.service";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageViewUrl, setImageViewUrl] = useState("");

  const imageReload = useCallback(() => {
    getSignedS3url("file/image.jpeg", "image/jpeg", SignType.get).then(
      (res) => {
        setImageViewUrl(res);
      }
    );
  }, []);

  useEffect(() => {
    getSignedS3url("file/image.jpeg", "image/jpeg", SignType.put).then(
      (res) => {
        setImageUrl(res);
      }
    );

    imageReload();
  }, [imageReload]);

  return (
    <div className="App">
      <div className="row h-100 flex align-content-center">
        <div className="col-3" />
        <div className="col-3">
          <ContractDetails />
        </div>
        <div className="col-3">
          <TokenTransfer />
        </div>
        <div className="col-3" />
      </div>
      <div className="row h-100 flex align-content-center">
        <div className="col-4" />
        <div className="col-4">
          <Balance />
          <ImageUpload preSignedUrl={imageUrl} imageReload={imageReload} />
          <img className="w-100" src={imageViewUrl} alt="nftimage" />
        </div>
        <div className="col-4" />
      </div>
    </div>
  );
}

export default App;
