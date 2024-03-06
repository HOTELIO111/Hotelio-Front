
import instance from '../_utils'
import * as constant from './../constants/SliderConstant'

export const GetAllSliderAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_SLIDER_API_LOADING })
        try {
            const response = await instance.get(`/slider/get-in-slider`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_SLIDER_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_SLIDER_API_ERROR })
        }
    }
}