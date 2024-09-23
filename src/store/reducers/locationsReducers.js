import * as constant from "../constants/locationConstants";

const initialState = {
  loading: true,
  error: false,
  data: null,
};

const GetALlPopularLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.LOCATION_GET_API_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case constant.LOCATION_GET_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case constant.LOCATION_GET_API_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        data: null,
      };

    default:
      return state;
  }
};

export { GetALlPopularLocationReducer };
