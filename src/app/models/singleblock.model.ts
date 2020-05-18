import { Transactions } from "./transactions.model";

export class SingleBlock {

  bits: number;
  blockIndex: number;
  fee: number;
  hash: string;
  height: number;
  mainChain: boolean;
  mrklRoot: string;
  nTx: number;
  nextBlock: [];
  nonce: number;
  prevBlock: string;
  size: number;
  time: Date;
  tx: Transactions;
  ver: number;
  weight: number;

  constructor(data: any) {

    this.bits = data.bits;
    this.blockIndex = data.block_index;
    this.fee= data.fee;
    this.hash= data.hash;
    this.height= data.height;
    this.mainChain= data.main_chain;
    this.mrklRoot= data.mrkl_root;
    this.nTx= data.n_tx;
    this.nextBlock= data.next_block;
    this.nonce= data.nonce;
    this.prevBlock= data.prev_block;
    this.size= data.size;
    this.time= data.time;
    this.tx= new Transactions(data.tx);
    this.ver= data.ver;
    this.weight= data.weight;
  }
}
  