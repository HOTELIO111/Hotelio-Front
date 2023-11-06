import * as constant from "../constants/agentConstants";

const initialValues = {
  isLoading: false,
  isError: false,
  data: [],
};

const GetAgentSignupReducer = (state = initialValues, action) => {
  switch (action.type) {
    case constant.CREATE_AGENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.CREATE_AGENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case constant.CREATE_AGENT_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

const GetAgentLoginReducer = (state = initialValues, action) => {
  switch (action.type) {
    case constant.LOGN_AGENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case constant.LOGN_AGENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case constant.LOGN_AGENT_ERROR:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

export { GetAgentSignupReducer, GetAgentLoginReducer };
