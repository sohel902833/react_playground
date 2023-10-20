import React from "react";
import { BlockComponent } from "../../framework/src/BlockComponent";
import { IBlock } from "../../framework/src/IBlock";
import { Message } from "../../framework/src/Message";
import MessageEnum, { getName } from "../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../framework/src/RunEngine";
import avatarImg from "../../../assets/avatar.png";
import CreateRestApiMessage from "../../components/src/CreateRestApiMessage.web";
import * as configJSON from "./config";
import { TOKEN } from "../../../lib/helper";

export interface Props {
  classes?: any;
}
export interface IConversation {
  id: number;
  img: any;
  name: string;
  project: string;
}
export interface IMessage {
  id: number;
  text: string;
  conversationId: number;
  date: string;
  documents?: any[];
  deleted?: boolean;
  repliedMessage?: IMessage | null;
}

const conversationList: IConversation[] = [...new Array(30)].map(
  (item, index) => ({
    id: index + 1,
    img: avatarImg,
    name: "User " + index + 1,
    project: "Proj " + index + 1,
  })
);

interface S {
  mobileOpen: boolean;
  conversationList: IConversation[];
  messageList: IMessage[];
  selectedConversation: IConversation | null;
  repliedMessage: IMessage | null;
  deleteMessage: IMessage | null;
  deleteMessageModal: boolean;
}

interface SS {}

export default class ChatController extends BlockComponent<Props, S, SS> {
  getCountryListApiCallId: string = "";
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      mobileOpen: false,
      conversationList: conversationList,
      // messageList: messages ? JSON.parse(messages) : [],
      messageList: [],
      selectedConversation: null,
      repliedMessage: null,
      deleteMessage: null,
      deleteMessageModal: false,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }
  async receive(from: string, message: Message) {
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId === this.getCountryListApiCallId) {
        console.log("REs", responseJson);
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // this.loadMoreMessage();
    this.getCountryList();
  }

  getHeader = () => {
    const header = {
      token: TOKEN,
    };
    return header;
  };
  getCountryList = () => {
    const requestMessage = CreateRestApiMessage({
      header: this.getHeader(),
      apiUrl: "bx_block_profile/profiles/country_list",
      method: "GET",
      body: null,
    });

    this.getCountryListApiCallId = requestMessage.messageId;
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleDrawerToogle = () => {
    this.setState((prev) => ({
      mobileOpen: !prev.mobileOpen,
    }));
  };

  handleSelectConversation = (conversation: IConversation) => {
    this.setState({ selectedConversation: conversation, mobileOpen: false });
    this.getCountryList();
  };
  handleSendMessage = (message: string, documents: any[]) => {
    const { selectedConversation } = this.state;
    if (!selectedConversation) {
      return;
    }

    const newMesssage: IMessage = {
      id: new Date().getTime(),
      conversationId: selectedConversation.id,
      date: new Date().toString(),
      text: message,
      documents: documents,
      repliedMessage: this.state.repliedMessage,
    };

    this.setState((prev) => ({
      messageList: [...prev.messageList, newMesssage],
      repliedMessage: null,
    }));
  };

  handleSetRepliedMessage = (msg: IMessage | null) => {
    console.log("MSG", msg);
    this.setState({
      repliedMessage: msg,
    });
  };
  handleChangeDeleteMessageModal = (
    open: boolean,
    message: IMessage | null
  ) => {
    this.setState({
      deleteMessage: message,
      deleteMessageModal: open,
    });
  };

  handleDeleteMessage = () => {
    this.setState((prev) => ({
      messageList: prev.messageList.map((msgItem) => {
        if (msgItem.id === prev?.deleteMessage?.id) {
          return {
            ...msgItem,
            deleted: true,
            text: "",
            documents: [],
          };
        }
        return msgItem;
      }),
      deleteMessage: null,
      deleteMessageModal: false,
    }));
  };
}
