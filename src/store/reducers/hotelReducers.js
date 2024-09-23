import * as constant from "./../constants/hotelConstant";

const initialState = {
  isError: false,
  isLoading: false,
  data: null,
  isSuccess: false,
};

const GetSearchedHotelsReducers = (state = initialState, action) => {
  switch (action.type) {
    case constant.HOTEL_GET_API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.HOTEL_GET_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isSuccess: true,
      };
    case constant.HOTEL_GET_API_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };

    default:
      return state;
  }
};

const GetSingleHotelReducers = (state = initialState, action) => {
  switch (action.type) {
    case constant.GET_SINGLEHOTEL_API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.GET_SINGLEHOTEL_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isSuccess: true,
      };
    case constant.GET_SINGLEHOTEL_API_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };

    default:
      return state;
  }
};

const GetHotelBillCalculationReducers = (state = initialState, action) => {
  switch (action.type) {
    case constant.GET_HotelBillCalculation_API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.GET_HotelBillCalculation_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isSuccess: true,
      };
    case constant.GET_HotelBillCalculation_API_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };

    default:
      return state;
  }
};



export { GetSearchedHotelsReducers, GetSingleHotelReducers, GetHotelBillCalculationReducers };
