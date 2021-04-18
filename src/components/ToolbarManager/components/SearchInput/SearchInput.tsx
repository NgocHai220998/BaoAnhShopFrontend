import React, {ComponentType, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  action: (keyword: string) => void;
}

const SearchInput: ComponentType<SearchInputProps> = (props: SearchInputProps) => {
  // eslint-disable-next-line
  const {className, action, placeholder, ...rest} = props;
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState("");

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{'aria-label': 'search'}}
        value={searchKey}
        onChange={event => {
          setSearchKey(event.target.value);
          action(event.target.value)
        }}
      />
      <IconButton type="submit" onClick={() => action(searchKey)} className={classes.iconButton}
                  aria-label="search">
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
