import instance from "../_utils";
import * as constant from "./../constants/BookingHistoryConstants";

export const GetBookingHistoryAction = (customerid) => {
  const sortby = Object.fromEntries(new URLSearchParams(document.location.search)?.entries()).sortby;
  return async (dispatch) => {
    dispatch({ type: constant.CREATE_BOOKINGHISTORY_API_LOADING });
    try {
      const response = await instance.get(`/api/booking/${customerid}/?sortby=${sortby}`);
      if (response.status === 200) {
        dispatch({
          type: constant.CREATE_BOOKINGHISTORY_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: constant.CREATE_BOOKINGHISTORY_API_ERROR });
    }
  };
};
