import * as constant from '../constants/BookingConstant'


const initialValues = {
    loading: true,
    error: false,
    data: null,
    success: false
}

const GetBookingRegisterReducer = (state = initialValues, action) => {
    switch (action.type) {
        case constant.CREATE_BOOKING_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            }
        case constant.CREATE_BOOKING_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                data: action.payload
            }
        case constant.CREATE_BOOKING_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                success: false
            }

        default:
            return state;
    }
}


export { GetBookingRegisterReducer }