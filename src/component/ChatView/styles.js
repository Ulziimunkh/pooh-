const styles = theme => ({
  root:{
   
  },
  content: {
    height: 'calc(100vh - 238px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 320x)',
    },
    overflow: 'auto',
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    // overflowY: 'scroll'
    // paddingBottom: '20px'
  },
  

  friendSent: {
    float: 'left',
    clear: 'both',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: 'rgb(0, 153, 255);',
    color: 'white',
    borderRadius: '10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      width: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      width: '300px',
    },
  },

  userSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: 'rgb(0, 153, 255)',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  chatHeader: {
    // backgroundColor: '#344195',
    display: 'flex',
    fontSize: '18px',
    alignItems: 'center',
    // color: 'white',
    justifyContent:'left',
    flexDirection:'row',
    padding: '10px 10px 10px 20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid #e8e8e8'
  },
  textHeaderChatBoard:{
    fontWeight:"700",
    color:'#203152',
    marginLeft:'10px'
  },
  chatHeaderMore:{
    float:'right',
    position: 'absolute',
    right: '10px',
    color:'rgba(0, 0, 0, 0.54)'
  }

});

export default styles;