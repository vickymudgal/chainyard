
import {APIServiceImpl, ServiceResponse} from '../api';

import {LatestBlock, SingleBlock, Transaction} from '@models';
import {BlockService} from './block.service';

export default class BlockServiceImpl extends APIServiceImpl implements BlockService {
  static readonly RESOURCE_GET_BLOCK = '/rawblock';
  static readonly RESOURCE_TRANSACTION = '/rawtx';
  static readonly RESOURCE_LATEST = '/latestblock';

  async getBlock(hash: string): Promise<ServiceResponse<SingleBlock>> {
    try {
      const response = await this.get(`${BlockServiceImpl.RESOURCE_GET_BLOCK}/${hash}?cors=true`);
      const singleBlock = new SingleBlock(response.data)
      return new ServiceResponse<SingleBlock>(singleBlock);
    } catch (e) {
      return new ServiceResponse<SingleBlock>(undefined, APIServiceImpl.parseError(e));
    }
  }

  async getTransaction(txHash: string): Promise<ServiceResponse<Transaction>> {
    try {
      const response = await this.get(`${BlockServiceImpl.RESOURCE_TRANSACTION}/${txHash}?cors=true`);
      const singleBlock = new Transaction(response.data)
      return new ServiceResponse<Transaction>(singleBlock);
    } catch (e) {
      return new ServiceResponse<Transaction>(undefined, APIServiceImpl.parseError(e));
    }
  }

  async getLatestBlock():  Promise<ServiceResponse<LatestBlock>> {
    try {
      const response = await this.get(BlockServiceImpl.RESOURCE_LATEST);
      const latestBlock = new LatestBlock(response.data);
      return new ServiceResponse<LatestBlock>(latestBlock);
    } catch (e) {
      return new ServiceResponse<LatestBlock>(undefined, APIServiceImpl.parseError(e));
    }
  }
}

