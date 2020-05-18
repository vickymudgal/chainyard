import {ServiceResponse} from "../api";
import {LatestBlock, SingleBlock, Transaction} from "@models";

export interface BlockService {
  getBlock: (hash: string) => Promise<ServiceResponse<SingleBlock>>;
  getTransaction: (txHash: string) => Promise<ServiceResponse<Transaction>>;
  getLatestBlock: () => Promise<ServiceResponse<LatestBlock>>;
}
