import React, {ComponentType, useState} from "react";
import classNames from "classnames";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import EditIcon from '@material-ui/icons/Edit';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {compose} from "recompose";
import TableEditBar from "@/views/ContentList/components/TableEditBar/TableEditBar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import palette from "@/theme/palette";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    content: {
      padding: 0,
    },
    avatar: {
      height: 42,
      width: 42,
      marginRight: theme.spacing(1),
    },
    actions: {
      padding: theme.spacing(0, 1),
      justifyContent: "flex-end",
    },
    view: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: palette.primary.main,
      margin: "0px 4px",
      cursor: "pointer",
    },
    icon: {
      color: "#fff",
      fontSize: 16,
    },
    logo: {
      width: "auto",
      height: 50,
    },
    title: {
      minWidth: 250,
      [theme.breakpoints.down("xs")]: {
        minWidth: "calc(100vw - 210px)",
      },
    },
    column: {
      minWidth: 150
    }
  });

interface IProps {
  className?: string;
  classes?: any;
  datas: any;
  countDatas: number;
  onChangePage: (page: number) => void;
}

const TableManager: ComponentType<IProps> = (props: IProps) => {
  const {classes, className, datas, countDatas, onChangePage, ...rest} = props;
  const [selectedDatas, setSelectedDatas] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleSelectAll = (event: any) => {
    let selectedDatas = [];
    if (event.target.checked) {
      selectedDatas = datas.map((data: any) => data.node);
    }
    setSelectedDatas(selectedDatas);
  };

  const handleSelectOne = (node: any) => {
    const selectedIndex = selectedDatas.findIndex((item: any) => item.id === node.id);
    let newSelectedDatas: string[] = [];

    if (selectedIndex === -1) {
      newSelectedDatas = newSelectedDatas.concat(selectedDatas, node);
    } else if (selectedIndex === 0) {
      newSelectedDatas = newSelectedDatas.concat(selectedDatas.slice(1));
    } else if (selectedIndex === selectedDatas.length - 1) {
      newSelectedDatas = newSelectedDatas.concat(selectedDatas.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDatas = newSelectedDatas.concat(
        selectedDatas.slice(0, selectedIndex),
        selectedDatas.slice(selectedIndex + 1)
      );
    }
    setSelectedDatas(newSelectedDatas);
  };

  const handlePageChange = (event: any, page: number = 1) => {
    setPage(page);
    onChangePage(page);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const isSelected = (node: any) => {
    return !!selectedDatas.find((item: any) => item.id === node.id);
  };

  const handleSomething = () => {
    alert("Handle something")
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [creating, setCreating] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCreating(false);
    setOpenDialog(false);
  };

  return (
    <div {...rest} className={classNames(classes.root, className)}>
      <Card>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDatas.length === datas.length}
                        color="primary"
                        indeterminate={selectedDatas.length > 0 && selectedDatas.length < datas.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell className={classes.column} align="center">ID</TableCell>
                    <TableCell className={classes.column} align="center">Tiêu đề</TableCell>
                    <TableCell className={classes.column} align="center">Nội dung</TableCell>
                    <TableCell className={classes.column} align="center">Bài giảng</TableCell>
                    <TableCell className={classes.column} align="center">Chi tiết</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((data: any) => (
                    <TableRow hover key={data.node.id} selected={isSelected(data.node)}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(data.node)}
                          color="primary"
                          onChange={() => handleSelectOne(data.node)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.title}>
                        {data.node.id || "Chưa cập nhật"}
                      </TableCell>
                      <TableCell align="center">
                        {data.node.title || "Chưa cập nhật"}
                      </TableCell>
                      <TableCell align="center">
                        {data.node.content || "Chưa cập nhật"}
                      </TableCell>
                      <TableCell align="center">
                        {data.node.lesson.title || "Chưa cập nhật"}
                      </TableCell>
                      <TableCell align="center">
                        <div style={{display: "flex", justifyContent: "center"}}>
                          <Tooltip title="Chỉnh sửa" placement="top">
                            <Avatar className={classes.view} variant="circular">
                              <Link
                                to={`/content/${data.node.id}`}
                              >
                                <EditIcon className={classes.icon}/>
                              </Link>
                            </Avatar>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={countDatas}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedDatas} onHandleSomething={handleClickOpenDialog}/>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Xác nhận hành động</DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description">
            Bạn chắc chắn handle something? Nhấn <strong>OK</strong> để tiếp tục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog} color="primary">
            Huỷ
          </Button>
          {creating ? (
            <CircularProgress size={24}/>
          ) : (
            <Button onClick={handleSomething} color="primary">
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default compose<IProps, any>(withStyles(styles))(TableManager);
