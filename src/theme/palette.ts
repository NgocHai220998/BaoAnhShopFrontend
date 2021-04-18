import {colors} from "@material-ui/core";

const white = "#ffffff";
const black = "#000000";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#4A148C",
    main: "#7B1FA2",
    light: "#AB47BC",
  },
  secondary: {
    contrastText: white,
    dark: "#880E4F",
    main: "#C2185B",
    light: "#EC407A",
  },
  neutral: {
    contrastText: white,
    dark: colors.blueGrey[900],
    main: colors.blueGrey[600],
    light: colors.blueGrey[400],
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
