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
