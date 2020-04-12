import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import images from "../Themes/Images";
class ChatListComponent extends React.Component {

  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(
        <div className={classes.root}>
            <Button variant="contained" 
              fullWidth 
              color='primary' 
              onClick={this.newChat} 
              className={classes.newChatBtn}>
                Start New Chat
            </Button>
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  let itsMe = _chat.hostId === this.props.userId;
                  return (
                    <div key={_index}>
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className={classes.listItem} 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="User Name" src={_chat.peerUser.photoURL} className={classes.orange}>{(_chat.hostId === this.props.userId ? _chat.clientAlias : _chat.hostAlias).split('')[0] }</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={itsMe ? _chat.clientAlias : _chat.hostAlias }
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {(this.userIsSender(_chat) ? 'You: ': '') +(_chat.messages[_chat.messages.length - 1].type === 0 ? _chat.messages[_chat.messages.length - 1].message.substring(0, 30) + (_chat.messages[_chat.messages.length - 1].message.length > 10 ? ' ...' :'.'): (this.userIsSender(_chat) ? '': _chat.peerUser.displayName + ': ')+ 'sent an attachment.' )}
                              </Typography>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                })
              }
            </List>
        </div>
      );
    } else {
      return(
        <div className={classes.root}>
          <div className="viewWrapSayHi">
                <span className="textSayHi">Say hi to new friend</span>
                <img
                    className="imgWaveHand"
                    src={images.ic_wave_hand}
                    alt="wave hand"
                />
            </div>
        </div>
      );
    }
  }
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userId;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);








