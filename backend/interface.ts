// export interface Procedure{
//     procedure: "not_yet_handled" | "packed" | "checked" | "delivered"
// }

export enum Procedure {
     "not_yet_handled" = 1,
     "packed" = 2,
     "checked" = 3,
     "delivered" = 4
}

export interface RegistrationFormat {
     name_chi: string,
     name_eng: string,
     image?: string;

     gender: string,
     birth_date: string,
     id_card_number: string,
     telephone: number | null,
     check_in_date: string,

     address: string,
     past_job: string,
     edu_level: string,
     status: string,
     emergency_contact: { name: string, telephone: number }[],
}

export interface DrugSubmission {
     elderly_id: number,
     drug_name: string,
     dose: string,
     times_per_day: string,
     start_date: undefined | string,
     end_date: undefined | string,
     depend_on_need: boolean,
     authorized_hospital: string,
     reason_of_taking: undefined | string,
     drugInterval: Time[],
     isOfficial: boolean
}

export interface Time {
     time: string
}

export interface TemperatureData {
     elderly_id: number,
     name: string,
     bed_number: number,
     date: string,
     time: string,
     temperature_data: number,
     temperature_unit: string
}

