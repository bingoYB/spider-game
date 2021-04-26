import { Lottery } from "lottery";

export interface ILottery {
  getLottery(): Promise<Lottery.data[]>
  analyze(data: Lottery.data[]): Lottery.analyze
  update():Promise<any>
  init(): Promise<any>
}