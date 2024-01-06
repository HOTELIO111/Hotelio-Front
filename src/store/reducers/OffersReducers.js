import * as constant from '../constants/OfferConstant'


const initialValues = {
    loading: true,
    error: false,
    data: null,
    success: false
}

const GetBookingOffersReducers = (state = initialValues, action) => {
    switch (action.type) {
        case constant.GET_BOOKING_OFFER_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                success: false
            }
        case constant.GET_BOOKING_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: action.payload
            }
        case constant.GET_BOOKING_OFFER_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
            }

        default:
            return state
    }
}



export { GetBookingOffersReducers }