import React, { ComponentType, Fragment } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import { timestampDateTimeFormat } from "@/helpers/date";
import discountIcon from "@/assets/images/icons/discount.svg";
import comment_icon from "@/assets/images/icons/comment.svg";
import dolarIcon from "@/assets/images/icons/dolar.svg";
import cartIcon from "@/assets/images/icons/cart.svg";
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/redux/actions/GlobalModalAction";
import { useHistory } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";

interface IProps {
  data: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  cardAction: {
    padding: theme.spacing(1),
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  img: {
    width: "100%",
    height: "100%",
    maxHeight: 146,
    display: "block",
    objectFit: "cover",
    borderRadius: 4,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "148px",
  },
  name: {},
  paddingRightButton: {
    marginRight: theme.spacing(2),
    float: "right",
  },
  iconActionButton: {
    padding: 0,
  },
  addressText: {
    color: "#aaa",
    display: "flex",
    fontSize: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  contentText: {
    color: "#444",
    fontSize: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },

  imageIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  titleAction: {
    fontWeight: 700,
    color: "#444",
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const JobListItem: ComponentType<IProps> = (props: IProps) => {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleAddCart = () => {
    setOpenAlert(true)
    if(window.localStorage.getItem('carts')) {
      let isExited = false;
      // @ts-ignore
      let carts: any = JSON.parse(window.localStorage.getItem('carts'))
      for (let i = 0; i < carts.length; ++i) {
        if (carts[i].id === data.node.id) {
          isExited = true;
          carts[i].mount += 1;

          break;
        }
      }

      if (!isExited) {
        const tmpItem: any = {
          ...data.node,
          mount: 1
        }

        carts.push(tmpItem);
      }

      window.localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      let carts: any = [{
        ...data.node,
        mount: 1
      }]

      window.localStorage.setItem('carts', JSON.stringify(carts));
    }

  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} md={3} lg={2}>
              <Avatar className={classes.img} src={data.node.image} />
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                  <Link href={`#`} color={"textPrimary"} className={classes.name}>
                    <Typography variant="h4">{data.node.name || "Chưa cập nhật"}</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"body2"} className={classes.addressText}>
                    Nhà phân phối: {data.node.distributor || "Chưa cập nhật"}
                  </Typography>
                </Grid>
                {/* <Grid item xs={6}>
                  <Typography variant={"body2"} className={classes.contentText}>
                    Số lượng còn lại: {"34 Hộp" || "Chưa cập nhật"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={"body2"} className={classes.contentText}>
                    Đã bán: {"1002 Hộp" || "Chưa cập nhật"}
                  </Typography>
                </Grid> */}
                <Grid item xs={6}>
                  <Typography variant={"h3"} className={classes.contentText} style={{fontWeight: 'bold'}}>
                    Giá bán: {`${data.node.price || "Chưa cập nhật"} VNĐ` || "Chưa cập nhật"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={3}>
              <Card className={classes.cardAction}>
                <Grid container spacing={2} justify={"center"} alignItems={"center"} alignContent={"center"}>
                  <Grid item xs={3}>
                    <img src={dolarIcon} className={classes.imageIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant={"subtitle1"} className={classes.titleAction}>
                      {`${data.node.price || "Chưa cập nhật"} VNĐ` || "Chưa cập nhật"}
                    </Typography>
                    <Typography variant={"body2"} className={classes.titleAction}>
                      Giá bán
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className={classes.cardAction}>
                <Grid container spacing={2} justify={"center"} alignItems={"center"} alignContent={"center"}>
                  <Grid item xs={3}>
                    <img src={discountIcon} className={classes.imageIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant={"subtitle1"} className={classes.titleAction}>
                    {`${data.node.discount * 100 || "Chưa cập nhật"} %` || "Chưa cập nhật"}
                    </Typography>
                    <Typography variant={"body2"} className={classes.titleAction}>
                      Chiết khấu %
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className={classes.cardAction}>
                <Grid container spacing={2} justify={"center"} alignItems={"center"} alignContent={"center"}>
                  <Grid item xs={3}>
                    <img src={discountIcon} className={classes.imageIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant={"subtitle1"} className={classes.titleAction}>
                      Chưa cập nhật
                    </Typography>
                    <Typography variant={"body2"} className={classes.titleAction}>
                      Chưa cập nhật
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className={classes.cardAction}>
                <Grid container spacing={2} justify={"center"} alignItems={"center"} alignContent={"center"}>
                  <Grid item xs={3}>
                    <img src={cartIcon} className={classes.imageIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <div onClick={() => {
                      handleAddCart()
                    }}>
                      <Typography variant={"subtitle1"} style={{backgroundColor: 'red', width: '35px', textAlign: 'center', borderRadius: '10000px', color: 'white'}} className={classes.titleAction}>
                        + 1
                      </Typography>
                      <Typography variant={"body2"} className={classes.titleAction}>
                        Thêm vào giỏ hàng
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Card>
        <Snackbar open={openAlert} autoHideDuration={1000} onClose={() => {
          setOpenAlert(false);
        }}>
          <Alert onClose={() => {
            setOpenAlert(false);
          }} severity="success">
            Thêm thành công
          </Alert>
        </Snackbar>
      </Grid>
    </Fragment>
  );
};

export default JobListItem;
