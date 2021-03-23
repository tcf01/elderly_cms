import {  Drug } from "./state";

export function loadPersonalDrugList(drugList:Drug[]){
    return({
        type: "@@drug/LOAD_DRUG_LIST" as "@@drug/LOAD_DRUG_LIST",
        drug: drugList
    })
}

export function updateDrugList(newDrug:Drug){
    return({
        type: "@@drug/UPDATE_DRUG_LIST" as "@@drug/UPDATE_DRUG_LIST",
        drug:newDrug
    })
}


type DrugListActions = typeof loadPersonalDrugList| typeof updateDrugList

export type IDrugListActions = ReturnType<DrugListActions>