import { ReactNode } from "react";
import { Box, Container } from "@material-ui/core";
import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import avatarImg from "../../assets/avatar.png";
import ChatMainContent from "../../components/src/chat/ChatMainContent.web";
import ChatInput from "../../components/src/chat/ChatInput.web";
import ConversationList from "../../components/src/chat/ConversationList.web";
import ActionModal from "../../components/src/utill/ActionModal.web";
const drawerWidth = 300;
const headerHeight = 80;
import ChatController, { Props } from "./ChatController.web";

class ChatPage extends ChatController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;

    const container =
      window !== undefined ? () => window.document.body : undefined;

    const {
      conversationList,
      messageList,
      selectedConversation,
      deleteMessage,
      deleteMessageModal,
    } = this.state;

    const currentMessages =
      messageList?.filter(
        (item) => item?.conversationId === selectedConversation?.id
      ) || [];
    return (
      <Container>
        <Box className={classes.chat_main_container}>
          <CssBaseline />
          <AppBar position="relative" className={classes.appBar}>
            <Box className={classes.app_bar_left}>
              <IconButton
                onClick={this.handleDrawerToogle}
                className={classes.menuButton}
              >
                <MenuIcon htmlColor="black" />
              </IconButton>
              <Box className={classes.app_bar_user_container}>
                <Box className={classes.app_bar_user_img_container}>
                  <img
                    className={classes.app_bar_user_img}
                    src={selectedConversation?.img}
                    alt={"User Image"}
                  />
                  <div className={classes.app_bar_user_active} />
                </Box>
                <Box className={classes.app_bar_user_details}>
                  <Typography
                    className={classes.app_bar_user_name}
                    component={"h3"}
                  >
                    {selectedConversation?.name}
                  </Typography>
                  <Typography
                    className={classes.app_bar_chat_description}
                    component="p"
                  >
                    {selectedConversation?.project}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.app_bar_right}>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            {/* @ts-ignore */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={"left"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToogle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <ConversationList
                  conversationList={conversationList}
                  selectedConversation={selectedConversation}
                  handleSelectConversation={this.handleSelectConversation}
                />
              </Drawer>
            </Hidden>
            {/* @ts-ignore */}
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: `${classes.drawerPaper}`,
                }}
                variant="permanent"
                open
              >
                <ConversationList
                  conversationList={conversationList}
                  selectedConversation={selectedConversation}
                  handleSelectConversation={this.handleSelectConversation}
                />
              </Drawer>
            </Hidden>
          </nav>
          <main className={`${classes.content} custom_scrollbar`}>
            <ChatMainContent
              messageList={currentMessages}
              handleSetRepliedMessage={this.handleSetRepliedMessage}
              handleChangeDeleteMessageModal={
                this.handleChangeDeleteMessageModal
              }
            />
          </main>
          <div className={classes.chat_input}>
            <ChatInput
              handleSendMessage={this.handleSendMessage}
              repliedMessage={this.state.repliedMessage}
              handleSetRepliedMessage={this.handleSetRepliedMessage}
            />
          </div>
        </Box>
        <ActionModal
          key="delete_message_modal"
          message={deleteMessage?.text || ""}
          title="Are you sure you want to delete this message?"
          actionHandler={this.handleDeleteMessage}
          open={deleteMessageModal}
          setOpen={(open) => this.handleChangeDeleteMessageModal(open, null)}
          actionLoading={false}
          positiveButtonText="Yes"
          negativeButtonText="No"
        />
      </Container>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    chat_main_container: {
      background: "white",
      marginTop: "30px",
      width: "100%",
      height: "80vh",
      border: "1px solid #e4e6e8",
      borderRadius: "15px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    appBar: {
      background: "transparent",
      height: `${headerHeight}px`,
      borderBottom: "1px solid #e4e6e8",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "none",
      flexDirection: "row",
      color: "black",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    chat_input: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    app_bar_left: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexDirection: "row",
    },
    app_bar_user_container: {
      marginLeft: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexDirection: "row",
    },
    app_bar_user_img_container: {
      height: "50px",
      width: "50px",
      position: "relative",
    },
    app_bar_user_img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
    app_bar_user_active: {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      position: "absolute",
      right: "0px",
      bottom: "0px",
      background: "green",
    },
    app_bar_user_details: {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
    },
    app_bar_user_name: {
      fontSize: "15px",
      fontWeight: "bolder",
    },
    app_bar_chat_description: {
      fontSize: "12px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },

    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      position: "absolute",
      background: "#F9F5FC",
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: `${drawerWidth}px`,
      },
      height: "100%",
      overflowY: "scroll",
    },
  });
export default withStyles(styles, { withTheme: true })(ChatPage);
