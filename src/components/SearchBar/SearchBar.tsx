import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import Filter from "@/components/SearchBar/components/Filter/Filter";
import Search from "@/components/SearchBar/components/Search/Search";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  search: {
    flexGrow: 1,
    maxWidth: 480,
    flexBasis: 480
  },
  filterButton: {
    marginLeft: 'auto'
  },
  filterIcon: {
    marginRight: theme.spacing(1)
  }
}));

interface SearchBarProps {
  className?: string,
  onFilter?: () => void,
  onSearch?: () => void,
}

const SearchBar: React.FunctionComponent<SearchBarProps> = (props: SearchBarProps) => {
  const {onFilter, onSearch, className, ...rest} = props;
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(true);
  };

  const handleFilterClose = () => {
    setOpenFilter(false);
  };

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item>
        <Search
          className={classes.search}
          onSearch={onSearch}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.filterButton}
          color="primary"
          onClick={handleFilterOpen}
          size="small"
          variant="outlined"
        >
          <FilterListIcon className={classes.filterIcon}/> Show filters
        </Button>
      </Grid>
      <Filter
        onClose={handleFilterClose}
        onFilter={onFilter}
        open={openFilter}
      />
    </Grid>
  );
};

export default SearchBar;
