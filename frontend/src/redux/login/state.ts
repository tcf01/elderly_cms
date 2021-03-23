export interface IUserInfo {
    id: number, username: string, role: number
}

export interface IAuthState {
    isAuthenticated: boolean | null;
    userInfo: IUserInfo
    msg: string;
    //呢到既msg就係指緊error.msg
}