
import instance from '../_utils'
import * as constant from './../constants/HotelioReviewConstant'

export const GetSingleHotelioReview = (hotelid) => {
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_HOTELIOSINGLEREVIEW_API_LOADING })
        try {
            const response = await instance.get(`/reviews/get/hotel/${hotelid}`)
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_HOTELIOSINGLEREVIEW_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_HOTELIOSINGLEREVIEW_API_ERROR })
        }
    }
}

export const GetHotelioReview = () => {
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_LOADING })
        try {
            const response = await instance.get("/reviews/timeline/get")
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_ERROR })
        }
    }
}

export const CreateHotelioReview = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_LOADING })
        try {
            const response = await instance.post("/reviews/create", formdata)
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_HOTELIOREVIEW_API_ERROR })
        }
    }
}