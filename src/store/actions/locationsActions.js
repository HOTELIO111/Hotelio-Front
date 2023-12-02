import instance from "../_utils";
import * as constant from "../constants/locationConstants";

export const GetPopularLocationAction = () => {
  return async (dispatch) => {
    dispatch({ type: constant.LOCATION_GET_API_LOADING });
    try {
      const response = await instance.get("/popular-location/getall");
      if (response.status === 200) {
        dispatch({
          type: constant.LOCATION_GET_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: constant.LOCATION_GET_API_ERROR });
    }
  };
};
