import React, {FunctionComponent} from "react";
import clsx from "clsx";
import {makeStyles, Theme} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from "@material-ui/core/Typography";

interface ScorePanelProps {
  className?: string;
  improvementResults: string[];
  badResults: string[];
  goodResults: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3)
  },
  problem: {
    color: "#EEC200"
  },
  improvement: {
    color: "#C4CDD5"
  },
  good: {
    color: "#50B83C"
  },
}));

const ScorePanel: FunctionComponent<ScorePanelProps> = (props: ScorePanelProps) => {
  const {className, badResults, improvementResults, goodResults} = props;
  const classes = useStyles();

  return (
    <div>
      <div className={clsx(classes.root, className)}>
        <Typography variant={"h6"}>Vấn đề</Typography>
        <List component="nav" className={classes.root} aria-label="contacts">
          {
            badResults.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FiberManualRecordIcon className={classes.problem}/>
                </ListItemIcon>
                <ListItemText primary={<span dangerouslySetInnerHTML={{__html: item}}/>}/>
              </ListItem>
            ))
          }
        </List>
      </div>
      <div className={clsx(classes.root, className)}>
        <Typography variant={"h6"}>Cần cải thiện</Typography>
        <List component="nav" className={classes.root} aria-label="contacts">
          {
            improvementResults.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FiberManualRecordIcon className={classes.improvement}/>
                </ListItemIcon>
                <ListItemText primary={<span dangerouslySetInnerHTML={{__html: item}}/>}/>
              </ListItem>
            ))
          }
        </List>
      </div>
      <div className={clsx(classes.root, className)}>
        <Typography variant={"h6"}>Tốt</Typography>
        <List component="nav" className={classes.root} aria-label="contacts">
          {
            goodResults.map((item: string, index: number) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FiberManualRecordIcon className={classes.good}/>
                </ListItemIcon>
                <ListItemText primary={<span dangerouslySetInnerHTML={{__html: item}}/>}/>
              </ListItem>
            ))
          }
        </List>
      </div>
    </div>
  )
};

export default ScorePanel;
