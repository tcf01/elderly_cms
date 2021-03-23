export interface Time{
 time:string 
}

export interface DrugFormat{
drug_name:string, 
dose:string, 
times_per_day:any,
start_date:string|undefined, 
end_date:string|undefined,
depend_on_need:boolean, 
authorized_hospital:string,
isOfficial:boolean, 
reason_of_taking:string|undefined,
drugInterval?: Time[],
drug_image?:string,
elderly_id:number,
file?:File,
}




export interface DrugDetails{
    elderly_id:number,
    drug:DrugFormat[]
}