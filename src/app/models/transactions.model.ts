import { Transaction } from "@models";
import _ = require("lodash");

export class Transactions {
  transactions: Transaction[] = [];
  
  constructor(transaction: any) {
    this.transactions = [];
    _.forEach(transaction, (item): void => {
      this.transactions.push(new Transaction(item));
    });
  }
}
