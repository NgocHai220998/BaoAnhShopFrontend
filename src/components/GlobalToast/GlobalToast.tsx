import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "@/store/redux/actions/GlobalToastAction";

let displayed: any[] = [];

const GlobalToast = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.globalToast.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: any) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }: any) => {
      if (dismissed) {
        closeSnackbar(key);
        return null;
      } else if (displayed.includes(key)) {
        return null
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event: any, reason: any, myKey: any) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event: any, myKey: any) => {
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default GlobalToast;
