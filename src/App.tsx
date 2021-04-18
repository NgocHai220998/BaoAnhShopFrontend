import React, {ComponentType} from "react";
import theme from "@/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import withWidth from "@material-ui/core/withWidth/withWidth";
import { History } from "history";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { GlobalContext } from "@/store/context/GlobalContext";
import { RouteChildrenProps, RouterProps } from "react-router";
import "@/assets/scss/main.scss";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import MainLayout from "./layouts/MainLayout";
import routes from "@/routes/Main";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GlobalModal from "@/components/GlobalModal/GlobalModal";
import GlobalToast from "@/components/GlobalToast/GlobalToast";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { SnackbarProvider } from "notistack";
import palette from "@/theme/palette";
import { ApolloProvider } from '@apollo/client';

interface AppProps extends RouterProps, RouteChildrenProps {
  history: History;
  width: Breakpoint;
}

// @ts-ignore
const App: ComponentType<{}, any> = (props: AppProps) => {
  const { history, location, width, match } = props;

  const useStyles = makeStyles({
    fixed: {
      position: "fixed",
      bottom: 40,
      left: 35,
      border: `2px solid ${palette.primary.main}`,
      backgroundColor: palette.primary.main,
      padding: 8,
    },
    icon: {
      fontSize: 35,
      color: "#fff",
    },
    tooltip: {
      backgroundColor: "#fff",
      color: "#666",
      fontSize: 13,
      width: 230,
      padding: "0.5em 0.8em 0.6em",
      borderRadius: 10,
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
    arrow: {
      color: "white",
    },
    imgTooltip: {
      maxWidth: "100%",
      height: "auto",
    },
    contentToast: {
      fontSize: 16,
      lineHeight: 1.2,
    },
  });
  const classes = useStyles();

  return (
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <GlobalContext.Provider value={{ history, location, width, match }}>
            <GlobalModal />
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2000}
              classes={{
                variantSuccess: classes.contentToast,
                variantError: classes.contentToast,
                variantInfo: classes.contentToast,
                variantWarning: classes.contentToast,
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <GlobalToast />
            </SnackbarProvider>
            <MainLayout routes={routes} />
          </GlobalContext.Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </I18nextProvider>
  );
};

export default compose(withRouter, withWidth())(App);
