
import instance from '../_utils'
import * as constant from './../constants/recommendedConstants'

export const GetAllRecommendationAction = (customerId) => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_RECOMMENDATION_API_LOADING })
        try {
            const response = await instance.get(`/api/set/recommend/${customerId}`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_RECOMMENDATION_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_RECOMMENDATION_API_ERROR })
        }
    }
}