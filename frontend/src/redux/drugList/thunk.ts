import { Dispatch } from "redux";
import { loadPersonalDrugList, IDrugListActions, updateDrugList } from "./actions"
import { DrugFormat } from "../../interface";
import { Drug } from "./state";

const { REACT_APP_API_SERVER } = process.env

export function remoteLoadDrugList(elderlyID: number) {
    return async (dispatch: Dispatch<IDrugListActions>) => {

        const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/get/${elderlyID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(res)
        const json = await res.json();
        console.log("DRUGLIST")
        console.log(json)
        if(json.result.length===0){
        dispatch(loadPersonalDrugList(json.result))
        }else{
            dispatch(loadPersonalDrugList(json.result.drug))
        }
    }
}

export function addDrugToDB(drug:DrugFormat){


    const formData = new FormData();
    formData.append('drug_name', drug.drug_name)
    formData.append('dose', drug.dose)
    formData.append('times_per_day', drug.times_per_day)
    formData.append('start_date', JSON.stringify(drug.start_date))
    formData.append('end_date', JSON.stringify(drug.end_date))
    formData.append('depend_on_need', JSON.stringify(drug.depend_on_need))
    formData.append('authorized_hospital', drug.authorized_hospital)
    formData.append('isOfficial', JSON.stringify(drug.isOfficial))
    formData.append('reason_of_taking', JSON.stringify(drug.reason_of_taking))
    formData.append('elderly_id', JSON.stringify(drug.elderly_id))
    formData.append('drugInterval', JSON.stringify(drug.drugInterval))
    formData.append('new_drug_pic', drug.file!)


    return async (dispatch: Dispatch) => {
        const res=await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/add/${drug.elderly_id}/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        const json=await res.json()
        console.log(json)
    
        if (json.isSuccess){
            const drugToBeAdded:Drug={...drug,drug_record_id:json.drug_record_id,drug_image:json.drug_image}
          dispatch(updateDrugList(drugToBeAdded))
        }
    }

}