import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Input, Paper} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.divider
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: theme.spacing(2)
  }
}));

interface SearchProps {
  className?: string,
  onSearch?: () => void,
}

const Search: React.FunctionComponent<SearchProps> = (props: SearchProps) => {
  const {onSearch, className, ...rest} = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Paper
        className={classes.search}
        elevation={1}
      >
        <SearchIcon className={classes.searchIcon}/>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder="Search"
        />
      </Paper>
      <Button
        className={classes.searchButton}
        onClick={onSearch}
        size="large"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
