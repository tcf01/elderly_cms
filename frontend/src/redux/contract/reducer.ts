import { IContractState } from "./state";
import { IContractActions } from "./actions";

const initialState = {
    content: {basicContract: "",
        additionContract:""}
}

export function contractReducer(state: IContractState = initialState, action: IContractActions) {
    switch (action.type) {
        case "@@contract/LOADCONTRACT":
            return {
                ...state,
                content: action.contract
            }
        default:
            return state;
    }
}
