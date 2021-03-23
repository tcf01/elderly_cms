export interface Card {
  id: number; //SQL出嚟時要改名
  image: string;
  name_chi: string;
  birth_date: string; /*要用今日個DATE 去相減得出年齡 */
  bed_number: number;
  id_card_number?:string;
  emergency_contact_people_name: string;  //要join table同改名
  emergency_contact_people_telephone: number; //要join table同改名
}


export interface IClientCardState {
  cards: Card[]
}


