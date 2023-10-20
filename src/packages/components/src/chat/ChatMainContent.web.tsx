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
  per_page: number;
  current_page: number;
  totalPage: number;
  handleSetRepliedMessage: (msg: IMessage | null) => void;
  handleChangeDeleteMessageModal: (open: boolean, msg: IMessage | null) => void;
  onLoadMore: () => void;
  goNewerPage: () => void;
  scrollIntoLast?: boolean;
}

const ChatMainContent: React.FC<Props> = ({
  messageList,
  handleSetRepliedMessage,
  handleChangeDeleteMessageModal,
  per_page,
  current_page,
  onLoadMore,
  scrollIntoLast = true,
  goNewerPage,
  totalPage,
}) => {
  const lastMessageRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (scrollIntoLast) {
      lastMessageRef?.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messageList, scrollIntoLast]);

  const classes = useStyles();

  const paginationInfo = useMemo(() => {
    const sliceStartIn = messageList.length - current_page * per_page;
    const sliceEndIn = messageList.length - (current_page - 1) * per_page;

    return {
      sliceStart: sliceStartIn < 0 ? 0 : sliceStartIn,
      sliceEnd: sliceEndIn < 0 ? 0 : sliceEndIn,
    };
  }, [current_page, per_page, messageList]);

  const enableLoadMore = current_page < totalPage;
  return (
    <div className={classes.chat_message_body}>
      {enableLoadMore && (
        <Button onClick={onLoadMore} size="small">
          Load More
        </Button>
      )}

      {messageList
        .slice(paginationInfo.sliceStart, paginationInfo.sliceEnd)
        .map((item, index) => {
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
      {current_page > 1 && (
        <Button onClick={goNewerPage} size="small">
          Show Newer
        </Button>
      )}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default ChatMainContent;
