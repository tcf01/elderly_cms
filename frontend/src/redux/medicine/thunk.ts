import { getAllElderlyData, failed } from './action';
import { ThunkDispatch } from '../store';

const { REACT_APP_API_SERVER } = process.env


export function getAllClientMedicineRecord(){
    return async function(dispatch: ThunkDispatch){
        const response = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const responseJSON = await response.json();   
        if (responseJSON.isSuccess){
            dispatch(getAllElderlyData(responseJSON.result))
        }else{
            dispatch(failed("GET_LATEST_CLIENT_DATA_FAILED", responseJSON.msg))
        }
    }
}