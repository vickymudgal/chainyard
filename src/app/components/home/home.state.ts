import { SingleBlock } from "@models";
import { ComponentState } from "@helpers";

export interface HomeState extends ComponentState{
  hash: string;
  singleBlock?: SingleBlock;
}
