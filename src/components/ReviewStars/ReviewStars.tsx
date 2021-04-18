import React from 'react';
import clsx from 'clsx';
import {v1 as uuid} from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  starIcon: {
    fontSize: 18,
    height: 18,
    width: 18,

  },
  starFilledIcon: {
    color: colors.amber[400]
  },
  starBorderIcon: {
    color: theme.palette.primary.main
  }
}));

interface ReviewStarsProps {
  className?:string,
  starCount:number,
  value:number
}

const ReviewStars:React.FunctionComponent<ReviewStarsProps> = (props:ReviewStarsProps) => {
  const { value, starCount, className, ...rest } = props;
  const classes = useStyles();
  const starNodes = [];

  for (let i = 1; i <= starCount; i++) {
    const key = uuid();
    const starNode =
      i <= value ? (
        <StarIcon
          className={clsx(classes.starIcon, classes.starFilledIcon)}
          key={key}
        />
      ) : (
        <StarBorderIcon
          className={clsx(classes.starIcon, classes.starBorderIcon)}
          key={key}
        />
      );

    starNodes.push(starNode);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {starNodes}
    </div>
  );
};

export default ReviewStars;
