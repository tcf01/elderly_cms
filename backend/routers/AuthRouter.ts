import * as express from 'express';
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import * as jwtSimple from 'jwt-simple';
import jwt from '../passport/jwt';
import { checkPassword } from '../passport/hash';
import { isLoggedIn } from '../passport/guard';

export class AuthRouter {

    constructor(private authService: AuthService) { }

    router() {
        const router = express.Router();
        router.get('/', isLoggedIn, this.getCurrentUser)
        router.post('/login', this.generateToken);
        router.post('/addStaff', this.addStaff)
        return router;
    }

    private getCurrentUser = async (req: express.Request, res: express.Response) => {
        try {
            res.json(req.user)
        } catch (error) {
            console.error(error)
            res.json({ "status": error })
        }
    }

    private generateToken = async (req: Request, res: Response) => {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(401).json({ msg: "帳號名稱或密碼錯誤" });
                return;
            }
            const { username, password } = req.body;
            const user = (await this.authService.getUserByUsername(username))[0];
            if (!user || !(await checkPassword(password, user.password))) {
                res.status(401).json({ msg: "帳號名稱或密碼錯誤" });
                return;
            }
            const payload = {
                id: user.id,
                username: user.name,
                role: user.role_id
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            res.json({
                token: token,
                userInfo: payload,
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({ msg: e.toString() })
        }
    }

    private addStaff = async (req: express.Request, res: express.Response) => {
        try {
            delete req.body.modal
            console.log(req.body)
            const id = await this.authService.registerUser(req.body)
            res.status(200).json({ id })
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}