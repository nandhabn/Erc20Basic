import { memo, useCallback, useState } from "react";
import { Input, Form, Button, Spin } from "antd";
import { utils, BigNumber } from "ethers";
import { postCall } from "../../utils/apiServices/axios.service";
import { endPoints } from "../../utils/constants";

export const ethereumAddressRule = async (_: any, value: string) => {
  if (!utils.isAddress(value)) {
    throw new Error("Invalid Ethereum Address");
  }
};

const amountRule = async (_: any, value: string) => {
  try {
    if (!BigNumber.isBigNumber(BigNumber.from(value))) {
      throw new Error("Invalid number");
    }
  } catch {
    throw new Error("Invalid number");
  }
};

const TokenTransfer = () => {
  const [transferResponse, setTransferResponse] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (values: any) => {
    try {
      setLoading(true);
      const response = await postCall(endPoints.transfer, values);
      setTransferResponse(response);
    } catch (err) {
      setTransferResponse({ err: "failed" });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Form onFinish={onSubmit}>
      <h1>Token Transfer</h1>
      <div>
        <Form.Item
          name="userAddress"
          label="To"
          required
          rules={[{ validator: ethereumAddressRule }]}
        >
          <Input placeholder="0x" />
        </Form.Item>
        <Form.Item
          name="amount"
          required
          label="Amount"
          rules={[{ validator: amountRule }]}
        >
          <Input placeholder="1" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </div>
      <h1>Response</h1>
      {loading ? (
        <Spin />
      ) : (
        <p>
          Transaction Hash{" "}
          {!transferResponse?.err && <p>{transferResponse.transactionHash}</p>}
        </p>
      )}
    </Form>
  );
};

export default memo(TokenTransfer);
