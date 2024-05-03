import * as constant from '../constants/SliderConstant'


const initialValues = {
    loading: true,
    error: false,
    data: null,
}

const GetAllSliderReducer = (state = initialValues, action) => {
    switch (action.type) {
        case constant.GET_ALL_SLIDER_API_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case constant.GET_ALL_SLIDER_API_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case constant.GET_ALL_SLIDER_API_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}


export { GetAllSliderReducer }