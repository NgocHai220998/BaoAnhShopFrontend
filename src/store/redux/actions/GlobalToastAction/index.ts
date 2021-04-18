import GlobalToastType from "@/store/redux/types/GlobalToast";

export const enqueueSnackbar = (notification: any) => {
    const key = notification.options && notification.options.key;

    return {
        type: GlobalToastType.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const closeSnackbar = (key: any) => ({
    type: GlobalToastType.CLOSE_SNACKBAR,
    dismissAll: !key,
    key,
});

export const removeSnackbar = (key: any) => ({
    type: GlobalToastType.REMOVE_SNACKBAR,
    key,
});