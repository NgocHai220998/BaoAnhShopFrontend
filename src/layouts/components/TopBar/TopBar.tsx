import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {colors, createStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsPopover from "@/components/NotificationsPopover/NotificationsPopover";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import palette from "@/theme/palette";
import Payment from "@/components/payment/Payment";

interface NotificationsTypes {
  id: any;
  type: "order" | "user" | "project" | "feature";
  title: string;
  created_at: string;
}

interface TopBarProps {
  className?: string;
  onOpenNavBarMobile?: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      boxShadow: "none",
    },
    flexGrow: {
      flexGrow: 1,
    },
    notificationsButton: {
      marginLeft: theme.spacing(1),
    },
    notificationsBadge: {
      backgroundColor: colors.orange[600],
    },
    logo: {},
    logoSvg: {
      height: "30px",
      fill: palette.primary.main,
      float: "left",
    },
    logoTitle: {
      padding: "9px 10px",
      float: "left",
      background: palette.primary.light,
      borderRadius: "4px",
      color: "#ffffff",
      fontWeight: 900,
      fontSize: "12px",
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      margin: "1px 0 0 8px",
    },
    topBar: {
      backgroundColor: palette.primary.main
    },
    pointer: {
      cursor: "ponter",
    },
  })
);

const TopBar: React.FunctionComponent<TopBarProps> = (props: TopBarProps) => {
  const {onOpenNavBarMobile, className, ...rest} = props;

  const classes = useStyles();
  const notificationsRef = useRef(null);

  // eslint-disable-next-line
  const [notifications, setNotifications] = useState<NotificationsTypes[]>([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar {...rest} className={classes.root} color="primary">
      <Toolbar className={classes.topBar}>
        <div className={classes.logo}>
          <div className={classes.logoTitle}>LEARN FORWARD ADMIN</div>
        </div>
        <div className={classes.flexGrow}/>
        <div>
          <Payment />
        </div>
        <IconButton color={"inherit"} onClick={() => setOpenDialog(true)}>
          <HomeIcon className={classes.pointer}/>
        </IconButton>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>

      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{"Về trang chủ"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description">
            Chọn <strong>OK</strong> để quay trở về trang chủ.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDialog(false)} color="primary">
            Huỷ
          </Button>
          <Button href={process.env.REACT_APP_BASE_URL} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default TopBar;
