import React, { Fragment, useEffect } from "react";
import classNames from "classnames";
import useRouter from "@/utils/useRouter";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {Divider, Drawer, Hidden, Paper } from "@material-ui/core";
import Navigation from "@/components/Navigation/Navigation";
import navigationConfig from "@/layouts/components/NavBar/navigationConfig";
import { compose } from "recompose";
import { withCookies } from "react-cookie";
import { Cookie } from "universal-cookie";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      overflowY: "auto",
      position: "fixed",
      top: 65,
      left: 0,
      height: "calc(100% - 65px)",
      boxShadow: "none",
    },
    rootMobile: {
      height: "100%",
      overflowY: "auto",
    },
    content: {
      padding: theme.spacing(2),
    },
    profile: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "fit-content",
    },
    avatar: {
      width: 60,
      height: 60,
    },
    name: {
      marginTop: theme.spacing(1),
      fontWeight: 900,
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    navigation: {
      marginTop: theme.spacing(2),
    },
  });

interface NavBarProps {
  className?: string;
  classes: any;
  cookies: Cookie;
  onMobileClose: () => void;
  openMobile: boolean;
}

const NavBar: React.FunctionComponent<NavBarProps> = (props: NavBarProps) => {
  const { openMobile, onMobileClose, className, classes, cookies, ...rest } = props;
  const router = useRouter();

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      <div className={classes.profile}>
      </div>
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig.map((list, index) => (
          <Navigation component="div" pages={list.pages} title={list.title} key={index} />
        ))}
      </nav>
    </div>
  );

  return (
    <div style={{ maxWidth: 256 }}>
      <Fragment>
        <Hidden mdUp>
          <Drawer anchor="right" onClose={onMobileClose} open={openMobile} variant="temporary">
            <div {...rest} className={classNames(classes.rootMobile, className)}>
              {navbarContent}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <div style={{ width: 256 }}>
            <Paper {...rest} className={classNames(classes.root, className)} elevation={1} square>
              {navbarContent}
            </Paper>
          </div>
        </Hidden>
      </Fragment>
    </div>
  );
};

export default compose<NavBarProps, any>(withStyles(styles), withCookies)(NavBar);
