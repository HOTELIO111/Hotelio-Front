
import instance from '../_utils'
import * as constant from './../constants/favouriteConstants'

export const GetAllFavouriteAction = (customerId) => {
    console.log(customerId)
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_FAVOURITE_API_LOADING })
        try {
            const response = await instance.get(`/api/favourite/get/${customerId}`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_FAVOURITE_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_FAVOURITE_API_ERROR })
        }
    }
}