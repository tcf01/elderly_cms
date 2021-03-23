import { IPerMedicineRecordCard } from "../packMedicine/state";

export function getAllElderlyData(elderlyDrugRecords: Array<IPerMedicineRecordCard>){
    return ({
        type: '@@medicine/GET_ALL_CLIENT_DRUG_RECORD' as '@@medicine/GET_ALL_CLIENT_DRUG_RECORD',
        elderlyDrugRecords
        })
}


export function updateElderlyData(drugDetailId: number, statusId: number) {
    return ({
        type: '@@medicine/UPDATE_CLIENT_DRUG_RECORD' as '@@medicine/UPDATE_CLIENT_DRUG_RECORD',
        statusId,
        drugDetailId
    })
}


export function failed(type: FAILED,msg: string){
    return ({
        type,
        msg
    })
}

type FAILED = "GET_LATEST_CLIENT_DATA_FAILED" | 'GET_INDIVIDUAL_DRUG_RECORD_FAILED'

type medicineActionCreator = typeof getAllElderlyData | typeof failed | typeof updateElderlyData
export type IMedicineActions = ReturnType<medicineActionCreator>

