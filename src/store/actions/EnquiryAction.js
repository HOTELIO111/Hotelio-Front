
import instance from '../_utils'
import * as constant from './../constants/EnquiryConstant'

export const GetHotelioEnquiry = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_ENQUIRY_API_LOADING })
        try {
            const response = await instance.post("/enquiry/create", formdata)
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_ENQUIRY_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_ENQUIRY_API_ERROR })
        }
    }
}