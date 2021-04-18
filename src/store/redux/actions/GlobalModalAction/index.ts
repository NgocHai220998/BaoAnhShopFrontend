import GlobalModalType from "@/store/redux/types/GlobalModal";

export const openModal = (payload: any) => ({
  type: GlobalModalType.IS_OPEN,
  payload,
});

export const closeModal = () => ({
  type: GlobalModalType.IS_CLOSE,
});
