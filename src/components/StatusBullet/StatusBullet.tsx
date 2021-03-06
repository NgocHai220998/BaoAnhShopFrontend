import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {colors} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0
  },
  small: {
    height: theme.spacing(1),
    width: theme.spacing(1)
  },
  medium: {
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  large: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  default: {
    backgroundColor: colors.grey[50]
  },
  primary: {
    backgroundColor: theme.palette.primary.main
  },
  info: {
    backgroundColor: colors.lightBlue[600]
  },
  warning: {
    backgroundColor: colors.orange[900]
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  success: {
    backgroundColor: colors.green[600]
  }
}));

interface StatusBulletProps {
  className?: string,
  color?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error',
  size: any,
}

const StatusBullet: React.FunctionComponent<StatusBulletProps> = (props: StatusBulletProps) => {
  const {className, size, color, ...rest} = props;
  const classes = useStyles();
  const rootClassName = clsx(
    {
      [classes.root]: true,
      // @ts-ignore
      [classes[size]]: size,
      // @ts-ignore
      [classes[color]]: color
    },
    className
  );

  return (
    <span
      {...rest}
      className={rootClassName}
    />
  );
};

export default StatusBullet;
