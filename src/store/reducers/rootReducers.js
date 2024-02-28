import { combineReducers } from "redux";
import { GetSearchedHotelsReducers, GetSingleHotelReducers, GetHotelBillCalculationReducers } from "./hotelReducers";
import {
  GetAgentSignupReducer,
  GetAgentLoginReducer,
} from "../reducers/agentReducers";
import { GetAllRoomTypReducer } from "./roomCategoriesReducers";
import { GetALlPopularLocationReducer } from "./locationsReducers";
import { GetAllBookingOffersReducers, GetBookingOffersReducers } from "./OffersReducers";
import { GetBookingRegisterReducer } from "./BookingReducers";
import { GetBookingHistoryReducers } from "./BookingHistoryReducers"
import { GetContactUsReducer } from "./ContactUsReducers"
import { GetHotelioReviewReducer } from "./HotelioReviewReducer"
import { GetAllFavouriteReducer } from "./favouriteReducers";
import { GetAllRecommendedReducer } from "./recommendedReducers";

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
  GetContactUsReducer,
  GetHotelioReviewReducer,
  GetAllFavouriteReducer,
  GetAllBookingOffersReducers,
  GetAllRecommendedReducer
});

export default rootReducers;
