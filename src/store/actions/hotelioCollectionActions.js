
import instance from '../_utils'
import * as constant from './../constants/hotelioCollectionConstants'

export const GetAllCollectionAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.GET_ALL_COLLECTION_API_LOADING })
        try {
            const response = await instance.get(`/property-type/get-collections`)
            if (response.status === 200) {
                dispatch({ type: constant.GET_ALL_COLLECTION_API_SUCCESS, payload: response.data })
            }
        } catch (error) {
            dispatch({ type: constant.GET_ALL_COLLECTION_API_ERROR })
        }
    }
}