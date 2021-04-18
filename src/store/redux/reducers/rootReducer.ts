import { combineReducers } from "redux";
import { GlobalToastReducer } from "@/store/redux/reducers/GlobalToastReducer";
import { GlobalModalReducer } from "@/store/redux/reducers/GlobalModalReducer";

const rootReducer = combineReducers({
  globalToast: GlobalToastReducer,
  globalModal: GlobalModalReducer,
});

export default rootReducer;
