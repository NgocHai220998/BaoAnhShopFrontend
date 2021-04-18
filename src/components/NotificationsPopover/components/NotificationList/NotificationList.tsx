import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import "moment/locale/vi";
import { makeStyles } from "@material-ui/core/styles";
import {List, ListItem, ListItemText } from "@material-ui/core";

import SaveIcon from "@/assets/images/icons/Icon-02.svg";
import GroupIcon from "@/assets/images/icons/Icon-03.svg";
import SeenIcon from "@/assets/images/icons/Icon-04.svg";
import CloudIcon from "@/assets/images/icons/Icon-05.svg";

import gradients from "@/utils/gradients";

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    "&:hover": {
      backgroundColor: "#ECF2FB",
    },
  },
  notSeen: {
    backgroundColor: "#ECF2FB",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
  },
  primaryText: {
    fontWeight: 500,
    color: "#000",
    fontSize: 16,
  },
  titleDetail: {
    color: "#808080",
    fontSize: 14,
  },
  timeDetail: {},
  icon: {
    width: 18,
    marginRight: "0.4em",
    marginTop: 3,
  },
  avatarBlue: {
    backgroundImage: gradients.blue,
  },
  avatarGreen: {
    backgroundImage: gradients.green,
  },
  avatarOrange: {
    backgroundImage: gradients.orange,
  },
  avatarIndigo: {
    backgroundImage: gradients.indigo,
  },
  arrowForwardIcon: {
    color: theme.palette.divider,
  },
}));

interface NotificationTypes {
  id: any;
  type: "order" | "user" | "project" | "feature";
  title: string;
  created_at: string;
}

interface NotificationListProps {
  className?: string;
  notifications: NotificationTypes[];
}

const NotificationList: React.FunctionComponent<NotificationListProps> = (props: NotificationListProps) => {
  const { notifications, className, ...rest } = props;
  const classes = useStyles();

  const avatars = {
    order: SaveIcon,
    user: GroupIcon,
    project: SeenIcon,
    feature: CloudIcon,
  };

  return (
    <List {...rest} className={clsx(classes.root, className)} disablePadding>
      {notifications.map((notification: NotificationTypes, i: number) => (
        <ListItem
          className={Math.random() > 0.5 ? classes.notSeen : classes.listItem}
          component={RouterLink}
          key={notification.id}
          to="#"
        >
          <ListItemText
            classes={{ primary: classes.primaryText }}
            primary={notification.title}
            primaryTypographyProps={{ variant: "body1" }}
            secondary={
              <div className={classes.detailItem}>
                <img alt="" src={avatars[notification.type] as any} className={classes.icon} />
                <div>
                  <div className={classes.titleDetail}>Tin tuyển dụng bạn đã lưu</div>
                  <div className={classes.timeDetail}> {moment(notification.created_at).fromNow()}</div>
                </div>
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;
