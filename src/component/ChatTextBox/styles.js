const styles = (theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  /* Stickers */
  viewStickers: {
    display: "flex",
    borderTop: "1px solid #e8e8e8",
    height: "60px",
    alignItems: "center",
    justifyContent: "space-around",
    overflowX: "auto",
    width: "inherit",
  },
  imgSticker: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
  viewBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    borderTop: "1px solid #e8e8e8",
  },
  icOpenGallery: {
    width: "30px",
    height: "30px",
    marginLeft: "10px",
  },
  viewInputGallery: {
    opacity: "0",
    position: "absolute",
    zIndex: "-1",
    left: "10px",
    width: "30px",
  },
  icOpenSticker: {
    width: "30px",
    height: "30px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  icSend: {
    width: "30px",
    height: "30px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  chatTextBoxContainer: {
    boxSizing: "border-box",
    overflow: "auto",
    width: "100%",
    boxShadow: "2px 0px 0px black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    borderTop: "1px solid #e8e8e8",
    // width: 'calc(100% - 300px - 50px)'
  },

  viewInput: {
    flex: "1",
    borderRadius: "4px",
    paddingLeft: "10px",
    paddingRight: "10px",
    border: "0px",
    height: "30px",
  },
});

export default styles;
