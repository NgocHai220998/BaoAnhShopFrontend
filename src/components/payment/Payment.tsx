import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    img: {
      width: "80px",
      height: "80px",
      // maxHeight: 146,
      // display: "block",
      // objectFit: "cover",
      // borderRadius: 4,
      // textAlign: "center",
      // alignItems: "center",
      // justifyContent: "center",
      // lineHeight: "148px",
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [datas, setDatas] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [discountPrice, setDiscountPrice] = React.useState(0);
  
  const [openClear, setOpenClear] = React.useState(false);
  const [openConfirmPay, setOpenConfirmPay] = React.useState(false);



  const handleClickOpen = () => {
    fetchDatas()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrice = () => {
    if (window.localStorage.getItem('carts')) {

      // @ts-ignore
      let tmpDatas: any = JSON.parse(window.localStorage.getItem('carts'));

      let total: any = 0;
      let discount: any = 0;
      for (let i = 0; i < tmpDatas.length; ++i) {
        // @ts-ignore
        total = total + (tmpDatas[i].price * tmpDatas[i].mount);
        discount = discount + ((tmpDatas[i].price * tmpDatas[i].discount) * tmpDatas[i].mount);
      }

      setTotalPrice(total);
      setDiscountPrice(discount);
    }
  }

  const fetchDatas = () => {
    if (window.localStorage.getItem('carts')) {
      // @ts-ignore
      setDatas(JSON.parse(window.localStorage.getItem('carts')))
      handlePrice();
    }
  };

  const handleAdd = (data: any) => {
    let tmpCarts: any = [...datas];

    for (let i = 0; i < tmpCarts.length; ++i) {
      if (data.id === tmpCarts[i].id) {
        tmpCarts[i].mount += 1;
        
        window.localStorage.setItem('carts', JSON.stringify(tmpCarts));
        fetchDatas()
        break;
      }
    }
  };

  const handleRemove = (data: any) => {
    let tmpCarts: any = [...datas];

    for (let i = 0; i < tmpCarts.length; ++i) {
      if (data.id === tmpCarts[i].id && data.mount > 1) {
        tmpCarts[i].mount -= 1;
        
        window.localStorage.setItem('carts', JSON.stringify(tmpCarts));
        fetchDatas()
        break;
      }
    }
  };

  const handleRemoveItem = (data: any) => {
    let tmpCarts: any = [...datas];
    let index = -1;
    for (let i = 0; i < tmpCarts.length; ++i) {
      if (data.id === tmpCarts[i].id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      tmpCarts.splice(index, 1);
      window.localStorage.setItem('carts', JSON.stringify(tmpCarts));
      fetchDatas();
    }
  }

  useEffect(() => {
    fetchDatas()
  }, [])

  return (
    <div>
      <Button startIcon={<AttachMoneyIcon />} variant="contained" color="secondary" onClick={handleClickOpen}>
        Thanh toán
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" className={classes.title}>
              THANH TOÁN HÓA ĐƠN CHO KHÁCH HÀNG
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {
              setOpenClear(true)
            }}>
              Làm mới thanh toán
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {
            datas.map((data: any, index) => {
              return (
                <div>
                  <ListItem button>
                    <Grid style={{textAlign: 'center'}} container>
                      <Grid item md={1}>
                        <Avatar className={classes.img} src={data.image} />
                      </Grid>
                      <Grid style={{lineHeight: '80px'}} item md={6}>{data.name || "Chưa cập nhật"}</Grid>
                      <Grid style={{lineHeight: '80px'}} item md={1}>{data.price || "Chưa cập nhật"} VNĐ</Grid>
                      <Grid style={{lineHeight: '80px'}} item md={1}>{data.discount * 100 || "Chưa cập nhật"} %</Grid>
                      <Grid style={{lineHeight: '80px'}} item md={2}>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                          <Button onClick={() => {
                            handleRemove(data)
                          }} startIcon={<RemoveIcon />} color="secondary" variant="contained"></Button>
                          <Button style={{fontWeight: 'bold', fontSize: '18px'}}>{data.mount || "Chưa cập nhật"}</Button>
                          <Button onClick={() => {
                            handleAdd(data)
                          }} endIcon={<AddIcon />} color="primary" variant="contained"></Button>
                        </ButtonGroup>
                      </Grid>
                      <Grid style={{lineHeight: '80px', color: 'red', fontWeight: 'bold'}} item md={1}>{data.price * data.mount || "Chưa cập nhật"} VNĐ</Grid>
                    </Grid>
                    <IconButton edge="start" color="inherit" onClick={() => {
                      handleRemoveItem(data)
                    }} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </div>
              )
            })
          }
        </List>
        <Grid container>
          <Grid md={8} item></Grid>
          <Grid md={4} item>
            <div>
              <Typography variant="h3">
                Tổng tiền: 
                <Typography style={{ display: 'inline-block', fontWeight: 'bold', color: 'red', fontSize: '36px', paddingLeft: '20px'}}>
                  {totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                </Typography>
              </Typography>
            </div>
            <div>
              <Typography variant="h4">
                Tích điểm:
                <Typography style={{ display: 'inline-block', fontWeight: 'bold', color: 'green', fontSize: '24px', paddingLeft: '20px'}}>
                  + {discountPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                </Typography>
              </Typography>
            </div>
            <Button startIcon={<AttachMoneyIcon />} variant="contained" color="secondary" onClick={() => {
              setOpenConfirmPay(true);
            }}>
              Thanh toán hóa đơn
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={openClear}
        onClose={() => {
          setOpenClear(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Quán tạp hóa BẢO ANH"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn "HỦY" đơn hàng này chứ? Chọn "Đồng Ý" để tiếp tục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              setOpenClear(false);
            }} color="primary">
            Hủy
          </Button>
          <Button onClick={() => {
            setOpenClear(false);
            window.localStorage.removeItem('carts');
            setOpen(false)
          }} color="primary" autoFocus>
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmPay}
        onClose={() => {
          setOpenConfirmPay(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Quán tạp hóa BẢO ANH"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn "THANH TOÁN" đơn hàng này chứ? Chọn "Đồng Ý" để tiếp tục.
          </DialogContentText>
          <div>
            <Typography variant="h3">
              Tổng tiền: 
              <Typography style={{ display: 'inline-block', fontWeight: 'bold', color: 'red', fontSize: '36px', paddingLeft: '20px'}}>
                {totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
              </Typography>
            </Typography>
          </div>
          <div>
            <Typography variant="h4">
              Tích điểm:
              <Typography style={{ display: 'inline-block', fontWeight: 'bold', color: 'green', fontSize: '24px', paddingLeft: '20px'}}>
                + {discountPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
              </Typography>
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              setOpenConfirmPay(false);
            }} color="primary">
            Hủy
          </Button>
          <Button onClick={() => {  
            setOpenConfirmPay(false);
            window.localStorage.removeItem('carts');
            setOpen(false)
            window.location.reload();
          }} color="primary" autoFocus>
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
