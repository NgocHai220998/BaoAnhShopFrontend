import { IGlobalToastState } from "@/store/redux/types/GlobalToast";
import GlobalToastType from "@/store/redux/types/GlobalToast";

const defaultState: IGlobalToastState = {
  notifications: [],
};

export const GlobalToastReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GlobalToastType.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case GlobalToastType.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case GlobalToastType.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.key !== action.key),
      };

    default:
      return state;
  }
};
