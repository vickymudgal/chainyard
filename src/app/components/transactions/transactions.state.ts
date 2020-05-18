import {Transaction} from '@models';
import {ComponentState} from '@helpers';

export interface TransactionsState extends ComponentState {
  txHash: string;
  transaction?: Transaction;
}
