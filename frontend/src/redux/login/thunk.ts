import { Dispatch } from "redux";
import { IAuthActions, loginSuccess, loginFailed, logoutSuccess, restoreLoginFailed, restoreLogin } from "./actions";
import { push, CallHistoryMethodAction } from "connected-react-router";


const { REACT_APP_API_SERVER } = process.env

export function getCurrentUser() {
    return async (dispatch: Dispatch<IAuthActions | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/auth`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        const user = await res.json();
        console.log('login完會有咩睇',user);

        if (user) {
            dispatch(restoreLogin(user[0]))
        } else {
            localStorage.clear()
            dispatch(restoreLoginFailed())
            // if (loginInfo.userInfo.role === 3){
            //     dispatch(loginSuccess(loginInfo.userInfo));
            //     dispatch(push('/register'))
            // }else{
            //     dispatch(loginSuccess(loginInfo.userInfo));
            //     dispatch(push('/client'))
            // }
        }
    }
}

export function login(username: string, password: string) {
    return async (dispatch: Dispatch<IAuthActions | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username, password })
        });

        const loginInfo = await res.json();
        console.log('login完會有咩睇',loginInfo);

        if (res.status !== 200) {
            dispatch(loginFailed(loginInfo.msg));
        } else {
            localStorage.setItem('token',loginInfo.token);
            localStorage.setItem('username',loginInfo.userInfo.username);
            if (loginInfo.userInfo.role === 3){
                dispatch(loginSuccess(loginInfo.userInfo));
                dispatch(push('/register'))
            }else{
                dispatch(loginSuccess(loginInfo.userInfo));
                dispatch(push('/client'))
            }
        }
    }
}

export function logout() {
    return async (dispatch: Dispatch<IAuthActions | CallHistoryMethodAction>) => {
        localStorage.removeItem('token')
        dispatch(logoutSuccess())
        dispatch(push('/'))
    }
}