import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    lineHeight: '10px',
    fontSize: '10px',
    height: 20,
    minWidth: 20,
    whiteSpace: 'nowrap',
    padding: theme.spacing(0.5, 1)
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5)
  }
}));

interface LabelProps {
  children?: any,
  className?: string,
  color?: string,
  shape?: 'square' | 'rounded',
  style?: object,
  variant?: 'contained' | 'outlined'
}

const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) => {
  const {className, variant, color, shape, children, style, ...rest} = props;
  const classes = useStyles();

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.rounded]: shape === 'rounded'
    },
    className
  );

  const finalStyle = {
    border: `1px solid ${color}`,
    color: "#fff",
    backgroundColor: color,
    borderRadius: '2px',
  };

  if (variant === 'contained') {
    finalStyle.color = '#FFF';
    finalStyle.backgroundColor = color;
  } else {
    finalStyle.backgroundColor = 'transparent';
    // @ts-ignore
    finalStyle.color = color;
  }

  if (shape === 'rounded') {
    finalStyle.borderRadius = "50%";
  }

  return (
    <Typography
      {...rest}
      className={rootClassName}
      style={finalStyle}
      variant="overline"
    >
      {children}
    </Typography>
  );
};

export default Label;
