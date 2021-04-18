import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Divider, IconButton, Input, Paper, Tooltip} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

interface AddPostProps {
  className?: string
}

const AddPost: React.FunctionComponent<AddPostProps> = (props: AddPostProps) => {
  const {className, ...rest} = props;
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const handleChange = (event: any) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <Paper
          className={classes.paper}
          elevation={1}
        >
          <Input
            className={classes.input}
            disableUnderline
            onChange={handleChange}
            placeholder={`What's on your mind,`}
          />
        </Paper>
        <Tooltip title="Send">
          <IconButton color={value.length > 0 ? 'primary' : 'default'}>
            <SendIcon/>
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider}/>
        <Tooltip title="Attach image">
          <IconButton
            edge="end"
            onClick={handleAttach}
          >
            <AddPhotoIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Attach file">
          <IconButton
            edge="end"
            onClick={handleAttach}
          >
            <AttachFileIcon/>
          </IconButton>
        </Tooltip>
        <input
          className={classes.fileInput}
          ref={fileInputRef}
          type="file"
        />
      </CardContent>
    </Card>
  );
};

export default AddPost;
