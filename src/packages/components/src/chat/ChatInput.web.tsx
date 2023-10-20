import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import InputBase from "@material-ui/core/InputBase";
import AttachmentIcon from "@material-ui/icons/Attachment";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import EmojiPicker from "emoji-picker-react";
import CloseIcon from "@material-ui/icons/Close";
import { IMessage } from "../../../blocks/chat/ChatController.web";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat_input_container: {
      width: "95%",
      margin: "0 auto",
      marginBottom: "10px",
      borderRadius: "20px",
      border: "1px solid #e4e6e8",
      display: "flex",
      alignItems: "center",
      padding: "7px",
      position: "relative",
    },
    chat_input_box: {},
    attachment_container: {
      display: "flex",
      alignItems: "center",
    },
    send_button: {
      background: "#E6A100",
      color: "white",
      transform: "rotate(-45deg)",
    },
    emoji_picker_container: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      right: "10px",
      bottom: "80px",
      background: "white",
      border: "1px solid #e4e6e8",
      borderRadius: "10px",
    },

    attachment__input: {
      color: "rgba(0, 0, 0, 0.54)",
      padding: "12px",
      fontSize: "1.5rem",
      textAlign: "center",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderRadius: "50%",
      cursor: "pointer",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "rotate(-45deg)",
      marginBottom: "0px",
      "&:hover": {
        background: "#fafafa",
      },
    },
    emoji_picker_header: {
      display: "flex",
      marginTop: "10px",
      marginBottom: "10px",
      justifyContent: "flex-end",
    },
    file_container: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "10px",
      marginLeft: "10px",
      marginRight: "10px",
    },
    file_item_container: {
      border: "1px solid #e4e6e8",
      padding: "7px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      height: "80px",
      position: "relative",
    },
    file_item_left: {
      width: "80px",
      height: "100%",
    },
    file_item_right: {
      marginRight: "10px",
    },
    file_close_button: {
      position: "absolute",
      top: "0px",
      right: "0px",
      cursor: "pointer",
      background: "#fafafa",
      padding: "7px",
    },
    img_file: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    replied_container: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      right: "10px",
      left: "10px",
      top: "-80px",
      background: "white",
      border: "1px solid #e4e6e8",
      borderRadius: "10px",
      height: "80px",
    },
    replied_text_container: {
      padding: "10px 30px",
      height: "70px",
    },
  })
);
interface Props {
  handleSendMessage: (msg: string, documents: any[]) => void;
  repliedMessage: IMessage | null;
  handleSetRepliedMessage: (msg: IMessage | null) => void;
}
const ChatInput: React.FC<Props> = ({
  handleSendMessage,
  repliedMessage,
  handleSetRepliedMessage,
}) => {
  const classes = useStyles();
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChangeEmojiPicker = () => {
    setOpenEmojiPicker((prev) => !prev);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const selectedFilesInArray = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...selectedFilesInArray]);
    }
  };
  const handleFileClose = (name: string) => {
    const filteredFiles = files.filter((item) => item?.name !== name) || [];
    setFiles(filteredFiles);
  };
  const handleBoldClick = () => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      const startPos = inputElement.selectionStart || 0;
      const endPos = inputElement.selectionEnd || message.length;

      const beforeSelection = message.slice(0, startPos);
      const selectedText = message.slice(startPos, endPos);
      const afterSelection = message.slice(endPos);
      setMessage(beforeSelection + `<b>${selectedText}</b>` + afterSelection);
    }
  };

  const sendNewMessage = () => {
    if (!message) {
      return;
    }
    handleSendMessage(message, files);
  };

  return (
    <>
      <div className={classes.chat_input_container}>
        <InputBase
          ref={inputRef}
          className={classes.chat_input_box}
          multiline
          maxRows={2}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className={classes.attachment_container}>
          <IconButton>
            <FormatItalicIcon />
          </IconButton>
          <IconButton onClick={handleBoldClick}>
            <FormatBoldIcon />
          </IconButton>
          <label
            className={classes.attachment__input}
            htmlFor="chat_attchment_input"
          >
            <AttachmentIcon />
            <input
              onChange={handleFileChange}
              type="file"
              id="chat_attchment_input"
              style={{ visibility: "hidden", height: "0px", width: "0px" }}
              multiple
            />
          </label>
          <IconButton onClick={handleChangeEmojiPicker}>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton onClick={sendNewMessage} className={classes.send_button}>
            <SendIcon />
          </IconButton>
        </div>
        {openEmojiPicker && (
          <div className={classes.emoji_picker_container}>
            <div className={classes.emoji_picker_header}>
              <IconButton onClick={handleChangeEmojiPicker}>
                <CloseIcon />
              </IconButton>
            </div>
            <EmojiPicker
              onEmojiClick={(e: any) => {
                console.log("Emoji", e);
                setMessage((msg) => msg + e?.emoji);
              }}
            />
          </div>
        )}
        {repliedMessage && (
          <div className={classes.replied_container}>
            <div
              onClick={() => handleSetRepliedMessage(null)}
              className={classes.file_close_button}
            >
              <CloseIcon />
            </div>
            <Typography
              noWrap={false}
              className={classes.replied_text_container}
            >
              {repliedMessage?.text}
            </Typography>
          </div>
        )}
      </div>
      <div className={classes.file_container}>
        {files?.length > 0 &&
          files.map((item) => {
            const isImageFile = item?.type?.includes("image");
            return (
              <div className={classes.file_item_container}>
                <div className={classes.file_item_left}>
                  {isImageFile ? (
                    <img
                      className={classes.img_file}
                      src={URL.createObjectURL(item)}
                      alt="img"
                    />
                  ) : null}
                </div>
                <div className={classes.file_item_right}>
                  <Typography style={{ fontSize: "12px" }}>
                    {item?.name}
                  </Typography>
                  <Typography style={{ fontSize: "10px" }}>
                    {(item?.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </div>

                <div
                  onClick={() => handleFileClose(item?.name)}
                  className={classes.file_close_button}
                >
                  <CloseIcon />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatInput;
