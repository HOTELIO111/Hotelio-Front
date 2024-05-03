
import instance from '../_utils'
import * as constant from './../constants/ContactUsConstant'

export const GetHotelioContact = (formdata) => {
    return async (dispatch) => {
        dispatch({ type: constant.CREATE_CONTACTUS_API_LOADING })
        try {
            const response = await instance.post("/contact/create", formdata)
            if (response.status === 200) {
                dispatch({ type: constant.CREATE_CONTACTUS_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.CREATE_CONTACTUS_API_ERROR })
        }
    }
}