
export const basicMenuToggle = () => {
    return  {
            type: "@@clientDetails/BASIC_MENU",
        }
    }

export const drugListMenuToggle = () => {
    return {
            type: "@@clientDetails/DRUG_List_MENU",
        }
    }


export const dailyDrugMenuToggle = () => {
    return {
            type: "@@clientDetails/DAILY_DRUG_MENU",
        }
    }

export const temperatureMenuToggle = () => {
    return {
            type: "@@clientDetails/TEMPERATURE_MENU",
        }
    }


type ClientDetailsCreators = 
    typeof basicMenuToggle |
    typeof drugListMenuToggle |
    typeof dailyDrugMenuToggle |
    typeof temperatureMenuToggle 

export type IClientDetailsActions = ReturnType<ClientDetailsCreators>