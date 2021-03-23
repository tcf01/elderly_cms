import { IPerMedicineRecordCard, IDrugDetailStatus } from "./state";


export function getOneElderlyDrugRecords(elderlyIndividualDrugRecord: IPerMedicineRecordCard){
    return ({
        type: '@@medicine/GET_INDIVIDUAL_DRUG_RECORD' as '@@medicine/GET_INDIVIDUAL_DRUG_RECORD',
        elderlyIndividualDrugRecord
        })
}

export function updateBackendDrugStatus(drug_individual_detail_status: IDrugDetailStatus){
    return ({
        type: '@@medicine/UPDATE_DRUG_RECENT_STATUS' as '@@medicine/UPDATE_DRUG_RECENT_STATUS',
        drug_individual_detail_status
        })
}



export function failed(type: FAILED,msg: string){
    return ({
        type,
        msg
    })
}

type FAILED =  'GET_INDIVIDUAL_DRUG_RECORD_FAILED' | 'UPDATE_DRUG_RECENT_STATUS_FAILED'

type individualMedicineRecordCreator = typeof getOneElderlyDrugRecords | typeof failed | typeof updateBackendDrugStatus
export type IPerMedicineActions = ReturnType<individualMedicineRecordCreator>

