import { IClientCardState } from './state';

const initialState: IClientCardState = {
    cards: [{
        id: 1,
        image: "https://tecky.io/static/5c34d478deea05c34c712a2522michael-5c72c3f7590beb6316486bd469587a3d.jpg",
        name_chi: "黃夏蕙",
        birth_date: "1950-1-1",
        bed_number: 1,
        emergency_contact_people_name: "吳鎮宇",  
        emergency_contact_people_telephone: 65842681
    }]

}


export default function clientCardReducer(state: IClientCardState = initialState, action: any): IClientCardState {
    switch (action.type) {
        case "@@clientCentre/LOAD_CARD":
            return {
                ...state,
                cards: action.clientCardFromBackend
            }
        default:
            return state
    }
}
