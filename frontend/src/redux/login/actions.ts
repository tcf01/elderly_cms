import { IUserInfo } from "./state"

export function restoreLogin(user: any){
    return ({
        type: "@@auth/GET_USER_SUCCESS" as "@@auth/GET_USER_SUCCESS",
        user
    })
}

export function restoreLoginFailed(){
    return ({
        type: "@@auth/GET_USER_FAILED" as "@@auth/GET_USER_FAILED",
        
    })
}

export function loginSuccess(userInfo: IUserInfo){
    return ({
        type: "@@auth/LOGIN" as "@@auth/LOGIN",
        userInfo
    })
}

export function loginFailed(msg: string){
    return ({
        type: "@@auth/LOGIN_FAILED" as "@@auth/LOGIN_FAILED",
        msg
    })
}

export function logoutSuccess(){
    return ({
        type: "@@auth/LOGOUT" as "@@auth/LOGOUT"
    })
}



type AuthActionsCreators = typeof restoreLoginFailed | typeof restoreLogin | typeof loginSuccess | typeof loginFailed | typeof logoutSuccess

export type IAuthActions = ReturnType<AuthActionsCreators> 