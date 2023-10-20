import { Component } from "react";
import { IBlock } from "./IBlock";
import { runEngine } from "./RunEngine";
import { Message } from "./Message";

export class BlockComponent<Props, S, SS>
  extends Component<Props, S, SS>
  implements IBlock
{
  isLoaded = false;

  send: (message: Message) => void;

  blockId: string;

  subScribedMessages: string[];

  constructor(props: Props) {
    super(props);
    const uuidv4 = new Date().getTime().toString();
    this.blockId = uuidv4;
    this.send = (message) => runEngine.sendMessage(this.blockId, message);
    this.subScribedMessages = [""];
  }

  receive(from: string, message: Message): void {}

  async componentDidMount() {
    this.isLoaded = true;
  }

  async componentWillUnmount() {
    this.isLoaded = false;
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  }
}
