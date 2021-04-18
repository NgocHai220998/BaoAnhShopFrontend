import React, {Fragment, useEffect, useState} from 'react';
import classNames from 'classnames';
import moment from 'moment';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import {
  Avatar,
  Badge,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import StatusBullet from "@/components/StatusBullet/StatusBullet";


const useStyles = makeStyles(theme => createStyles({
  drawer: {
    width: 280
  },
  root: {
    // backgroundColor: theme.palette.error
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  },
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
}));

interface ChatBar {
  className?: string,
}

interface DataTypes {
  groups: {
    id: any,
    name: string,
  }[],

  connections: {
    group: any,
    id: any,
    avatar: string,
    name: string,
    active: boolean,
    lastActivity: any
  }[]
}

const ChatBar: React.FunctionComponent<ChatBar> = (props: ChatBar) => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [data, setData] = useState<DataTypes>();

  useEffect(() => {

  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!data) {
    return null;
  }

  const onlineConnections = data.connections.filter(
    connection => connection.active
  ).length;

  return (
    <Fragment>
      <Drawer
        anchor="right"
        classes={{paper: classes.drawer}}
        elevation={1}
        onClose={handleClose}
        open={open}
        variant="temporary"
      >
        <div
          {...rest}
          className={classNames(classes.root, className)}
        >
          {data.groups.map((group: any) => (
            <List
              className={classes.list}
              key={group.id}
              subheader={
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {group.name}
                </ListSubheader>
              }
            >
              {data.connections
                .filter(connection => group.id === connection.group)
                .map(connection => (
                  <ListItem
                    disableGutters
                    key={connection.id}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Person"
                        src={connection.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      disableTypography
                      primary={
                        <Typography
                          display="block"
                          noWrap
                          variant="h6"
                        >
                          {connection.name}
                        </Typography>
                      }
                    />
                    {connection.active ? (
                      <StatusBullet
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Typography
                        className={classes.lastActivity}
                        variant="body2"
                      >
                        {moment(connection.lastActivity).fromNow()}
                      </Typography>
                    )}
                  </ListItem>
                ))}
            </List>
          ))}
        </div>
      </Drawer>
      <span
        className={classNames(classes.fab)}
      >
        <Badge
          badgeContent={onlineConnections}
          color="error"
        >
          <Fab
            color="primary"
            onClick={handleOpen}
          >
            <PeopleIcon/>
          </Fab>
        </Badge>
      </span>
    </Fragment>
  );
};

export default ChatBar;
