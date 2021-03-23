import * as Knex from 'knex'
import joinJs from 'join-js';
import { DrugSubmission, TemperatureData } from '../interface';
import { medicineRecordSchema } from '../joinJsSchema/medicineRecordSchema';
import { drugTime } from '../joinJsSchema/drugTime';
import * as moment from 'moment';
import { drugDeliver } from '../joinJsSchema/drugDeliver';
import { elderlyPastRecord } from '../joinJsSchema/elderlyPastRecord';

export class PermissionService {
    constructor(private knex: Knex) { }

    checkAllStatusForShowcase = async () => {
        const isAllDistribute = await this.knex.select('*')
            .from('drug_details')
            .where('status_id', '<', 4)
        if (isAllDistribute.length === 0) {
            await this.knex("drug_details").update({ status_id: 1 })
        }
    }

    resetDrugStatus = async () => {
        // const numberOfId = await this.knex.select('*').from('drug_details').returning('id')
        // for (let i = 1; i < numberOfId.length + 1; i++) {
        return await this.knex('drug_details')
            // .where('id', '=', i)
            .update({ status_id: '1' })
        // }
    }


    //用院友id拎佢地既藥物記錄（要食咩藥）
    getMedicineRecordByElderlyId = async (elderly_id: string) => {
        const queryBuilder = this.knex.select
            ({
                'e_elderly_id': 'elderly.id',
                'e_elderly_image': 'elderly.image',
                'e_elderly_chi_name': 'elderly.name_chi',
                'e_elderly_eng_name': 'elderly.name_eng',
                'e_elderly_bed_number': 'elderly.bed_number',

                //drugBasicInfoMap
                'drugBI_drug_records_id': 'drug_records.id',
                'drugBI_name': 'drugs.name',
                'drugBI_image': 'drugs.image',
                'drugBI_dose': 'drug_records.dose',
                'drugBI_times_per_day': 'drug_records.times_per_day',
                'drugBI_start_date': 'drug_records.start_date',
                'drugBI_end_date': 'drug_records.end_date',
                'drugBI_depend_on_need': 'drug_records.depend_on_need',
                'drugBI_authorized_hospital': 'drug_records.authorized_hospital',
                'drugBI_isOfficial': 'drug_records.isOfficial',
                'drugBI_reason_of_taking': 'drug_records.reason_of_taking',

                //drugDetails
                'drugD_drug_details_id': 'drug_details.id',
                'drugD_have_drug_time': 'drug_details.have_drug_time',
                'drugD_status_id': 'deliver_drug_status.id',
                'drugD_remark': 'deliver_drug_status.remark',
            })

            .from('elderly')
            .leftJoin('drug_records', 'drug_records.elderly_id', 'elderly.id')
            .innerJoin('drugs', 'drugs.id', 'drug_records.drug_name_id')
            .innerJoin('drug_details', 'drug_details.drug_record_id', 'drug_records.id')
            .leftJoin('deliver_drug_status', 'drug_details.status_id', 'deliver_drug_status.id')


        if (elderly_id && elderly_id.trim() !== "") {
            const result = await queryBuilder.where('elderly.id', elderly_id)

            return joinJs.map(result, medicineRecordSchema, 'elderlyInfo', 'e_')
        }

        const result = await queryBuilder.orderBy('elderly.id')
        return joinJs.map(result, medicineRecordSchema, 'elderlyInfo', 'e_')
    }


    //用date去拎體溫記錄
    getTemperatureByDate = async (date: string) => {
        return await this.knex.select('temperature_record.*', 'elderly.id')
            .from('temperature_record')
            .leftJoin('elderly', 'temperature_record.elderly_id', 'elderly.id')
            .where('temperature_record.date', date)
    }

    //用id去拎體溫記錄
    getTemperatureByElderlyId = async (id: string) => {
        return await this.knex.select('temperature_record.*', 'elderly.id')
            .from('temperature_record')
            .leftJoin('elderly', 'temperature_record.elderly_id', 'elderly.id')
            .where('temperature_record.elderly_id', id)
    }

    //用date去拎血糖記錄
    getBloodSugarByDate = async (date: string) => {
        return await this.knex.select('blood_sugar_record.*', 'elderly.id')
            .from('blood_sugar_record')
            .leftJoin('elderly', 'blood_sugar_record.elderly_id', 'elderly.id')
            .where('blood_sugar_record.date', date)
    }

    getByDate = async (type: string, date: string) => {
        return await this.knex.select(`${type}_record.*`, 'elderly.id')
            .from(`${type}_record`)
            .leftJoin('elderly', `${type}_record.elderly_id`, 'elderly.id')
            .where(`${type}_record.date`, date)
    }

    getByElderlyId = async (type: string, id: string) => {
        return await this.knex.select(`${type}_record.*`, 'elderly.id')
            .from(`${type}_record`)
            .leftJoin('elderly', `${type}_record.elderly_id`, 'elderly.id')
            .where(`${type}_record.elderly_id`, id)
    }


    //用id去拎血糖記錄
    getBloodSugarByElderlyId = async (id: string) => {
        return await this.knex.select('blood_sugar_record.*', 'elderly.id')
            .from('blood_sugar_record')
            .leftJoin('elderly', 'blood_sugar_record.elderly_id', 'elderly.id')
            .where('blood_sugar_record.elderly_id', id)
    }

    //用date去拎導尿管記錄
    getCatheterByDate = async (date: string) => {
        return await this.knex.select('catheter_record.*', 'elderly.id')
            .from('catheter_record')
            .leftJoin('elderly', 'catheter_record.elderly_id', 'elderly.id')
            .where('catheter_record.date', date)
    }

    //用id去拎導尿管記錄
    getCatheterByElderlyId = async (id: string) => {
        return await this.knex.select('catheter_record.*', 'elderly.id')
            .from('catheter_record')
            .leftJoin('elderly', 'catheter_record.elderly_id', 'elderly.id')
            .where('catheter_record.elderly_id', id)
    }


    //拎院友基本資料
    getElderlyBasicInfo = async () => {

        await this.checkAllStatusForShowcase();
        return await this.knex.select('elderly.*', 'check_out_reasons.reason', 'emergency_contact_people.name as emergency_contact_person_name', 'emergency_contact_people.id_card_number as contact_person_id_card_number', 'emergency_contact_people.relation_with_elderly', 'emergency_contact_people.telephone as contact_person_phone_number', 'emergency_contact_people.address as contact_person_address', 'drugs.edu_level', 'marriage_status.status')
            .from('elderly')
            .leftJoin('check_out_reasons', 'check_out_reasons.id', 'elderly.check_out_reason')
            .leftJoin('edu_levels', 'edu_levels.id', 'elderly.edu_level_id')
            .leftJoin('marriage_status', 'marriage_status.id', 'elderly.marriage_status_id')
    }

    //用院友id拎基本資料(舊的)
    // getElderlyBasicInfoByElderlyId = async (id: string) => {
    //     return await this.knex.select('elderly.*', 'check_out_reasons.reason', 'emergency_contact_people.name as emergency_contact_person_name','emergency_contact_people.id_card_number as contact_person_id_card_number','emergency_contact_people.relation_with_elderly','emergency_contact_people.telephone as contact_person_phone_number','emergency_contact_people.address as contact_person_address', 'edu_levels.edu_level', 'marriage_status.status')
    //         .from('elderly')
    //         .leftJoin('check_out_reasons', 'check_out_reasons.id', 'elderly.check_out_reason')
    //         .leftJoin('elderly_emergency_contact_people', 'elderly_emergency_contact_people.elderly_id', 'elderly.id')
    //         .leftJoin('emergency_contact_people', 'emergency_contact_people.id', 'elderly_emergency_contact_people.emergency_contact_person_id')
    //         .leftJoin('edu_levels', 'edu_levels.id', 'elderly.edu_level_id')
    //         .leftJoin('marriage_status', 'marriage_status.id', 'elderly.marriage_status_id')
    //         .where('elderly.id', id)
    // }

    //用院友id拎基本資料(試新嘢-by mike )
    getElderlyBasicInfoByElderlyId = async (id: string) => {
        const basicInfo = await this.knex.select('elderly.*', 'elderly.id AS elderly_id', 'edu_level', 'status')
            .from('elderly')
            .leftJoin('edu_levels', 'edu_levels.id', 'elderly.edu_level_id')
            .leftJoin('marriage_status', 'marriage_status.id', 'elderly.marriage_status_id')
            .where('elderly.id', id)
            .first()

        const contacts = await this.knex.select('*')
            .from('elderly_emergency_contact_people')
            .leftJoin('emergency_contact_people', 'emergency_contact_people.id', 'elderly_emergency_contact_people.emergency_contact_person_id')
            .where('elderly_emergency_contact_people.elderly_id', id)

        return { basicInfo, contacts }
    }


    //用院友id拎緊急聯絡人資料
    getElderlyEmergencyContactPeopleById = async (id: number) => {
        return await this.getElderlyEmergencyContactPeople()
            .where('elderly.id', id)
    }

    getElderlyEmergencyContactPeople = () => {
        return this.knex.select('elderly.id as elderly_id', 'elderly.name_chi as elderly_chi_name', this.knex.raw(`json_agg(json_build_object(
            'emergency_contact_person_id', emergency_contact_people.id, 
            'name', emergency_contact_people.name, 
            'id_card_number', emergency_contact_people.id_card_number,
            'relation_with_elderly', emergency_contact_people.relation_with_elderly,
            'telephone', emergency_contact_people.telephone, 
            'address', emergency_contact_people.address, 
            'contact_priority', emergency_contact_people.contact_priority)) 
            as emergency_contact_person`))

            .from('elderly')
            .leftJoin('elderly_emergency_contact_people', 'elderly.id', 'elderly_emergency_contact_people.elderly_id')
            .leftJoin('emergency_contact_people', 'emergency_contact_people.id', 'elderly_emergency_contact_people.emergency_contact_person_id')
            .groupBy('elderly.id')
    }

    // //用院友id拎藥物記錄
    // getMedicineRecordByElderlyId = async (id: string) => {
    //     return (await this.knex.select('elderly.id as elderly_id', 'drug_records.id as drug_record_id', 'drugs.name as drug_name', 'drug_records.dose', 'drug_records.times_per_day',
    //         'drug_records.start_date', 'drug_records.end_date', 'drug_records.depend_on_need', 'drug_records.authorized_hospital',
    //         'drug_records.isOfficial', 'drug_records.reason_of_taking', 'drug_details.id as drug_details_id', 'drug_details.have_drug_time', 'deliver_drug_status.status', 'deliver_drug_status.remark')
    //         .from('elderly')
    //         .leftJoin('drug_records', 'drug_records.elderly_id', 'elderly.id')
    //         .leftJoin('drugs', 'drugs.id', 'drug_records.drug_name_id')
    //         .leftJoin('drug_details', 'drug_details.drug_record_id', 'drug_records.id')
    //         .leftJoin('deliver_drug_status', 'drug_details.status_id', 'deliver_drug_status.id')
    //         .where('drug_records.elderly_id', id)
    //     )
    // }


    //根據院友id，拎晒佢地所有info
    getAllElderlyInfoById = async (id: string) => {
        const elderlyInfo = {
            temperatureRecord: await this.getTemperatureByElderlyId(id),
            bloodSugarRecord: await this.getBloodSugarByElderlyId(id),
            catheterRecord: await this.getCatheterByElderlyId(id),
            elderlyBasicInfo: await this.getElderlyBasicInfoByElderlyId(id),
            drugRecord: await this.getMedicineRecordByElderlyId(id)
        }
        return elderlyInfo
    }

    //未用得住(OLD)
    // editElderlyInfo = async (id, dataReceived) => {
    //     const existingData = await this.getElderlyInfoById(id)
    //     console.log(existingData)
    // }

    //更新住客基本資料(by mike)
    editElderlyInfo = async (id, dataReceived) => {
        console.log("editElderlyInfo")
        const { updatedInfo, updatedContacts } = dataReceived;
        console.log("updatedInfo")
        console.log(updatedContacts)
        const { name_chi, name_eng, bed_number, gender, birth_date, id_card_number, telephone,
            check_in_date, check_out_date, address, past_job, edu_level, status
        } = updatedInfo
        const edu_id = await this.knex.select('id').from('edu_levels').where('edu_level', edu_level).first();
        const marriage_id = await this.knex.select('id').from('marriage_status').where('status', status).first();
        const edu_level_id = edu_id.id;
        const marriage_status_id = marriage_id.id;



        //第一部份更新基本資料    
        await this.knex('elderly')
            .where("elderly.id", id)
            .update({
                name_chi, name_eng, bed_number, gender, birth_date,
                id_card_number, telephone, check_in_date, check_out_date,
                address, past_job, edu_level_id, marriage_status_id
            })

        //第二部份更新聯絡人           
        console.log(updatedContacts)

        const contacts = await updatedContacts.map(async (contact) =>
            await this.knex('emergency_contact_people')
                .where("emergency_contact_people.id", contact.emergency_contact_person_id)
                .update({
                    name: contact.name,
                    id_card_number: contact.id_card_number,
                    relation_with_elderly: contact.relation_with_elderly,
                    telephone: contact.telephone,
                    address: contact.address,
                    contact_priority: contact.contact_priority
                })
        )

        await Promise.all(contacts)
    }


    //輸入藥物至DATABASE
    addElderlyMedicine = async (medicineInfo: DrugSubmission, image_path: Express.Multer.File) => {
        return this.knex.transaction(async (trx) => {
            //check下隻藥有冇係database
            const drugSearchResult = await trx.select('id')
                .from('drugs')
                .where('name', medicineInfo.drug_name).first();
            console.log("medicineInfo")
            console.log(medicineInfo)
            console.log("image_path")
            console.log(image_path)
            let drug_name_id = 0;

            if (drugSearchResult) {
                drug_name_id = drugSearchResult.id
            } else {
                // if (!image_path){
                //     console.log("image_path===undefined")
                //     const [image_id] = await trx.insert({ name: medicineInfo.drug_name })
                //         .into("drugs")
                //         .returning('id');
                //     drug_name_id =image_id
                // }else{
                console.log("image_path.location ok")
                const [image_id] = await trx.insert({ name: medicineInfo.drug_name, image: image_path ? image_path.location : null })
                    .into("drugs")
                    .returning('id');
                drug_name_id = image_id
                // }
            }

            //抽起用藥時待用
            const drugInterval = medicineInfo.drugInterval;
            console.log(drugInterval)

            //delete返唔要嘅key & value再加返drugID
            const medicineInfoToBeInserted: any = { ...medicineInfo }
            delete medicineInfoToBeInserted.drugInterval
            delete medicineInfoToBeInserted.drug_name
            delete medicineInfoToBeInserted.new_drug_pic
            medicineInfoToBeInserted.drug_name_id = drug_name_id

            console.log("addElderlyMedicine")
            const [drug_record_id] = await trx.insert(medicineInfoToBeInserted)
                .into("drug_records")
                .returning('id');
            console.log("drug_record_id")
            console.log(drug_record_id)

            // 入食藥時間

            // if (drugInterval[0].time!==""){
            const drugPresetTime = drugInterval.map((drug) => {
                const drugObject = {
                    drug_record_id: drug_record_id,
                    preset_time: drug.time
                }
                return drugObject
            })
            console.log("drugPresetTime")
            console.log(drugPresetTime)

            if (drugPresetTime.length > 0) {
                await trx.insert(drugPresetTime)
                    .into("elderly_drug_preset_time")
            }

            return drug_record_id
        })
    }

    //搵返老人家食過咩藥
    getElderlyPastRecord = async (elderly_id: string) => {
        const result = await this.knex.select
            ({
                'd_have_drug_date': 'drug_details.have_drug_date',

                't_have_drug_time': 'drug_details.have_drug_time',

                'drug_drug_records_id': 'drug_records.id',
                'drug_drug_name': 'drugs.name',
                'drug_dose': 'drug_records.dose',
                'drug_isOfficial': 'drug_records.isOfficial',
                'drug_drug_details_id': 'drug_details.id',
                'drug_status': 'deliver_drug_status.status'
            })
            // const result = this.knex.select("*")
            .from('elderly')
            .leftJoin('drug_records', 'drug_records.elderly_id', 'elderly.id')
            .innerJoin('drugs', 'drugs.id', 'drug_records.drug_name_id')
            .innerJoin('drug_details', 'drug_details.drug_record_id', 'drug_records.id')
            .leftJoin('deliver_drug_status', 'drug_details.status_id', 'deliver_drug_status.id')
            .where('elderly.id', elderly_id)
            .andWhere('deliver_drug_status.id', '>', 3)
        // return result
        return joinJs.map(result, elderlyPastRecord, 'dateInfo', 'd_')
    }

    //拎返嗰個老人家嘅紀錄(直表)

    // (getElderlyMedicine version2:fail ) 
    // getElderlyMedicine = async (elderly_id:number) => {
    //     console.log("getElderlyMedicine")

    //     const drugs = await this.knex.select('*')
    //         .from('drug_records')
    //         .leftJoin('drugs','drugs.id','drug_records.drug_name_id')
    //         .where('drug_records.elderly_id', elderly_id)
    //     console.log("elderly_id",elderly_id)
    //     console.log(drugs)


    //     const drugListPromise =drugs.map( 
    //         async(drug_records)=>{
    //         const drugInterval=await this.knex.select('*')
    //         .from('elderly_drug_preset_time')
    //         .where('elderly_drug_preset_time.drug_record_id',drug_records.id)
    //         drug_records["drugInterval"]=drugInterval
    //         console.log(drugInterval)
    //         console.log("drug_records")
    //         console.log(drug_records)
    //         return drug_records
    //     })    

    //     const drugList = await Promise.all(drugListPromise)
    //     console.log("drugList")
    //     console.log(drugList)
    //     return drugList
    // }

    //拎返嗰個老人家嘅紀錄(直表)
    // (getElderlyMedicine version3:success ) 
    getElderlyMedicine = async (elderly_id: number) => {
        console.log("getElderlyMedicine")
        // const check_record=  await this.knex.select('*')
        //                     .from('drug_records')
        //                     .where('drug_records.elderly_id', elderly_id)

        let mappedResult: any[] = []
        // if (check_record.length>0){
        console.log("check_record.length>0")
        const result = await this.knex.select
            ({

                'e_elderly_id': 'drug_records.elderly_id',

                //drug
                'drug_drug_record_id': 'drug_records.id',
                'drug_drug_name': 'drugs.name',
                'drug_drug_image': 'drugs.image',
                'drug_dose': 'drug_records.dose',
                'drug_times_per_day': 'drug_records.times_per_day',
                'drug_start_date': 'drug_records.start_date',
                'drug_end_date': 'drug_records.end_date',
                'drug_authorized_hospital': 'drug_records.authorized_hospital',
                'drug_reason_of_taking': 'drug_records.reason_of_taking',
                'drug_depend_on_need': 'drug_records.depend_on_need',
                'drug_isOfficial': 'drug_records.isOfficial',

                //drugBasicInfoMap
                'time_time_id': 'elderly_drug_preset_time.id',
                'time_time': 'elderly_drug_preset_time.preset_time',
            })
            .from('drug_records')
            .leftJoin('drugs', 'drugs.id', 'drug_records.drug_name_id')
            .leftJoin('elderly_drug_preset_time', 'elderly_drug_preset_time.drug_record_id', 'drug_records.id')
            .where('drug_records.elderly_id', elderly_id)
        mappedResult = joinJs.mapOne(result, drugTime, 'elderlyInfo', 'e_')
        console.log(mappedResult)
        // }                 

        return mappedResult
    }



    //根據藥物記錄既id，拎番依家呢隻藥既記錄
    getMedicineRecordByItsId = async (drugRecordId) => {
        const currentRecord = await this.knex.select('*')
            .from('drug_records')
            .where('drug_records.id', drugRecordId).first()
        return currentRecord
    }

    //根據藥物記錄既id，更新既藥物depend_on_need status
    updateMedicineDependOnNeedStatus = async (drugRecordId: number) => {
        const currentRecord = await this.getMedicineRecordByItsId(drugRecordId)
        await this.knex.select('*')
            .from('drug_records')
            .where('drug_records.id', drugRecordId)
            .update({ depend_on_need: !currentRecord.depend_on_need }, ['depend_on_need'])
    }

    //根據藥物記錄既id，更新既藥物服用時間
    updateMedicineTime = async (drugRecordId: number, time: string, user: any) => {
        const record = (await this.insertLogRecord(user))[0]
        await this.knex.select('*')
            .from('drug_details')
            .where('drug_details.drug_record_id', drugRecordId)
            .update({ have_drug_time: time, log_record_id: record.id }, ['have_drug_time', 'log_record_id'])
    }

    updateMedicineRecentStatus = async (drugDetailId: number, drugRecentStage: number) => {
        const resultDrugId = await this.knex.select('*')
            .from('drug_details')
            .where('drug_details.id', drugDetailId)
            .update({ status_id: drugRecentStage }, ['status_id'])
            .returning(['drug_record_id', 'status_id'])

        //update果道會出番個resultDrugId
        return resultDrugId
    }


    //每次執藥，都會log低邊個做同埋幾時做
    insertLogRecord = async (username: any) => {
        return await this.knex('log_records')
            .insert({ username })
            .returning(['id'])
    }

    //一次拎晒所有藥名
    getAllDrugs = async () => {
        return await this.knex.select('name').from('drugs')
    }



    //拎晒所有昨日核藥，而未派嘅藥+老人家出嚟，只需要拎時間
    getTodayDrugDeliverTime = async () => {
        console.log("getTodayDrugDeliverTime")
        const today = moment().format('YYYY-MM-DD')
        console.log(today)
        const result = await this.knex.select
            ({
                //time
                't_time': 'drug_details.have_drug_time',
                't_date': 'drug_details.have_drug_date',
                //elderly
                'e_elderly_id': 'drug_records.elderly_id',
                'e_name': 'elderly.name_chi',
                'e_image': 'elderly.image',
                'e_bed_number': 'elderly.bed_number',
                //drug
                'm_drug_records_id': 'drug_records.id',
                'm_drug_name': 'drugs.name',
                'm_drug_image': 'drugs.image',
                'm_dose': 'drug_records.dose',
                'm_reason_of_taking': 'drug_records.reason_of_taking',
                'm_isOfficial': 'drug_records.isOfficial',
                'm_drug_details_id': 'drug_details.id',
            })
            .from('drug_details')
            .leftJoin('drug_records', 'drug_records.id', 'drug_details.drug_record_id')
            .leftJoin('drugs', 'drug_records.drug_name_id', 'drugs.id')
            .leftJoin('elderly', 'elderly.id', 'drug_records.elderly_id')
            .where('drug_details.status_id', 3)
            .andWhere('drug_details.have_drug_date', today)
        // .orderBy('t_time')
        console.log("result", result)

        const mappedResult = joinJs.map(result, drugDeliver, 'timeInfo', 't_')
        mappedResult.sort(function (a, b) {
            const prevTime = parseInt(a.time.replace(/:/g, ""))
            const nextTime = parseInt(b.time.replace(/:/g, ""))
            return prevTime - nextTime
        });

        // console.log(mappedResult)
        return mappedResult
    }

    //輸入溫度至DATABASE
    addTemperature = async (temperatureInfo: Array<TemperatureData>) => {

        return await this.knex("temperature_record").insert(temperatureInfo)
    }


    getTemperature = async () => {
        const temperature = await this.knex.select('*')
            .from('temperature_record')
            .where('temperature_record.date', moment().format('YYYY-MM-DD'))
        if (temperature.length > 0) {
            console.log("Temperature !=[]")
            return temperature
        } else {
            console.log(" temperature is [] ")
            const noTemperature = await this.knex.select('elderly.id', 'elderly.name_chi', 'elderly.bed_number')
                .from('elderly')

            return noTemperature
        }
    }

    getStaffDetail = async () => {
        return await this.knex.select("*").from("users")
    }

    alterMedicineStatus = async (id: number, status_id: number) => {
        console.log("alterMedicineStatus")
        console.log(id, status_id)
        return await this.knex('drug_details')
            .update({ "status_id": status_id })
            .where('id', id)
    }
}



