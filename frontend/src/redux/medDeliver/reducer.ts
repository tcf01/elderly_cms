import { IMedDeliverState } from './state';

const initialState: IMedDeliverState = {
    result: [{
        time: "1400",
        date: "2019-9-3",
        elderly: [{
            elderly_id: 1,
            name: "Michael",
            image: undefined,
            bed_number: 33,
            medicine: [{
                drug_name: "Panadol",
                drug_image: undefined,
                dose: "1粒",
                isOfficial: true,
                reason_of_taking: undefined,
                drug_details_id: 0
            }]
        }
        ]
    }]
}

export default function medDeliverReducer(state: IMedDeliverState = initialState, action: any): IMedDeliverState {
    switch (action.type) {
        case "@@medDeliver/GET_ALL_INFO":
            return {
                ...state,
                result: action.drugNames
            }

        default:
            return state;
    }
}
