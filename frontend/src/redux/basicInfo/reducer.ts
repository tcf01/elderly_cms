import { IBasicInfoState } from './state';


const initialState: IBasicInfoState = {
    basicInfo: {
        elderly_id: 0,
        name_chi: "",
        name_eng: "",
        gender: "",
        birth_date: "",
        id_card_number: "",
        telephone: 0,
        address: "",
        past_job: "",
        edu_level: "",
        status: "",
    },
    contacts: [],
    drugNames: []
}


export default function basicInfoReducer(state: IBasicInfoState = initialState, action: any): IBasicInfoState {
    switch (action.type) {
        case "@@clientDetails/LOAD_BASIC_INFO":
            return {
                ...state,
                basicInfo: action.basicInfoFromBackend.result.basicInfo,
                contacts: action.basicInfoFromBackend.result.contacts
            }
    
        case "@@clientDetails/CHANGE_BASIC_INFO":
            return {
                ...state,
                basicInfo: action.newBasicInfo
            }
        case "@@clientDetails/CHANGE_EMERGENCY_CONTACTS":
            return {
                ...state,
                contacts: action.updatedContacts
            }

        case "@@clientdetails/GET_ALL_DRUGS":
            return {
                ...state,
                drugNames: action.drugNames
            }

        default:
            return state;
    }
}
