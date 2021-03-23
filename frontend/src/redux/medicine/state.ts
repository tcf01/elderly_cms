export interface IPerMedicineRecordCard {
    elderly_id: number,
    elderly_image: string,
    elderly_chi_name: string,
    elderly_eng_name: string,
    elderly_bed_number: number,
    drug_basic_info: [{
        drug_record_id: number,
        name: string,
        dose: string,
        image: string,
        times_per_day: number,
        start_date: string
        end_date: string,
        depend_on_need: boolean,
        authorized_hospital: null,
        isOfficial: boolean,
        reason_of_taking: string,
        drug_details: [{
            drug_details_id: number,
            have_drug_time: string,
            status_id: number,
            remark: string
        }]
    }]
}



export interface IElderlyDrugRecordsState {
    elderlyDrugRecords: IPerMedicineRecordCard[]
}