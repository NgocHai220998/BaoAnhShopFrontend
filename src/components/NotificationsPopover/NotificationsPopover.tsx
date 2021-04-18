import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CardActions, CardHeader, Divider, Popover } from "@material-ui/core";
import NotificationList from "@/components/NotificationsPopover/components/NotificationList/NotificationList";
import EmptyList from "@/components/NotificationsPopover/components/EmptyList/EmptyList";
import Avatar from "@material-ui/core/Avatar";
import IconBell from "@/assets/images/icons/Icon-01.svg";

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: "100%",
  },
  actions: {
    justifyContent: "center",
  },
  popver: {
    marginTop: 9,
    borderRadius: 0,
    maxHeight: "60%",
  },
  iconHeader: {
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    padding: 4,
    height: 50,
    width: 50,
  },
  imageHeader: {
    width: 32,
    objectFit: "unset",
  },
  bigTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#000",
    lineHeight: 1.5,
  },
  subTitle: {
    fontSize: 14,
  },
}));

interface NotificationsPopoverProps {
  anchorEl?: any;
  className?: string;
  notifications: {
    id: any;
    type: "order" | "user" | "project" | "feature";
    title: string;
    created_at: string;
  }[];
  onClose: () => void;
  open: boolean;
}

const NotificationsPopover: React.FunctionComponent<NotificationsPopoverProps> = (props: NotificationsPopoverProps) => {
  const { notifications, anchorEl, ...rest } = props;
  const classes = useStyles();

  return (
    <Popover
      {...rest}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      classes={{ paper: classes.popver }}
    >
      <div className={classes.root}>
        <CardHeader
          classes={{ title: classes.bigTitle, subheader: classes.subTitle }}
          avatar={
            <Avatar
              alt=""
              classes={{ img: classes.imageHeader }}
              src={IconBell}
              className={classes.iconHeader}
            ></Avatar>
          }
          title="Thông báo"
          subheader="Nhận thông báo công việc"
        />
        <Divider />
        {notifications.length > 0 ? <NotificationList notifications={notifications} /> : <EmptyList />}
        <Divider />
        <CardActions className={classes.actions}>
          <Button onClick={rest.onClose} component={RouterLink} size="small" to="/notifications">
            Xem tất cả
          </Button>
        </CardActions>
      </div>
    </Popover>
  );
};

export default NotificationsPopover;
