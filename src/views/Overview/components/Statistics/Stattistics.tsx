import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import palette from "@/theme/palette";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  item: {
    padding: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      "&:not(:last-of-type)": {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    [theme.breakpoints.down("sm")]: {
      "&:not(:last-of-type)": {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: theme.spacing(1),
    backgroundColor: palette.primary.main,
    color: "#fff",
    padding: "4px 8px",
    fontWeight: 500,
    borderRadius: 5,
  },
  overline: {
    marginTop: theme.spacing(1),
  },
}));

interface StatisticsProps {
  className?: string;
}

const Statistics: React.FunctionComponent<StatisticsProps> = (props: StatisticsProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="center" container justify="space-between">
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div>
            <div>
              <Typography variant="h4">1000</Typography>
            </div>
            <Typography className={classes.overline} variant="overline">
              Tổng số công ty
            </Typography>
          </div>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div>
            <div>
              <Typography variant="h4">1000</Typography>
            </div>
            <Typography className={classes.overline} variant="overline">
              Tổng số tin rao
            </Typography>
          </div>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div>
            <div>
              <Typography variant="h4">10000</Typography>
            </div>

            <Typography className={classes.overline} variant="overline">
              Tổng số người dùng
            </Typography>
          </div>
        </Grid>

        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div>
            <div className={classes.titleWrapper}>
              <Typography variant="h4">10000</Typography>
              <div className={classes.label}>
                <p>Live</p>
              </div>
            </div>

            <Typography className={classes.overline} variant="overline">
              Đang online
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Statistics;
