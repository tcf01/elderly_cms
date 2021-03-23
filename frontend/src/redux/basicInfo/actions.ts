import { Dispatch } from 'redux';
import { BasicInfoFormat, Contact } from './state';

const { REACT_APP_API_SERVER } = process.env

//(1) 老人家個人資料 先fetch
export const fetchBasicInfo = (elderlyID:number) => {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/client/?elderlyId=${elderlyID}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const json = await res.json();
        dispatch(loadBasicInfo(json))
    }
}


export const loadBasicInfo = (basicInfoFromBackend: BasicInfoFormat[]) => {
    return {
        type: "@@clientDetails/LOAD_BASIC_INFO",
        basicInfoFromBackend
    }
}


//(2) 老人家「緊急聯絡人」 另外fetch
// export const fetchEmergencyContacts = (elderlyID:number) => {
//     return async (dispatch: Dispatch) => {
//         const res = await fetch(`${REACT_APP_API_SERVER}/client/emergency/${elderlyID}`,
//             {
//                 method: 'GET'
//             });
//         const json = await res.json();
//         dispatch(loadEmergencyContacts(json))
//     }
// }

// export const loadEmergencyContacts = (contactsFromBackend: Contact[]) => {
//     return {
//         type: "@@clientDetails/LOAD_EMERGENCY_CONTACTS",
//         contactsFromBackend
//     }
// }

//(3)改老人家資料
export const handleInfoChange = (basicInfo:any,key:string,value:string|number) => {
    return{
        type: "@@clientDetails/CHANGE_BASIC_INFO",
        newBasicInfo:{
                    ...basicInfo,
                    [key]:value
                    }
    }
}

//(4)改老人家聯絡人資料

export const handleContactsChange = (updatedContacts:Contact[]) => {
    return{
        type: "@@clientDetails/CHANGE_EMERGENCY_CONTACTS",
        updatedContacts
        }
}


export const saveEditedInfo =async(updatedInfo: BasicInfoFormat, updatedContacts:Contact[])=>{
    console.log("saveEditedInfo")
    const elderlyID=updatedInfo.elderly_id;
    console.log(elderlyID)
    
    await fetch(`${REACT_APP_API_SERVER}/user/staff/client/${elderlyID}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify( {updatedInfo, updatedContacts})
            }); 
    console.log("await finish")    
    
}


//GET ALL DRUGS 拎晒所有藥名

export const getAllDrugNames = () =>{
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/user/staff/medicine/getAllNames/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const json = await res.json();
        const drugNames=json.map((item:{name:string})=> item.name)
        dispatch(loadAllDrugNames(drugNames))
    }
}

export const loadAllDrugNames = (drugNames: string[]) => {
    return {
        type: "@@clientCentre/GET_ALL_DRUGS",
        drugNames
    }
}




type BasicInfoCreators =   typeof loadBasicInfo | 
                           typeof loadAllDrugNames |
                           typeof handleInfoChange |
                           typeof handleContactsChange 

export type IBasicInfoActions = ReturnType<BasicInfoCreators>