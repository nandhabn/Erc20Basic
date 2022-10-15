import { memo, useEffect, useState } from "react";
import { getCall } from "../../utils/axios/methods";
import { endPoints } from "../../utils/constants";

type ContractDetailsType = {
  name: string;
  symbol: string;
  totalSupply: string;
  contractAddress: string;
};

function ContractDetails() {
  const [contractDetails, setContractDetails] = useState<ContractDetailsType>(
    {} as ContractDetailsType
  );

  useEffect(() => {
    const apiCall = async () => {
      try {
        const response: ContractDetailsType = await getCall(
          endPoints.contractDetails
        );
        setContractDetails(response);
      } catch (err) {
        console.log(err);

        setContractDetails({
          name: "failed to load",
          symbol: "failed to load",
          totalSupply: "failed to load",
          contractAddress: "failed to load",
        });
      }
    };
    apiCall();
  }, []);

  return (
    <div className="flex align-content-center">
      <h1>Contract details</h1>
      <p>Address: {contractDetails?.contractAddress}</p>
      <p>Name: {contractDetails?.name}</p>
      <p>Symbol: {contractDetails?.symbol}</p>
      <p>
        TotalSupply: {contractDetails?.totalSupply} {contractDetails.symbol}
      </p>
    </div>
  );
}

export default memo(ContractDetails);
