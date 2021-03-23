import * as express from "express";
import { ContractService } from "../services/ContractService";

export class ContractRouter {
    constructor(private contractService: ContractService) {

    }
    router = () => {
        const router = express.Router()
        router.get('/', this.getContract)
        return router
    }

    getContract = async (req: express.Request, res: express.Response) => {
        try {
            const basicContract = await this.contractService.getContract()
            const additionContract = await this.contractService.getAdditionContract()
            const contract = { basicContract: basicContract, additionContract: additionContract }
            res.json(contract)
        } catch (e) {
            console.log(e.toString())
            res.json({ isSuccess: false, msg: e.toString() })
        }
    }
}