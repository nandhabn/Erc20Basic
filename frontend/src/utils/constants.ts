export const endPoints = {
  contractDetails: "contract-details",
  transfer: "transfer",

  balance: (address: string) => `balance/${address}`,
};
