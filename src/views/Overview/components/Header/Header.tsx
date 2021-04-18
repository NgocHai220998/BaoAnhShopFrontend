import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Hidden } from "@material-ui/core";
import moment from "moment";
import Image from "@/assets/images/overview.svg";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  summaryButton: {
    backgroundColor: "white",
  },
  barChartIcon: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: "100%",
    maxHeight: 400,
  },
}));

interface HeaderProps {
  className?: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography component="h1" gutterBottom variant="h5">
            <b>{moment().format("LLLL")}</b>
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {"Today I feel so good!"}
          </Typography>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <img alt="Cover" className={classes.image} src={Image} />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Header;
