import * as constant from "./../constants/roomCategoriesConstant";

const initialValues = {
  isLoading: false,
  isError: false,
  data: [],
};

const GetAllRoomTypReducer = (state = initialValues, action) => {
  switch (action.type) {
    case constant.GET_ROOMS_ALL_API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.GET_ROOMS_ALL_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case constant.GET_ROOMS_ALL_API_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export { GetAllRoomTypReducer };
