import React, {FunctionComponent} from "react";
import clsx from "clsx";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';

interface ListResultProps {
  numProblems: number;
  numImprovements: number;
}

const listStyles = makeStyles((theme: Theme) => ({
  ul: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}));

const ListResult: FunctionComponent<ListResultProps> = (props: ListResultProps) => {
  const classes = listStyles();
  const {numProblems, numImprovements} = props;

  return (
    <ul className={classes.ul}>
      <li>
        <Typography variant={"h6"}>{numProblems} {"Vấn đề"}</Typography>
      </li>
      <li>
        <Typography variant={"h6"}>{numImprovements} {"Cần cải thiện"}</Typography>
      </li>
    </ul>
  )
};

interface ScoreNotificationProps {
  className?: string;
  numProblems: number;
  numImprovements: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "#fdf3f0",
    borderRadius: "4px"
  },
  icon: {
    color: "#fdf3f0",
  }
}));

const ScoreNotification: FunctionComponent<ScoreNotificationProps> = (props: ScoreNotificationProps) => {
  const {className, numImprovements, numProblems, ...rest} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BlockIcon className={classes.icon}/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant={"h6"}>{`Tổng quan kết quả`}</Typography>}
                        secondary={<ListResult numProblems={numProblems} numImprovements={numImprovements}/>}/>
        </ListItem>
      </List>
    </div>
  )
};

export default ScoreNotification;
