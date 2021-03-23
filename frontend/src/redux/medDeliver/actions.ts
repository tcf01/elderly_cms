import { Dispatch } from 'redux';

const { REACT_APP_API_SERVER } = process.env

export const loadElderlyMedicine = () => {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/deliver/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const json = await res.json();
        console.log("json")
        console.log(json)
        dispatch(ElderlyMedicine(json.result))
    }
}


export const ElderlyMedicine = (drugNames: any[]) => {
    return {
        type: "@@medDeliver/GET_ALL_INFO",
        drugNames
    }
}




type MedicineDeliverCreators =   typeof ElderlyMedicine 

export type IMedDeliverActions = ReturnType<MedicineDeliverCreators>