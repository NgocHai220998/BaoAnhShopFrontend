import React, { FunctionComponent } from "react";
import { Header, Statistics } from "./components";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Page from "@/components/Page/Page";

interface OverviewProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  statistics: {
    marginTop: theme.spacing(3),
  },
  notifications: {
    marginTop: theme.spacing(6),
  },
  projects: {
    marginTop: theme.spacing(6),
  },
  todos: {
    marginTop: theme.spacing(6),
  },
}));

const Overview: FunctionComponent<OverviewProps> = (props: OverviewProps) => {
  const classes = useStyles();

  return (
    <Page title="Tổng quan" className={classes.root}>
      <Header />
      <Statistics className={classes.statistics} />
    </Page>
  );
};
export default Overview;
