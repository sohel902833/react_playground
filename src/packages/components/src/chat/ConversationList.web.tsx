import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { IconButton, InputAdornment, Box, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { IConversation } from "../../../blocks/chat/ChatController.web";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    conversation_section: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    conversation_search: {
      minHeight: "80px",
      borderBottom: "1px solid #e4e6e8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchInputContainer: {
      background: "white",
      borderRadius: "20px",
      paddingLeft: "10px",
      paddingRight: "10px",
      border: "1px solid #e4e6e8",
    },
    search__button: {
      background: "#E6A100",
      color: "white",
      height: "40px",
      width: "40px",
      "&:hover": {
        background: "#E6A100",
      },
    },
    conversation_list_container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      overflowY: "scroll",
      flexGrow: 1,
    },
    conversation_item_container: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "15px 15px",
      cursor: "pointer",
      transition: ".5s",
      gap: "10px",
      "&:hover": {
        background: "white",
      },

      borderBottom: "1px solid #e4e6e8",
    },
    conversation_item_user_img_container: {
      height: "50px",
      width: "50px",
      position: "relative",
    },
    conversation_item_user_img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
    conversation_item_user_active: {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      position: "absolute",
      right: "0px",
      bottom: "0px",
      background: "green",
    },
    conversation_item_user_details: {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
    },
    conversation_item_user_name: {
      fontSize: "13px",
      fontWeight: "bolder",
    },
    conversation_item_chat_description: {
      fontSize: "11px",
    },
    conversation_active_item: {
      background: "white",
    },
  })
);
interface Props {
  selectedConversation: IConversation | null;
  conversationList: IConversation[];
  handleSelectConversation: (conv: IConversation) => void;
}

const ConversationList: React.FC<Props> = ({
  selectedConversation,
  conversationList,
  handleSelectConversation,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.conversation_section}>
      <div className={classes.conversation_search}>
        <div style={{ width: "80%" }}>
          <InputBase
            className={classes.searchInputContainer}
            placeholder="Search freelancer, chats"
            endAdornment={
              <InputAdornment position="end">
                <IconButton className={classes.search__button}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
      </div>
      <div
        className={`${classes.conversation_list_container} custom_scrollbar`}
      >
        {conversationList.map((item, index) => (
          <div
            onClick={() => handleSelectConversation(item)}
            className={`${classes.conversation_item_container} ${
              item?.id === selectedConversation?.id &&
              classes.conversation_active_item
            }`}
          >
            <Box className={classes.conversation_item_user_img_container}>
              <img
                className={classes.conversation_item_user_img}
                src={item?.img}
                alt={"User Image"}
              />
              <div className={classes.conversation_item_user_active} />
            </Box>
            <Box className={classes.conversation_item_user_details}>
              <Typography
                className={classes.conversation_item_user_name}
                component={"h3"}
              >
                {item?.name}
              </Typography>
              <Typography
                className={classes.conversation_item_chat_description}
                component="p"
              >
                {item?.project}
              </Typography>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
