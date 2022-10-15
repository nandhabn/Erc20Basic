import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlockchainService } from './modules/blockchain/blockchain.service';

@Controller()
export class AppController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('contract-address')
  contractAddress() {
    return this.blockchainService.getContractAddress();
  }

  @Get('contract-details')
  contractDetails() {
    return this.blockchainService.getContractDetails();
  }

  @Get('balance/:userAddress')
  getBalanceOf(@Param('userAddress') userAddress: string) {
    return this.blockchainService.getBalance(userAddress);
  }

  @Post('transfer')
  @UsePipes(new ValidationPipe())
  transferTo(
    @Body('userAddress') userAddress: string,
    @Body('amount') amount: string,
  ) {
    return this.blockchainService.transfer(userAddress, amount);
  }
}
