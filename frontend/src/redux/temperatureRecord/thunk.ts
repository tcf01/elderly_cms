import { Dispatch } from "redux";
import { IClientActions, loadClient } from "./actions";

const { REACT_APP_API_SERVER } = process.env

export function remoteLoadClient() {
    return async (dispatch: Dispatch<IClientActions>) => {
        console.log("/user/staff/temperature")
        const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/temperature`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const json = await res.json()
        dispatch(loadClient(json.result))
    }
}