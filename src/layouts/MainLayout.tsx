import React, {Suspense, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {createStyles, LinearProgress} from "@material-ui/core";
import NavBar from "@/layouts/components/NavBar/NavBar";
import ChatBar from "@/layouts/components/ChatBar/ChatBar";
import TopBar from "@/layouts/components/TopBar/TopBar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    topBar: {
      zIndex: 2,
      position: "relative",
    },
    container: {
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
    },
    navBar: {
      zIndex: 3,
      width: 256,
      minWidth: 256,
      flex: "0 0 auto",
      backgroundColor: "white",
    },
    content: {
      overflowY: "auto",
      overflowX: "hidden",
      flex: "1 1 auto",
      marginTop: 65,
    },
  })
);

interface DashboardProps {
  routes: any[];
}

const MainLayout: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const {routes} = props;
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <TopBar className={classes.topBar} onOpenNavBarMobile={handleNavBarMobileOpen}/>
        <div className={classes.container}>
          <NavBar className={classes.navBar} onMobileClose={handleNavBarMobileClose} openMobile={openNavBarMobile}/>
          <main id="main" className={classes.content}>
            <Suspense fallback={<LinearProgress/>}>
              <Switch>
                {routes.map((route, index) => (
                  <Route key={index} path={route.path} exact={route.exact} children={<route.component/>}/>
                ))}
              </Switch>
            </Suspense>
          </main>
        </div>
        <ChatBar/>
      </div>
    </Router>
  );
};

export default MainLayout;
