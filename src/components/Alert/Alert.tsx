import React, {forwardRef} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {colors, IconButton, Paper} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import WarningIcon from '@material-ui/icons/WarningOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius
  },
  default: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  success: {
    backgroundColor: colors.green[600],
    color: 'white'
  },
  info: {
    backgroundColor: colors.lightBlue[600],
    color: 'white'
  },
  warning: {
    backgroundColor: colors.orange[900],
    color: 'white'
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  message: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0'
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: 16,
    marginRight: -8
  }
}));

const icons = {
  default: <InfoIcon/>,
  success: <CheckCircleIcon/>,
  info: <InfoIcon/>,
  warning: <WarningIcon/>,
  error: <ErrorIcon/>
};

interface AlertProps {
  className?: string,
  icon?: any,
  message: string,
  onClose?: () => void,
  variant: 'default' | 'info' | 'success' | 'warning' | 'error'
}

const Alert: React.FunctionComponent<AlertProps> = forwardRef((props: AlertProps, ref) => {
  const {className, icon, variant, message, onClose, ...rest} = props;
  const classes = useStyles();

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      elevation={1}
      ref={ref}
    >
      <span className={classes.icon}>{icon || icons[variant]}</span>
      <div className={classes.message}>{message}</div>
      {onClose && (
        <IconButton
          className={classes.action}
          color="inherit"
          key="close"
          onClick={onClose}
        >
          <CloseIcon/>
        </IconButton>
      )}
    </Paper>
  );
});

export default Alert;
