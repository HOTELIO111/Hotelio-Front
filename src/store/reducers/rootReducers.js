import { combineReducers } from "redux";
import { GetSearchedHotelsReducers, GetSingleHotelReducers, GetHotelBillCalculationReducers } from "./hotelReducers";
import {
  GetAgentSignupReducer,
  GetAgentLoginReducer,
} from "../reducers/agentReducers";
import { GetAllRoomTypReducer } from "./roomCategoriesReducers";
import { GetALlPopularLocationReducer } from "./locationsReducers";
import { GetBookingOffersReducers } from "./OffersReducers";
import { GetBookingRegisterReducer } from "./BookingReducers";
import { GetBookingHistoryReducers } from "./BookingHistoryReducers"
import {GetContactUsReducer} from "./ContactUsReducers"

const rootReducers = combineReducers({
  GetSearchedHotelsReducers,
  GetAgentSignupReducer,
  GetAgentLoginReducer,
  GetAllRoomTypReducer,
  GetALlPopularLocationReducer,
  GetBookingOffersReducers,
  GetBookingRegisterReducer,
  GetSingleHotelReducers,
  GetHotelBillCalculationReducers,
  GetBookingHistoryReducers,
  GetContactUsReducer
});

export default rootReducers;
