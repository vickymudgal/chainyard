export class Transaction {
  balance: number;
  blockHeight: number;
  blockIndex: number;
  doubleSpend: boolean;
  fee: number;
  hash: string;
  inputs: [];
  lockTime: number;
  out: [];
  relayedBy: string;
  result: number;
  size: number;
  time: number;
  txIndex: number;
  ver: number;
  vinSz: number;
  voutSz: number
  weight: number;
  
  constructor(transaction: any) {
    this.balance= transaction.balance;
    this.blockHeight= transaction.block_height;
    this.blockIndex= transaction.block_index;
    this.doubleSpend= transaction.double_spend;
    this.fee= transaction.fee;
    this.hash= transaction.hash;
    this.inputs= transaction.inputs;
    this.lockTime= transaction.lock_time;
    this.out= transaction.out;
    this.relayedBy= transaction.relayed_by;
    this.result= transaction.result;
    this.size= transaction.size;
    this.time= transaction.time;
    this.txIndex= transaction.tx_index;
    this.ver= transaction.ver;
    this.vinSz= transaction.vin_sz;
    this.voutSz= transaction.vout_sz
    this.weight= transaction.weight;
  }
}
