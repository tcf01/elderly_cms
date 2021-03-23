import { Dispatch } from "redux"
import { loadStaffDetail, IStaffActions } from "./actions"

const { REACT_APP_API_SERVER}=process.env

export function loadStaff(){
    return async (dispatch:Dispatch<IStaffActions>) => {
        const res = await fetch (`${REACT_APP_API_SERVER}/user/staff/management`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const json = await res.json()
        console.log('jgubugjuh',json.detail)
        dispatch(loadStaffDetail(json.detail))
    }
}