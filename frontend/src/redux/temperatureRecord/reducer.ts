import { IClientState } from "./state";
import { IClientActions } from "./actions";

const initialState: IClientState = {
    clientName: [{
        bed_number: 0,
        name_chi: ""
    }]
}

export function clientReducer(state: IClientState = initialState, action: IClientActions): IClientState {
    switch (action.type) {
        case "@@client/LOADCLIENTS":
            return {
                ...state,
                clientName: action.client
            }
        default:
            return state;
    }
}