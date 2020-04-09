const styles = theme => ({

  sendBtn: {
    color: 'blue',
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },
  viewBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    borderTop: '1px solid #e8e8e8'
},
icOpenGallery: {
  width: '30px',
  height: '30px',
  marginLeft: '10px'
},
viewInputGallery: {
  opacity: '0',
  position: 'absolute',
  zIndex: '-1',
  left: '10px',
  width: '30px'
},
icOpenSticker: {
  width: '30px',
  height: '30px',
  marginLeft: '5px',
  marginRight: '5px'
},
icSend: {
  width: '30px',
  height: '30px',
  marginLeft: '5px',
  marginRight: '5px'
},
  chatTextBoxContainer: {
    boxSizing: 'border-box',
    overflow: 'auto',
    width:'100%',
    boxShadow: '2px 0px 0px black'
    // width: 'calc(100% - 300px - 50px)'
  },

  chatTextBox: {
    width: 'calc(100% - 25px)'
  }

});

export default styles;