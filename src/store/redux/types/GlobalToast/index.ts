enum GlobalToastType {
  ENQUEUE_SNACKBAR = "@@GlobalToastType/ENQUEUE_SNACKBAR",
  CLOSE_SNACKBAR = "@@GlobalToastType/CLOSE_SNACKBAR",
  REMOVE_SNACKBAR = "@@GlobalToastType/REMOVE_SNACKBAR",
}
export interface IGlobalToastState {
    readonly notifications: any[];
}
export default GlobalToastType;
