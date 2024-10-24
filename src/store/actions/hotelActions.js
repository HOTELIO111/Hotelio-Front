import instance from "../_utils";
import * as constant from "../constants/hotelConstant";

export const GetSearchedHotel = (query) => {
  return async (dispatch) => {
    try {
      dispatch({ type: constant.HOTEL_GET_API_LOADING });
      const response = await instance.get(`/hotel/search?${query}`);
      if (response.status === 200) {
        dispatch({
          type: constant.HOTEL_GET_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: constant.HOTEL_GET_API_ERROR });
    }
  };
};


export const GetSingleHotel = (hotelid) => {
  return async (dispatch) => {
    dispatch({ type: constant.GET_SINGLEHOTEL_API_LOADING })
    try {
      const response = await instance.get(`/hotel/hoteldetails/${hotelid}`)
      if (response.status === 200) {
        dispatch({ type: constant.GET_SINGLEHOTEL_API_SUCCESS, payload: response.data.data })
      }
    } catch (error) {
      dispatch({ type: constant.GET_SINGLEHOTEL_API_ERROR })
    }
  }
}

export const GetHotelBillCalculation = (billingQuery) => {
  return async (dispatch) => {
    dispatch({ type: constant.GET_HotelBillCalculation_API_LOADING })
    try {
      const response = await instance.get(`/hotel/book/calculate/bill?${billingQuery}`)
      if (response.status === 200) {
        dispatch({ type: constant.GET_HotelBillCalculation_API_SUCCESS, payload: response.data })
      }
    } catch (error) {
      dispatch({ type: constant.GET_HotelBillCalculation_API_ERROR })
    }
  }
}

// 
