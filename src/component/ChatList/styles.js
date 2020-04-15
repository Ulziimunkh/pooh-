const styles = (theme) => ({
  root: {
    height: "calc(100vh - 80px)",
    backgroundColor: theme.palette.background.paper,
    borderRight: "1px solid #e8e8e8",
  },
  listItem: {
    cursor: "pointer",
    position:'relative'
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
  statusContainer:{
    position: 'absolute',
    bottom: '19px',
    left: '45px'
  },
  status:{
    background: 'rgb(66, 183, 42)',
    borderRadius: '50%',
    border:'2px solid #fff',
    height: '14px',
    width: '14px',
  }
});

export default styles;
