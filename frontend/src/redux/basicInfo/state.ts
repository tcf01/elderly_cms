export interface BasicInfoFormat {

  elderly_id: number, //SQL出嚟時要改名
  name_chi: string,
  name_eng: string,
  image?: string,
  bed_number?: number | null,

  gender: string,
  birth_date: string,
  id_card_number: string,
  telephone: number | null,
  check_in_date?: string,
  check_out_date?: string | null,

  address: string,
  past_job: string,
  edu_level: string,
  status: string,

  created_at?: string,
  updated_at?: string

  emergency_contact_people_name?: string;  //要join table同改名
  emergency_contact_people_telephone?: number; //要join table同改名
}


export interface Contact {
  name: string,
  telephone: number
}

export interface IEmergencyContactsState {
  contacts: Contact[]
}


export interface IBasicInfoState {
  basicInfo: BasicInfoFormat
  contacts: Contact[]
  drugNames:string[]
}
