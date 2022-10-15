export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  erc20ContractAddress: process.env.ERC20_CONTRACT_ADDRESS,
  rpcProvider: process.env.RPC_PROVIDER,
  privateKey: process.env.PRIVATEKEY,
});

export const configKeys = {
  port: 'port',
  erc20ContractAddress: 'erc20ContractAddress',
  rpcProvider: 'rpcProvider',
  privateKey: 'privateKey',
};
