import React from "react";
import "antd/dist/antd.css";
import "bootstrap";
import "./App.css";
import ContractDetails from "./components/ContractDetails/ContractDetails";
import TokenTransfer from "./components/TokenTransfer/TokenTransfer";
import Balance from "./components/Balance/Balance";

function App() {
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
        </div>
        <div className="col-4" />
      </div>
    </div>
  );
}

export default App;
