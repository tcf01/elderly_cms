import * as express from 'express'
import * as multer from 'multer'
import { FamilyMembersService } from '../services/FamilyMembersService';


export class FamilyMembersRouter {
    constructor(private familyMembersService: FamilyMembersService, private upload: multer.Instance) { }

     router = () => {
        const router = express.Router()
        router.post('/register', this.upload.single('elderly_profile_pic'), this.register);
        return router
    }

    register = async(req: express.Request, res: express.Response) => {
        try {
            console.log("Family Routers-register");
            console.log(req.body)
            const data =  {
                 ...req.body,
                 emergency_contact: JSON.parse(req.body.emergency_contact)
             }
    
            console.log(req.file)
            await this.familyMembersService.register(data, req.file);
            res.json({ isSuccess: true });
        } catch (e) {
            console.log(e)
            res.json({ isSuccess: false, msg: e.toString()});
        }
    }

}