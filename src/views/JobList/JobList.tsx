import React, { ComponentType, useEffect, useState } from "react";
import { createStyles, Theme, withStyles, Grid } from "@material-ui/core";
import Page from "@/components/Page/Page";
import ToolbarManager from "@/components/ToolbarManager/ToolbarManager";
import { compose } from "recompose";
import { graphqlFilter } from "@/helpers/string";
import { debounce } from "lodash";
import JobListItem from "@/views/JobList/components/JobListItem/JobListItem";
import Pagination from "@/components/Paginate/Paginate";

import {PAGINATE_PRODUCTS} from "@/graphql/product/query";
import { apolloClient } from "@/utils/apolloClient";
// import {apolloClient} from "@/utils/apolloClient";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    content: {
      marginTop: 16,
    },
    pagination: {
      paddingTop: theme.spacing(2)
    }
  });

interface IProps {
  classes: any;
}

const JobList: ComponentType<IProps> = (props: IProps) => {
  const { classes } = props;
  const [datas, setDatas] = useState<any[]>([]);
  const [countDatas, setCountDatas] = useState(0);
  const [filter, setFilter] = useState("{}");

  useEffect(() => {
    let filterString: any = JSON.stringify({});
    fetchDatas(1, 10, filterString);
  }, []);

  const fetchDatas = (page: number = 1, limit: number = 10, filter: string = "{}") => {
    apolloClient.query({query: PAGINATE_PRODUCTS, variables: {filter, limit, page}})
      .then((response) => {
        if (response.data.fetchProducts) {
          setDatas(response.data.fetchProducts.edges)
          setCountDatas(response.data.fetchProducts.totalCount)
        }
      });
  };

  const handleSearch = debounce((keyword: string) => {
    let filterString = JSON.stringify({
      name: keyword,
    });
    setFilter(filterString);
    fetchDatas(1, 10, filterString);
  }, 300);

  const handleChangePage = (event: any, value: number) => {
    fetchDatas(value, 10, filter);
  };

  return (
    <Page title={"DANH SÁCH SẢN PHẨM CÓ TẠI CỬA HÀNG"} heading={"DANH SÁCH SẢN PHẨM CÓ TẠI CỬA HÀNG"} className={classes.root}>
      <ToolbarManager onSearch={handleSearch} />
      <div className={classes.content}>
        <Grid container spacing={2}>  
          {datas.map((item: any, index: number) => (
            <JobListItem data={item} key={index} />
          ))}
        </Grid>
      </div>
      <Pagination countDatas={countDatas} datas={datas} handleChangePage={handleChangePage} />
    </Page>
  );
};

export default compose<IProps, any>(withStyles(styles))(JobList);
