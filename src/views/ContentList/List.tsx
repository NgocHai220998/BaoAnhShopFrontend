import React, {ComponentType, useEffect, useState} from "react";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from "recompose";
import Page from "@/components/Page/Page";
import ToolbarManager from "@/components/ToolbarManager/ToolbarManager";
import {debounce} from "lodash";
import TableManager from "@/views/ContentList/components/TableManager/TableManager";
import {PAGINATE_CONTENT} from "@/graphql/content/query";
import { useQuery } from "@apollo/client";

interface IProps {
  classes?: any;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    content: {
      padding: 0,
    },
  });

const List: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [datas, setDatas] = useState<any>([]);
  const [countDatas, setCountDatas] = useState<number>(0);
  const [filter, setFilter] = useState<string>("{}");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data, refetch } = useQuery(PAGINATE_CONTENT, {
    variables: {
      page: 1,
      limit: 10,
      filter: filter
    }
  });

  useEffect(() => {
    if (data && data.fetchContents) {
      setDatas(data.fetchContents.edges)
      setCountDatas(data.fetchContents.totalCount)
      setIsLoading(false)
    }
  }, [data])

  const fetchDatas = (page: number = 1, limit: number = 10, filter: string = "{}") => {
    setFilter(filter)
    refetch({
        page: page,
        limit: limit,
        filter: filter
    })
  };

  const onSearch = debounce((keyword: string = "{}") => {
    let filterString: string = JSON.stringify({jp: keyword});
    setFilter(filterString);
    fetchDatas(1, 10, filterString);
  }, 700);

  const handleChangePage = (page: number = 1) => {
    fetchDatas(page + 1, 10, filter);
  };

  return (
    <Page title={"Bài giảng tiếng Nhật | Danh sách bài giảng tiếng Nhật"} heading={"Bài giảng tiếng Nhật | Danh sách bài giảng tiếng Nhật"} className={classes.root}>
      <ToolbarManager onSearch={onSearch} href="/content/create"/>
      <div className={classes.content}>
        {
          isLoading? (
            <div style={{textAlign: "center"}}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <TableManager
              datas={datas}
              countDatas={countDatas}
              onChangePage={handleChangePage}
            />
          )
        }
      </div>
    </Page>
  );
};

export default compose<IProps, any>(withStyles(styles))(List);
