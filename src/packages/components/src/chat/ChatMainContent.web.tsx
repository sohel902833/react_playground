import React, { useMemo, useRef } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { IMessage } from "../../../blocks/chat/ChatController.web";
import MessageItem from "./MessageItem.web";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat_message_body: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "200px",
    },
  })
);

interface Props {
  messageList: IMessage[];
  handleSetRepliedMessage: (msg: IMessage | null) => void;
  handleChangeDeleteMessageModal: (open: boolean, msg: IMessage | null) => void;
}

const ChatMainContent: React.FC<Props> = ({
  messageList,
  handleSetRepliedMessage,
  handleChangeDeleteMessageModal,
}) => {
  const lastMessageRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [messageList]);

  const classes = useStyles();

  return (
    <div className={classes.chat_message_body}>
      {messageList.map((item, index) => {
        const myChat = index % 2 === 0;
        return (
          <MessageItem
            key={item.id}
            message={item}
            myChat={myChat}
            handleSetRepliedMessage={handleSetRepliedMessage}
            onDelete={(msg) => handleChangeDeleteMessageModal(true, msg)}
          />
        );
      })}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default ChatMainContent;
