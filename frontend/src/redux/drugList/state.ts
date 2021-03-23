export interface Drug{
    elderly_id:number,
    drug_name:string,
    dose:string,
    times_per_day:string|number|undefined,
    start_date:undefined|string,
    end_date:undefined|string,
    depend_on_need:boolean,
    authorized_hospital:string,
    reason_of_taking:undefined|string,
    drugInterval?:Time[]|undefined,
    isOfficial:boolean,
    drug_image?:undefined|string,
    drug_record_id?:number
}


export interface Time{
    time:string 
}

export interface IDrugListState {
    drug: Drug[]
}