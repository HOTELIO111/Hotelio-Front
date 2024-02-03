import instance from '../_utils'
import * as constant from './../constants/OfferConstant'


export const GetBookingOffers = (hotelid, roomid, validFor) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_BOOKING_OFFER_LOADING })
        try {
            const query = new URLSearchParams({ hotelid: hotelid, roomid: roomid, validFor: validFor }).toString()
            const response = await instance.get(`/offers/get-offers/hotel?${query}`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_BOOKING_OFFER_SUCCESS, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_BOOKING_OFFER_ERROR })
        }
    }
}

