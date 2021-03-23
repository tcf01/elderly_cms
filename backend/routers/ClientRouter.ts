import * as express from 'express'
import { ClientService } from '../services/ClientService';

export class ClientRouter {
    constructor(private clientService: ClientService) {

    }
    router = () => {
        const router = express.Router()
        router.get('/', this.getAll)
        // router.get('/:id', this.getById)
        // router.get('/emergency/:id', this.getEmergencyContactsById)
        return router
    }

    getAll = async (req: express.Request, res: express.Response) => {
        try {
            const clients = await this.clientService.getAll()
            res.json(clients)
        } catch (e) {
            console.log(e.toString())
            res.json({ isSuccess: false, msg: e.toString() })
        }
    }

    // getById = async (req: express.Request, res: express.Response) => {
    //     console.log("ClientRouter- getById")
    //     const client = await this.clientService.getById(req.params.id)
    //     res.json(client)
    // }

    // getEmergencyContactsById = async (req: express.Request, res: express.Response) => {
    //     const client = await this.clientService.getEmergencyContactsById(req.params.id)
    //     res.json(client)
    // }


}