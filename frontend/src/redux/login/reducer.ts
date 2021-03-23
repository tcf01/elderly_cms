import { IAuthState, IUserInfo } from './state';
import { IAuthActions } from './actions';

const initialState = {
    isAuthenticated: null,
    userInfo: {} as IUserInfo,
    // isAuthenticated: (localStorage.getItem('token') != null),
    msg: ""
}

export function authReducer(state: IAuthState = initialState, action: IAuthActions): IAuthState {
    switch (action.type) {
        case "@@auth/LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                userInfo: action.userInfo,
                msg: ""
            }
        case "@@auth/LOGIN_FAILED":
            return {
                ...state,
                msg: action.msg
            }
        case "@@auth/LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                msg: ""
            }

        case "@@auth/GET_USER_SUCCESS":
                return {
                    ...state,
                    isAuthenticated: true,
                    userInfo: { 
                        ...state.userInfo, 
                        role: action.user.role_id,
                        id: action.user.id
                    }
                }            
        default:
            return state;
    }
}