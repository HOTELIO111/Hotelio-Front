import * as constant from '../constants/BookingHistoryConstants'


const initialValues = {
    loading: true,
    error: false,
    data: null,
}

const GetBookingHistoryReducers = (state = initialValues, action) => {
    switch (action.type) {
        case constant.CREATE_BOOKINGHISTORY_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case constant.CREATE_BOOKINGHISTORY_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case constant.CREATE_BOOKINGHISTORY_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}


export { GetBookingHistoryReducers }