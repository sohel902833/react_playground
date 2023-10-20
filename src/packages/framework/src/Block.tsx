import { IBlock } from "./IBlock";
import { runEngine } from "./RunEngine";
import { Message } from "./Message";

export class Block implements IBlock {
  send: (message: Message) => void;

  blockId: string;

  constructor() {
    const uuidv4 = new Date().getTime().toString();
    const random = Math.floor(Math.random() * 1000);

    this.blockId = uuidv4 + random;
    this.send = (message) => runEngine.sendMessage(this.blockId, message);
  }
  receive(from: string, message: Message): void {}
}
