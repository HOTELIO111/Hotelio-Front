import instance from '../_utils'
import * as constant from './../constants/OfferConstant'


export const GetBookingOffers = (hotelid, roomid, validFor, roomType) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_BOOKING_OFFER_LOADING })
        try {
            const query = new URLSearchParams({ hotelid: hotelid, roomid: roomid, validFor: validFor, roomType: roomType }).toString()
            const response = await instance.get(`/offers/get-offers/hotel?${query}`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_BOOKING_OFFER_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_BOOKING_OFFER_ERROR })
        }
    }
}

export const GetAllBookingOffers = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_OFFER_API_LOADING })
        try {
            const response = await instance.get(`/offers/get-offers`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_OFFER_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_OFFER_API_ERROR })
        }
    }
}
