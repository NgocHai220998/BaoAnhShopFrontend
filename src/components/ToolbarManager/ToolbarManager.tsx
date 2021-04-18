import React, {ComponentType} from "react";
import clsx from "clsx";
import {makeStyles, Theme} from "@material-ui/core/styles";
import SearchInput from "@/components/ToolbarManager/components/SearchInput/SearchInput";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

interface ToolbarManagerProps {
  className?: string;
  onSearch: (keyword: string) => void;
  href?: string;
}

const ToolbarManager: ComponentType<ToolbarManagerProps> = (props: ToolbarManagerProps) => {
  const {className,href, onSearch, ...rest} = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer}/>
        {
          href ? (
            <Button color="primary" variant="contained" href={href}>
              {"Tạo mới"}
            </Button>
          ) : (
            <Button disabled color="primary" variant="contained">
              {"Tạo mới"}
            </Button>
          )
        }
      </div>
      <div className={classes.row}>
        <SearchInput action={onSearch} className={classes.searchInput} placeholder={"Tìm kiếm"}/>
      </div>
    </div>
  );
};

export default ToolbarManager;
