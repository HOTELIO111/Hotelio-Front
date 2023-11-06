import { combineReducers } from "redux";
import { GetSearchedHotelsReducers } from "./hotelReducers";
import {
  GetAgentSignupReducer,
  GetAgentLoginReducer,
} from "../reducers/agentReducers";

const rootReducers = combineReducers({
  GetSearchedHotelsReducers,
  GetAgentSignupReducer,
  GetAgentLoginReducer,
});

export default rootReducers;
