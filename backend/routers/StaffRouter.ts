import * as express from 'express'
import { PermissionService } from '../services/PermissionService';
import multer = require('multer');



export class StaffRouter {
    constructor(private permissionService: PermissionService, private upload: multer.Instance) {}

    router = () => {
        const router = express.Router()
        router.get('/', this.healthRecord)
        // router.get('/testing', this.testing)
        router.get('/client', this.basicInfo)
        router.put('/client/:id/edit', this.editElderlyInfo)
        router.post('/medicine/add/:id/', this.upload.single('new_drug_pic'), this.addElderlyMedicine)
        
        router.get('/medicine', this.medicineRecord) // ?fields=[name, age]
        // router.get('/medicine/getAllNames/', this.getAllMedicine)
        router.get('/:id(^[0-9]+)/medicine/', this.getElderlyMedicine)
        router.get('/:id(^[0-9]+)/medicine/record',this.getElderlyPastRecord)
        router.get('/medicine/deliver/', this.deliverMedicine)

        router.put('/medicine/alter/status', this.alterMedicineStatus)
        router.put('/medicine/time', this.medicineTime)
        router.put('/medicine', this.medicineRecentStatus)
        router.put('/medicine/depend_on_need_status', this.medicineDependOnNeedStatus)
        router.put('/medicine/reset', this.setDrugInitialStatus)
    
        router.get('/emergency_contact_person', this.emergencyPeople)
        router.post('/temperature', this.addTemperature)
        router.get('/temperature', this.getTemperature)
        router.get('/management', this.getStaffDetail)
        return router
    }

    setDrugInitialStatus = async (_req: express.Request, res: express.Response) => {
        try {
            await this.permissionService.resetDrugStatus()
            res.json({ isSuccess: true })
        } catch (e) {
            console.error(`StaffRouter - setDrugInitialStatus error:`, e)
            res.status(500).json({ msg: e.message })
        }
    }



    healthRecord = async (req: express.Request, res: express.Response) => {
        const { type, date, id } = req.query

        console.log('has come here?')
        try {
            // if (type === "temperature" && date && !id) {
            //     const result = await this.permissionService.getTemperatureByDate(date)
            //     res.json({ result, isSuccess: true })
            // } else if (type === "temperature" && id) {
            //     const result = await this.permissionService.getTemperatureByElderlyId(id)
            //     res.json({ result, isSuccess: true })
            // } 
            
            // else if (type === "blood_sugar" && date && !id) {
            //     const result = await this.permissionService.getBloodSugarByDate(date)
            //     res.json({ result, isSuccess: true })
            // } else if (type === "blood_sugar" && id) {
            //     const result = await this.permissionService.getBloodSugarByElderlyId(id)
            //     res.json({ result, isSuccess: true })
            // } 
            
            
            // else if (type === "catheter" && date && !id) {
            //     const result = await this.permissionService.getCatheterByDate(date)
            //     res.json({ result, isSuccess: true })
            // } else if (type === "catheter" && id) {
            //     const result = await this.permissionService.getCatheterByElderlyId(id)
            //     res.json({ result, isSuccess: true })
            // }

            this.evaluate(type, date, id)
        } catch (e) {
            console.error(`StaffRouter - healthRecord error:`, e)
            res.status(500).json({ msg: e.message })
        }

    }

    private evaluate = async (type: string, date: string, id: string) => {
        if (type && date && !id) {
            return await this.permissionService.getByDate(type, date)
        } else if (type && id) {
            return await this.permissionService.getByElderlyId(type, id)
        } 

        return false
    }


    //拎番院友既basic資料（姓名，聯絡人，舊時工作...，冇fk既column）
    //如果有query果到有id咁就會拎一個院友既basic info。如果冇query咁就係拎晒全部院友既basic info
    basicInfo = async (req: express.Request, res: express.Response) => {
        const { elderlyId } = req.query
        try {
            if (elderlyId) {
                const result = await this.permissionService.getElderlyBasicInfoByElderlyId(elderlyId)
                return res.status(200).json({ result, isSuccess: true })
            } else {
                const result = await this.permissionService.getElderlyBasicInfo()
                return res.status(200).json({ result, isSuccess: true })
            }
        } catch (e) {
            console.error(`StaffRouter - basicInfo error:`, e)
            return res.status(500).json({ msg: e.message })
        }
    }

    //
    emergencyPeople = async (req: express.Request, res: express.Response) => {
        const { elderlyId } = req.query
        try {
            if (elderlyId) {
                const result = await this.permissionService.getElderlyEmergencyContactPeopleById(elderlyId)
                return res.status(200).json({ result, isSuccess: true })
            } else {
                const result = await this.permissionService.getElderlyEmergencyContactPeople()
                return res.status(200).json({ result, isSuccess: true })
            }
        } catch (e) {
            console.error(`StaffRouter - basicInfo error:`, e)
            return res.status(500).json({ msg: e.message })
        }
    }


    // 用得
    editElderlyInfo = async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - editElderlyInfo")
            const { id } = req.params
            // const { dataReceived } = req.body
            await this.permissionService.editElderlyInfo(id, req.body)
            res.status(200).json({ "status": "更新成功" })
        } catch (e) {
            console.error(`StaffRouter - editElderlyInfo error:`, e)
            res.status(500).json(e)
        }
    }

    //係住客中心輸入「藥物」，會經呢度進入
    addElderlyMedicine = async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - addElderlyMedicine")
            const data =  {
                ...req.body,
                times_per_day:JSON.parse(req.body.times_per_day),
                start_date:req.body.start_date==="undefined"?undefined:JSON.parse(req.body.start_date),
                end_date:req.body.end_date==="undefined"?undefined:JSON.parse(req.body.end_date),
                depend_on_need:JSON.parse(req.body.depend_on_need),
                isOfficial:JSON.parse(req.body.isOfficial),
                reason_of_taking:JSON.parse(req.body.reason_of_taking),
                elderly_id:parseInt(JSON.parse(req.body.elderly_id)),
                drugInterval:JSON.parse(req.body.drugInterval),
            }
            console.log(data)
            
            const drug_record_id=await this.permissionService.addElderlyMedicine(data,req.file)
            console.log("drug_record_id",drug_record_id)
            if (req.file===undefined){
                res.status(200).json({ drug_record_id, drug_image:null ,isSuccess: true })
            }else{
                res.status(200).json({ drug_record_id,drug_image:req.file.location, isSuccess: true })
            }
        } catch (e) {
            console.error(`StaffRouter - addElderlyMedicine error:`, e)
            res.status(500).json(e)
        }
    }

    /**
     * This function comment is parsed by doctrine
     * @route GET /api
     * @group foo - Operations about user
     * @param {string} email.query.required - username or email - eg: user@domain
     * @param {string} password.query.required - user's password.
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    //想睇一個老人家食過咩藥
    getElderlyPastRecord=async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - getElderlyPastRecord")
            const result=await this.permissionService.getElderlyPastRecord(req.params.id)
            console.log("result")
            console.log(result)
            res.status(200).json({ result, isSuccess: true })
        } catch (e) {
            console.error(`StaffRouter - getElderlyPastRecord error:`, e)
            res.status(500).json(e)
        }
    }
    
    //拎record
    getElderlyMedicine=async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - getElderlyMedicine")
            const result = await this.permissionService.getElderlyMedicine(req.params.id)
            res.status(200).json({ result, isSuccess: true })
        } catch (e) {
            console.error(`StaffRouter - getElderlyMedicine error:`, e)
            res.status(500).json(e)
        }
    }

    getAllMedicine = async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - getAllMedicine");
            const result = await this.permissionService.getAllDrugs();
            res.status(200).json({ result, isSuccess: true });
        } catch (e) {
            console.error(`StaffRouter - getAllMedicine error:`, e)
            res.status(500).json(e)
        }

    }

    deliverMedicine = async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - deliverMedicine");
            const result = await this.permissionService.getTodayDrugDeliverTime();
            console.log(result)
            res.status(200).json({ result, isSuccess: true });
        } catch (e) {
            console.error(`StaffRouter - deliverMedicine error:`, e)
            res.status(500).json(e)
        }
    }

    alterMedicineStatus = async (req: express.Request, res: express.Response) => {
        try {
            console.log("StaffRouter - alterMedicineStatus");
            const { drug_details_id, status_id } = req.body;
            const result = await this.permissionService.alterMedicineStatus(drug_details_id, status_id);
            console.log(result)
            res.status(200).json({ result, isSuccess: true });
        } catch (e) {
            console.error(`StaffRouter - alterMedicineStatus error:`, e)
            res.status(500).json(e)
        }
    }

    //冇id就show晒所有院友藥物記錄（for執藥），有id就show番每個院友要食咩藥
    medicineRecord = async (req: express.Request, res: express.Response) => {
        try {
            const { elderlyId } = req.query
            // if (!elderlyId) {
            //     const result = await this.permissionService.getMedicineRecord()
            //     res.status(200).json({ result, isSuccess: true })
            // } else {
            const result = await this.permissionService.getMedicineRecordByElderlyId(elderlyId)
            res.status(200).json({ result, isSuccess: true })
            // }
        } catch (e) {
            res.status(500).json({ msg: e.message })
            return console.error(`StaffRouter - medicineRecord error:`, e)
        }
    }


    //如果frontend有人係執藥果版㩒左「按需要時服用」，改status
    medicineDependOnNeedStatus = async (req: express.Request, res: express.Response) => {
        try {
            const { drugRecordId } = req.body
            await this.permissionService.updateMedicineDependOnNeedStatus(drugRecordId)
            res.status(200).json({ isSuccess: true })
        } catch (e) {
            res.status(500).json({ msg: e.message })
            return console.error(`StaffRouter - medicineDependOnNeedStatus error:`, e)
        }
    }

    //更改藥物的服用時間（eg. for果d「有需要的藥物」加入時間）
    medicineTime = async (req: express.Request, res: express.Response) => {
        try {
            const { drugRecordId, time, user } = req.body
            if (time === undefined) {
                throw new Error('time cannot be undefined')
            } else {
                await this.permissionService.updateMedicineTime(drugRecordId, time, user)
                return res.status(200).json({ isSuccess: true })
            }
        } catch (e) {
            return res.status(500).json({ msg: e.message })
        }
    }

    //更改藥物派發狀態（not_yet_handled,packed,checked,delivered)
    medicineRecentStatus = async (req: express.Request, res: express.Response) => {
        try {
            const drugDetailId = JSON.parse(req.body.drugDetailId)
            const drugRecentStage = JSON.parse(req.body.drugRecentStage)
            console.log("backend拎到既parameters", drugDetailId, drugRecentStage)
            // if (drugRecentStage) {
            //     switch (drugRecentStage) {
            //         case 1:
            //             drugRecentStage = 2
            //             break
            //         case 2:
            //             drugRecentStage = 3
            //             break
            //         case 3:
            //             drugRecentStage = 4
            //             break
            //         case 4:
            //             drugRecentStage = 1
            //             break
            //     }
                // const resultRefId = await this.permissionService.updateMedicineRecentStatus(drugDetailId, drugRecentStage, req.user[0].username)
                if (drugRecentStage && drugRecentStage < 4) {
                    const resultRefId = await this.permissionService.updateMedicineRecentStatus(drugDetailId, drugRecentStage + 1)
                    return res.status(200).json({ result: resultRefId, isSuccess: true })
                }
            // } else {
                throw new Error(`invalid input`)
            // }
        } catch (e) {
            console.error(`StaffRouter - medicineRecentStatus error:`, e)
            return res.status(500).json({ msg: e.message })
        }
    }

    addTemperature = async (req: express.Request, res: express.Response) => {
        try {
            console.log(req.body)
            await this.permissionService.addTemperature(req.body)
            res.status(200).json({"status": "更新成功"})
        }catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }

    getTemperature = async (req: express.Request, res: express.Response) => {
        try {
            const result = await this.permissionService.getTemperature();
            console.log("result")
            console.log(result)
            res.status(200).json({result, isSuccess: true});
        }catch(e){
            res.status(500).json(e)
        }
    }

    getStaffDetail = async (req: express.Request, res: express.Response) => {
        try{
            const detail = await this.permissionService.getStaffDetail();
            res.status(200).json({detail, isSuccess: true});
        }catch(e){
            res.status(500).json(e)
        }
    }

}