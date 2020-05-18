export class LatestBlock {
  hash: string;
  time: number;
  blockIndex: number;
  height: number;
  txIndexes: number[];
  constructor(latestBlock: any) {
    this.hash = latestBlock.hash;
    this.time = latestBlock.time;
    this.blockIndex = latestBlock.block_index;
    this.height = latestBlock.height;
    this.txIndexes = latestBlock.txIndexes;
  }
}
