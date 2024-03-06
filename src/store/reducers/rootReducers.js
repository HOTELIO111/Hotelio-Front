import { combineReducers } from "redux";
import { GetSearchedHotelsReducers, GetSingleHotelReducers, GetHotelBillCalculationReducers } from "./hotelReducers";
import { GetAgentSignupReducer, GetAgentLoginReducer, } from "../reducers/agentReducers";
import { GetAllRoomTypReducer } from "./roomCategoriesReducers";
import { GetALlPopularLocationReducer } from "./locationsReducers";
import { GetAllBookingOffersReducers, GetBookingOffersReducers } from "./OffersReducers";
import { GetBookingRegisterReducer } from "./BookingReducers";
import { GetBookingHistoryReducers } from "./BookingHistoryReducers"
import { GetContactUsReducer } from "./ContactUsReducers"
import { GetHotelioReviewReducer, GetHotelioSingleReviewReducer } from "./HotelioReviewReducer"
import { GetAllFavouriteReducer } from "./favouriteReducers";
import { GetAllRecommendedReducer } from "./recommendedReducers";
import { GetAllCollectionReducer } from "./hotelioCollectionReducers";
import { GetAllSliderReducer } from "./SliderReducer";

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
  GetHotelioSingleReviewReducer,
  GetAllFavouriteReducer,
  GetAllBookingOffersReducers,
  GetAllRecommendedReducer,
  GetAllCollectionReducer,
  GetAllSliderReducer
});

export default rootReducers;
