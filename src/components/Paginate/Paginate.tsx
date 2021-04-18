import React, { ComponentType } from "react";
import { createStyles, Theme, withStyles, Grid } from "@material-ui/core";
import { compose } from "recompose";
import Pagination from "@material-ui/lab/Pagination/Pagination";

const styles = (theme: Theme) =>
  createStyles({
    pagination: {
      paddingTop: theme.spacing(2)
    }
  });

interface IProps {
  classes: any;
  datas: any[];
  handleChangePage: () => void;
  countDatas: number;
}

const PaginateCustom: ComponentType<IProps> = (props: IProps) => {
  const { classes, datas, handleChangePage, countDatas } = props;
  return (
    <div className={classes.pagination}>
      <Grid container justify={"center"} alignItems={"center"}>
        {datas.length ? (
          <Pagination
            count={Math.ceil(countDatas / 10)}
            variant={"text"}
            color={"primary"}
            size={"medium"}
            onChange={handleChangePage}
          />
        ) : null}
      </Grid>
    </div>
  );
};

export default compose<IProps, any>(withStyles(styles))(PaginateCustom);
