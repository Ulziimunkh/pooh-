import React from "react";
import { myFirebase } from "../../Config/MyFirebase";
import "./styles.css";
import CustomDialog from "../Dialog/CustomDialog";
import { AppString } from "../../Config/AppString";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenDialogConfirmLogout, setIsOpenDialogConfirmLogout] = React.useState(false);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onProfileClick = () => {
    props.history.push("/profile");
  };
  // ############# Start logOut #######################
  const onLogoutClick = () => {
    setIsOpenDialogConfirmLogout(true);
  };

  const doLogout = () => {
    props.setLoading(true);
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        props.setLoading(false);
        localStorage.clear();
        props.showToast(1, "Logout success");
        props.history.push("/");
        
      })
      .catch(function(err) {
        props.setLoading(false);
        props.showToast(0, err.message);
      });
  };
  const hideDialogConfirmLogout = () => {
    setIsOpenDialogConfirmLogout(false);
  };
  const renderDialogConfirmLogout = () => {
    if(isOpenDialogConfirmLogout)
      return (
        <CustomDialog
          title="Are you sure to logout?"
          handleCloseYes={doLogout}
          handleCloseNo={hideDialogConfirmLogout}
          open={isOpenDialogConfirmLogout}
        />
      );
  };
  // ############# ENDS logOut #######################
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onProfileClick}>Profile</MenuItem>
      <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {/* <AccountCircle /> */}
          <Avatar
              alt="user Name"
              className="imgSetting"
              src={currentUserAvatar}/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  
     return (
      <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={props.toggleSideBar}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MangoChat
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
              alt="user Name"
              className="imgSetting"
              src={currentUserAvatar}/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderDialogConfirmLogout()}
    </div>
    );
  
}