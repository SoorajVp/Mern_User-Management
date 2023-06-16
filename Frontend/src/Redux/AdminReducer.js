import { ADMIN_LOGIN_SUCCESS } from "./Constants";

export const adminLoginReducer  = ( state = {}, action ) => {
    switch (action.type) {

        case ADMIN_LOGIN_SUCCESS:
            return { loggedIn: true };

        default:
            return state;

    }
} 