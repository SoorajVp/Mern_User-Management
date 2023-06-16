import { IMAGE_UPLOAD, USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./Constants";

export const userLoginReducer  = ( state = {}, action ) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: true, userInfo: action.payload };
        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return { };
        default:
            return state;
    }
} 

export const imageUploadReducer  = ( state = {}, action ) => {
    switch (action.type) {
        case IMAGE_UPLOAD:
            return { userImage: action.payload };
        default:
            return state;
    }
} 