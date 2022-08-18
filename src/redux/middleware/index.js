import { applyMiddleware } from "redux";
import Thunk from "redux-thunk";

export default applyMiddleware(Thunk);