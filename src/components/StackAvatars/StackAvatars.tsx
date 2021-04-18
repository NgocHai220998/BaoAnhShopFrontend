import React, {memo} from 'react';
import clsx from 'clsx';
import {v1 as uuid} from 'uuid';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Tooltip} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingLeft: 20
  },
  avatar: {
    border: `3px solid ${theme.palette.primary.contrastText}`,
    marginLeft: -20,
    '&:hover': {
      zIndex: 2
    }
  },
  more: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

interface StackAvatarsProps {
  avatars: any[],
  className?: string,
  limit: number
}

const StackAvatars: React.FunctionComponent<StackAvatarsProps> = (props: StackAvatarsProps) => {
  const {avatars, limit, className, ...rest} = props;
  const classes = useStyles();

  const avatarNodes = avatars.slice(0, limit).map(item => (
    <Tooltip
      key={uuid()}
      title="View"
    >
      <Avatar
        className={classes.avatar}
        src={item}
      />
    </Tooltip>
  ));

  if (avatars.length > limit) {
    avatarNodes.push(
      <Tooltip
        key={uuid()}
        title="View"
      >
        <Avatar className={clsx(classes.avatar, classes.more)}>
          +{avatars.length - limit}
        </Avatar>
      </Tooltip>
    );
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {avatarNodes}
    </div>
  );
};

export default memo(StackAvatars);
