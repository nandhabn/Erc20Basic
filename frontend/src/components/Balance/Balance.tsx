import { memo, useCallback, useState } from "react";
import { Input, Form, Button, Spin } from "antd";
import { getCall } from "../../utils/axios/methods";
import { endPoints } from "../../utils/constants";
import { ethereumAddressRule } from "../TokenTransfer/TokenTransfer";

type BalanceType =
  | {
      status: "success";
      rawBalance: string;
      parsed: string;
    }
  | {
      status: "error";
      err: string;
    };

function Balance() {
  const [balance, setBalance] = useState<BalanceType>({} as BalanceType);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (values: any) => {
    try {
      setLoading(true);
      const response: BalanceType = await getCall(
        endPoints.balance(values.userAddress)
      );
      setBalance(response);
    } catch (err) {
      setBalance({ status: "error", err: "failed" });
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get Balance
          </Button>
        </Form.Item>
      </div>
      <h1>Response</h1>
      {loading ? (
        <Spin />
      ) : balance.status !== "error" ? (
        <p>Balance {<p>{balance.parsed}</p>}</p>
      ) : (
        <p>error {balance.err}</p>
      )}
    </Form>
  );
}

export default memo(Balance);
