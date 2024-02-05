import * as constant from '../constants/BookingConstant'


const initialValues = {
    loading: true,
    error: false,
    data: null,
}

const GetBookingRegisterReducer = (state = initialValues, action) => {
    switch (action.type) {
        case constant.CREATE_BOOKING_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case constant.CREATE_BOOKING_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case constant.CREATE_BOOKING_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}


export { GetBookingRegisterReducer }