import { IElderlyDrugRecordsState } from "./state";
import { IMedicineActions } from "./action";


const initialState = {
    elderlyDrugRecords: []
}

export const medicineReducer = (state: IElderlyDrugRecordsState = initialState, action: IMedicineActions): IElderlyDrugRecordsState => {
    switch (action.type) {
        case '@@medicine/GET_ALL_CLIENT_DRUG_RECORD':
            return {
                ...state,
                elderlyDrugRecords: action.elderlyDrugRecords,
            }
        case '@@medicine/UPDATE_CLIENT_DRUG_RECORD':
            const updatedResult = state.elderlyDrugRecords.slice().reduce((a, record) => {
                return a.concat({
                    ...record,
                    drug_basic_info: record.drug_basic_info.reduce((ac, info) => {
                        const newInfo = {
                            ...info,
                            drug_details: info.drug_details.slice().map((detail) => {
                                if (detail.drug_details_id === action.drugDetailId) {
                                    return ({
                                        ...detail,
                                        status_id: action.statusId
                                    })
                                }
                                return detail
                            })
                        }
                        return ac.concat(newInfo)
                    }, [] as any)
                })
            }, [] as any)

            return {
                ...state,
                elderlyDrugRecords: updatedResult
            }
        default:
            return state
    }

}