import { ISideBarState } from "./state";
import { ISideBarActions } from "./action";

const initialState = {
    isOpen: false
}

export default function sideBarReducer(state: ISideBarState = initialState, action: ISideBarActions): ISideBarState {
    switch(action.type) {
        case '@@sidebar/TOGGLE':
            return {
                ...state,
                isOpen: !state.isOpen
            }
    }
    return state
}
