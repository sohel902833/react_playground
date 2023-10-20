import React, { useRef } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import ChatMessageAction from "./ChatMessageAction.web";
import { IMessage } from "../../../blocks/chat/ChatController.web";
import GetAppIcon from "@material-ui/icons/GetApp";
import avatarImg from "../../../../assets/avatar.png";
import moment from "moment";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat_message_item: {
      display: "flex",
      maxWidth: "70%",
      alignItems: "center",
      gap: "10px",
      position: "relative",
    },
    other_message: {
      alignSelf: "start",
      "& .chat_message_content": {
        textAlign: "left",
        background: "#F6F8F7",
        marginRight: "15px",
        padding: "20px",
        position: "relative",
        borderRadius: "10px",
        border: "1px solid #F1F1F1",
        marginLeft: "10px",
      },
    },
    my_message: {
      alignSelf: "end",
      flexDirection: "row-reverse",
      "& .chat_message_content": {
        textAlign: "right",
        background: "#FDFAF3",
        marginRight: "15px",
        padding: "20px",
        position: "relative",
        borderRadius: "10px",
        border: "1px solid #F8F3E9",
        "& .ripple": {
          position: "absolute",
          right: "-10px",
          top: "0px",
          height: "22px",
          width: "20px",
          //   background: "#FDFAF3",
          background: "red",
          borderBottomRightRadius: "200px",
        },
      },
    },
    my_reply_message: {
      alignSelf: "end",
      padding: "10px",
      borderRaidus: "10px",
      maxWidth: "70%",
      background: "#f9f9fa",
      marginRight: "20px",
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
      cursor: "pointer",
    },
    other_reply_message: {
      alignSelf: "start",
      padding: "10px",
      borderRaidus: "10px",
      maxWidth: "70%",
      background: "#f9f9fa",
      marginLeft: "20px",
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
      cursor: "pointer",
    },
    chat_message_option: {},
    chat_content_area: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    chat_docs_container: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    chat_doc_image_container: {
      height: "400px",
      maxWidth: "400px",
      borderRadius: "10px",
      padding: "10px",
      position: "relative",
      background: "white",
    },
    chat_doc_image_download: {
      position: "absolute",
      right: "10px",
      top: "10px",
      zIndex: 100,
    },
    chat_doc_img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "10px",
    },
    chat_doc_file: {
      width: "100%",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "white",
      borderRadius: "10px",
    },
    chat_doc_file_left: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    chat_doc_file_right: {},
  })
);

interface Props {
  message: IMessage;
  handleSetRepliedMessage: (msg: IMessage | null) => void;
  myChat: boolean;
  onDelete: (msg: IMessage | null) => void;
}
const MessageItem: React.FC<Props> = ({
  message,
  handleSetRepliedMessage,
  myChat,
  onDelete,
}) => {
  const classes = useStyles();

  const handleScrollToMessage = (messageId: number) => {
    const msgItem = document.getElementById(`message_item_${messageId}`);

    if (msgItem) {
      msgItem.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <div
      id={`message_item_${message.id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "30px",
      }}
    >
      {message?.repliedMessage && (
        <div
          onClick={() =>
            handleScrollToMessage(message?.repliedMessage?.id as number)
          }
          className={`${
            myChat ? classes.my_reply_message : classes.other_reply_message
          }`}
        >
          <Typography
            style={{
              wordBreak: "break-all",
            }}
            dangerouslySetInnerHTML={{
              __html: message?.repliedMessage?.text || "",
            }}
          ></Typography>
        </div>
      )}

      <div
        // ref={messageList?.length - 1 === index ? lastMessageRef : undefined}
        className={`${classes.chat_message_item} ${
          myChat ? classes.my_message : classes.other_message
        }`}
      >
        <div className={`${classes.chat_content_area} chat_message_content`}>
          {/* <div className="ripple" /> */}
          <Typography
            style={{
              wordBreak: "break-all",
            }}
            dangerouslySetInnerHTML={{ __html: message?.text }}
          ></Typography>
          {message?.deleted && (
            <span style={{ color: "red" }}>Message Deleted</span>
          )}
          <div className={classes.chat_docs_container}>
            {message?.documents?.map((docItem) => {
              const isImageFile = docItem?.type?.includes("image");

              if (isImageFile) {
                return (
                  <div className={classes.chat_doc_image_container}>
                    <div className={classes.chat_doc_image_download}>
                      <IconButton>
                        <GetAppIcon />
                      </IconButton>
                    </div>
                    <img
                      className={classes.chat_doc_img}
                      src={URL.createObjectURL(docItem)}
                      alt="messageImage"
                    />
                  </div>
                );
              }

              return (
                <div className={classes.chat_doc_file}>
                  <div className={classes.chat_doc_file_left}>
                    <img
                      style={{
                        height: "100%",
                        width: "80px",
                        borderRadius: "10px",
                      }}
                      src={avatarImg}
                      alt="asd"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography style={{ fontSize: "12px" }}>
                        {docItem?.name}
                      </Typography>
                      <Typography style={{ fontSize: "10px" }}>
                        {(docItem?.size / (1024 * 1024)).toFixed(2)} MB
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.chat_doc_file_right}>
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>

          <Typography>{moment(message?.date).fromNow()}</Typography>
        </div>
        <div>
          <ChatMessageAction
            myMessage={myChat}
            onReply={() => handleSetRepliedMessage(message)}
            onDelete={() => onDelete(message)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
