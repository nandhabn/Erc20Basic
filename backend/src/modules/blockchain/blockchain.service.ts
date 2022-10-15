import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigNumber, Contract, ethers } from 'ethers';

import { configKeys } from 'src/config/configuration';

import contractInterface from './erc20.abi';

@Injectable()
export class BlockchainService {
  private contractAddress;
  private contract: Contract;
  constructor(private readonly configService: ConfigService) {
    this.contractAddress = configService.get(configKeys.erc20ContractAddress);

    const RPC_URL = configService.get(configKeys.rpcProvider);

    this.contract = new Contract(
      this.contractAddress,
      contractInterface,
      new ethers.providers.JsonRpcProvider(RPC_URL),
    );
  }

  getContractAddress(): string {
    return this.contractAddress;
  }

  async getContractDetails() {
    const name = await this.contract.name();
    const symbol = await this.contract.symbol();
    const totalSupply = ethers.utils.formatEther(
      (await this.contract.totalSupply()) as BigNumber,
    );

    return {
      name,
      symbol,
      totalSupply,
      contractAddress: this.contractAddress,
    };
  }

  async getBalance(address: string) {
    const balance = await this.contract.balanceOf(address);
    return {
      rawBalance: (balance as BigNumber).toString(),
      parsed: ethers.utils.formatEther(balance),
    };
  }

  async transfer(address: string, amount: string) {
    const signedContract = this.contract.connect(
      new ethers.Wallet(
        this.configService.get(configKeys.privateKey),
        this.contract.provider,
      ),
    );

    return (await signedContract.transfer(address, amount)).wait();
  }
}
