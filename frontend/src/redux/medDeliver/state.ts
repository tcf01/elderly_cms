
export interface IMedDeliverState{
  result:Time[]
}

export interface Time{
  time:string,
  date:string,
  elderly:Elderly[]
}

export interface Elderly{
  name:string,
  image:string|undefined,
  bed_number:number|undefined,
  elderly_id:number,
  medicine:Medicine[]
}

export interface Medicine{
  drug_name:string, 
  drug_image:string|undefined,
  dose:string, 
  isOfficial:boolean, 
  reason_of_taking:string|undefined,
  drug_details_id:number
}

