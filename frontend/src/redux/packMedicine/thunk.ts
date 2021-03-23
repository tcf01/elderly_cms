import { failed, getOneElderlyDrugRecords, updateBackendDrugStatus } from './action';
import { ThunkDispatch } from '../store';
import { updateElderlyData } from '../medicine/action';
const { REACT_APP_API_SERVER } = process.env




export function getOneClientMedicineRecord(id: number){
    return async function(dispatch: ThunkDispatch){
        const response = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine?elderlyId=${id}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const responseJSON = await response.json();
        if (responseJSON.isSuccess){
            console.log(responseJSON.result)
            dispatch(getOneElderlyDrugRecords(responseJSON.result[0]))
        }else{
            dispatch(failed('GET_INDIVIDUAL_DRUG_RECORD_FAILED', responseJSON.msg))
        }
    }
}

export function updateDrugStatus(drugDetailId: number,drugRecentStage: number){
    console.log("射入thunk既:", drugDetailId, drugRecentStage)
    return async function(dispatch: ThunkDispatch){
        const response = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine`,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                drugDetailId,
                drugRecentStage
            })
        })
        const responseJSON = await response.json();
        console.log("backend出番黎既drug_record_id同埋status_id", responseJSON.result)
        if (responseJSON.isSuccess){
            dispatch(updateBackendDrugStatus(responseJSON.result[0]))
            dispatch(updateElderlyData(drugDetailId, responseJSON.result[0].status_id))
        }else{
            dispatch(failed('UPDATE_DRUG_RECENT_STATUS_FAILED', responseJSON.msg))
        }
    }
} 


