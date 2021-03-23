import { Dispatch } from "redux";
import { RegistrationFormat } from "../../components/registration/Registration";

const { REACT_APP_API_SERVER } = process.env

//GET AllClient
export function fetchClientCards() {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/client`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
        const json = await res.json();
        dispatch(loadClientCards(json))
    }
}

export const loadClientCards = (clientCardFromBackend: any[]) => {
    return {
        type: "@@clientCentre/LOAD_CARD",
        clientCardFromBackend
    }
}


//ADD NewClient
// export function submitRegistration(info:RegistrationFormat) {

//     return async () => {
//     await fetch(`${REACT_APP_API_SERVER}/user/familyMembers/register`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     // "Authorization": `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify( info )
//             });
//     }
// }

//Testing for Multer
export function submitRegistration(info: RegistrationFormat) {
    localStorage.setItem('name_chi', info.name_chi)
    localStorage.setItem('name_eng', info.name_eng)
    localStorage.setItem('gender', info.gender)
    localStorage.setItem('birth_date', info.birth_date)
    localStorage.setItem('id_card_number', info.id_card_number)
    localStorage.setItem('telephone', info.telephone!.toString())
    localStorage.setItem('emergency_contact_telephone', info.emergency_contact[0].telephone.toString())
    localStorage.setItem('emergency_contact', info.emergency_contact[0].name)
    localStorage.setItem('emergency_id', info.emergency_contact[0].id_card_number)
    localStorage.setItem('emergency_relation', info.emergency_contact[0].relation_with_elderly)
    localStorage.setItem('check_in_date', info.check_in_date)
    localStorage.setItem('address', info.address)

    const formData = new FormData();
    formData.append('name_chi', info.name_chi)
    formData.append('name_eng', info.name_eng)
    formData.append('gender', info.gender)
    formData.append('birth_date', info.birth_date)
    formData.append('id_card_number', info.id_card_number)
    formData.append('telephone', info.telephone!.toString())
    formData.append('check_in_date', info.check_in_date)
    formData.append('address', info.address)
    formData.append('past_job', info.past_job)
    formData.append('edu_level', info.edu_level)
    formData.append('status', info.status)
    formData.append('emergency_contact', JSON.stringify(info.emergency_contact))
    formData.append('elderly_profile_pic', info.file!)


    return async () => {
        await fetch(`${REACT_APP_API_SERVER}/user/familyMembers/register`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
    }
}


export type ClientCardsCreators = typeof loadClientCards
export type IClientCards = ReturnType<ClientCardsCreators>



