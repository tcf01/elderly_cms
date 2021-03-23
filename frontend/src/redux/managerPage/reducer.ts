import { IStaffActions } from "./actions";
import { IStaffState } from "./state";

const initialState: IStaffState = {
    staff: []
}

export function staffReducer(state: IStaffState = initialState, action: IStaffActions): IStaffState {
    switch (action.type) {
        case "@@staff/LOADSTAFFS":
            return {
                ...state,
                staff: action.staff
            }
        default:
            return state;
    }
}