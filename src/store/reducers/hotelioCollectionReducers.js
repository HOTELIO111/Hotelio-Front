import * as constant from '../constants/hotelioCollectionConstants'


const initialValues = {
    loading: true,
    error: false,
    data: null,
}

const GetAllCollectionReducer = (state = initialValues, action) => {
    switch (action.type) {
        case constant.GET_ALL_COLLECTION_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case constant.GET_ALL_COLLECTION_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case constant.GET_ALL_COLLECTION_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}


export { GetAllCollectionReducer }