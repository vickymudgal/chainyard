import {LatestBlock} from '@models';
import {ComponentState} from '@helpers';

export interface LatestState extends ComponentState {
  hash: string;
  block?: LatestBlock;
}
