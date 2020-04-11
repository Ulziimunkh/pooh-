const styles = (theme) => ({
  root: {
    height: "calc(100vh - 80px)",
    backgroundColor: theme.palette.background.paper,
    borderRight: "1px solid #e8e8e8",
  },
  listItem: {
    cursor: "pointer",
  },
  newChatBtn: {
    borderRadius: "0px",
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px",
  },
});

export default styles;
