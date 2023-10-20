import React from "react";
import { BlockComponent } from "../../framework/src/BlockComponent";
import { IBlock } from "../../framework/src/IBlock";
import { Message } from "../../framework/src/Message";
import MessageEnum, { getName } from "../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../framework/src/RunEngine";
import avatarImg from "../../../assets/avatar.png";

import * as configJSON from "./config";

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
  currentPage: number;
  perPage: number;
  totalPage: number;
  scrollIntoLast: boolean;
}

interface SS {}

export default class ChatController extends BlockComponent<Props, S, SS> {
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
      currentPage: 0,
      perPage: 20,
      totalPage: 20,
      scrollIntoLast: true,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {}

  async componentDidMount() {
    this.loadMoreMessage();
    console.log("Config", configJSON.getMessagesApiCallId);
  }

  loadMoreMessage = () => {
    const { currentPage, totalPage } = this.state;
    if (currentPage < totalPage) {
      const newPage = currentPage + 1;

      const hugeMessageList: IMessage[] = [
        ...new Array(this.state.perPage),
      ].map((item, index) => ({
        id: index,
        conversationId: 2,
        date: new Date().toString(),
        text: "Message -->" + (index + 1) + " -- Page : -> " + newPage,
        documents: [],
        repliedMessage: null,
      }));

      this.setState((prev) => ({
        messageList: [...hugeMessageList, ...prev.messageList],
        currentPage: newPage,
        scrollIntoLast: newPage === 1,
      }));
    }
  };

  handleDrawerToogle = () => {
    this.setState((prev) => ({
      mobileOpen: !prev.mobileOpen,
    }));
  };

  handleSelectConversation = (conversation: IConversation) => {
    this.setState({ selectedConversation: conversation, mobileOpen: false });
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

    this.setState(
      (prev) => ({
        messageList: [...prev.messageList, newMesssage],
        repliedMessage: null,
        currentPage: 1,
        scrollIntoLast: true,
      }),
      () => {
        localStorage.setItem(
          "messages",
          JSON.stringify(this.state.messageList)
        );
      }
    );
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
    this.setState(
      (prev) => ({
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
      }),
      () => {
        localStorage.setItem(
          "messages",
          JSON.stringify(this.state.messageList)
        );
      }
    );
  };
  goNewerPage = () => {
    this.setState((prev) => ({
      currentPage: prev.currentPage > 1 ? prev.currentPage - 1 : 1,
    }));
  };
}
