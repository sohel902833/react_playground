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
import ChatMainContent from "../../components/chat/ChatMainContent.web";
import ChatInput from "../../components/chat/ChatInput.web";
import ConversationList from "../../components/chat/ConversationList.web";
import ActionModal from "../../components/utill/ActionModal.web";
const drawerWidth = 300;
const headerHeight = 80;

interface Props {
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

interface State {
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

class ChatPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const messages = localStorage.getItem("messages");
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
  }
  componentDidMount(): void {
    this.loadMoreMessage();
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

    console.log({ scroll: this.state.scrollIntoLast });
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
              current_page={this.state.currentPage}
              totalPage={this.state.totalPage}
              per_page={this.state.perPage}
              onLoadMore={this.loadMoreMessage}
              scrollIntoLast={this.state.scrollIntoLast}
              goNewerPage={this.goNewerPage}
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
