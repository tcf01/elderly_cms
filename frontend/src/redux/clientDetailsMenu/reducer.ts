import { IClientDetailsState } from './state';

const initialState: IClientDetailsState = {
    basicMenuCollapse: true,
    drugListMenuCollapse: false,
    dailyDrugMenuCollapse: false,
    temperatureMenuCollapse: false,
}


export default function clientDetailsMenuReducer(state: IClientDetailsState = initialState, action: any): IClientDetailsState {
    switch (action.type) {
        case "@@clientDetails/BASIC_MENU":
            return {
                ...state,
                basicMenuCollapse: !state.basicMenuCollapse
            }
        case "@@clientDetails/DRUG_List_MENU":
            return {
                ...state,
                drugListMenuCollapse: !state.drugListMenuCollapse
            }
        case "@@clientDetails/DAILY_DRUG_MENU":
            return {
                ...state,
                dailyDrugMenuCollapse: !state.dailyDrugMenuCollapse
            }
        case "@@clientDetails/TEMPERATURE_MENU":
            return {
                ...state,
                temperatureMenuCollapse: !state.temperatureMenuCollapse
            }

        default:
            return state;
    }
}
