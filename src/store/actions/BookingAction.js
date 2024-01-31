import instance from '../_utils'
import * as constant from './../constants/BookingConstant'

export const GetBookingRegister = (formdata) => {
    console.log(formdata)
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_BOOKING_API_LOADING })
        try {
            const response = await instance.post("/hotel/book/create/pre-booking", formdata)
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_BOOKING_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_BOOKING_API_ERROR })
        }
    }
}