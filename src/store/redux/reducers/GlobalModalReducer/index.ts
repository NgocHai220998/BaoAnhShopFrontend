import GlobalModalType, { IGlobalModalState } from "@/store/redux/types/GlobalModal";

const defaultState: IGlobalModalState = {
  isOpen: false,
  isClose: true,
  children: "",
};

export const GlobalModalReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GlobalModalType.IS_OPEN:
      return {
        ...state,
        isOpen: true,
        isClose: false,
        children: action.payload,
      };
    case GlobalModalType.IS_CLOSE:
      return {
        ...state,
        isOpen: false,
        isClose: true,
      };
    default:
      return state;
  }
};
