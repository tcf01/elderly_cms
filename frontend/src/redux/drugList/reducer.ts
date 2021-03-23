import { IDrugListState } from "./state";

const initialState = {
    drug: []
}

export function drugListReducer(state: IDrugListState = initialState, action: any) {
    switch (action.type) {
        case "@@drug/LOAD_DRUG_LIST":
            return {
                ...state,
                drug: action.drug
            }
        case "@@drug/UPDATE_DRUG_LIST":
            console.log("UPDATE_DRUG_LIST")
            console.log(state)
            const newDrugAdded=state.drug.slice()
            newDrugAdded.splice(0,0,action.drug)
            console.log(newDrugAdded)
            return {
                ...state,
                drug: newDrugAdded
            }
        default:
            return state;
    }
}
