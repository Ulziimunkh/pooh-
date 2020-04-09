const styles = theme => ({
    root: {
      height: 'calc(100vh - 80px)',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 0px 2px black',
    },
    listItem: {
      cursor: 'pointer'
    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    }
  });
  
  export default styles;