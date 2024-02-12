import * as constant from '../constants/HotelioReviewConstant'


const initialValues = {
    loading: true,
    error: false,
    data: null,
}

const GetHotelioReviewReducer = (state = initialValues, action) => {
    switch (action.type) {
        case constant.CREATE_HOTELIOREVIEW_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case constant.CREATE_HOTELIOREVIEW_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case constant.CREATE_HOTELIOREVIEW_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}


export { GetHotelioReviewReducer }