import { IElderlyIndividualDrugRecordsState, IPerMedicineRecordCard} from "./state";
import { IPerMedicineActions } from "./action";


const initialState = {
    elderlyIndividualDrugRecord: {} as IPerMedicineRecordCard ,
    drug_detail_status_storage: []
}

export const individualMedicineReducer = (state: IElderlyIndividualDrugRecordsState = initialState, action: IPerMedicineActions) : IElderlyIndividualDrugRecordsState=> {
    switch (action.type) {
        case '@@medicine/GET_INDIVIDUAL_DRUG_RECORD':
            return {
                ...state,
                elderlyIndividualDrugRecord: action.elderlyIndividualDrugRecord
            }
        case '@@medicine/UPDATE_DRUG_RECENT_STATUS':
            const updatedResult  = state.drug_detail_status_storage.map((data) => {
                if (data.drugDetailId === action.drug_individual_detail_status.drugDetailId){
                    return ({
                        ...data,
                        drugRecentStage: action.drug_individual_detail_status.drugRecentStage
                    })
                }
                   
                return data
            })

            return { 
                ...state,
                drug_detail_status_storage: updatedResult
            }
        default:
            return state
    }

}
