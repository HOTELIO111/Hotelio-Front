import instance from "../_utils";
import * as constant from "./../constants/roomCategoriesConstant";

export const GetAlltheRoomTypes = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: constant.GET_ROOMS_ALL_API_LOADING });
      const response = await instance.get(`/roomtype/get`);
      if (response.status === 200) {
        dispatch({
          type: constant.GET_ROOMS_ALL_API_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: constant.GET_ROOMS_ALL_API_ERROR });
    }
  };
};
