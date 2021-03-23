import * as express from 'express';
import * as expressSession from 'express-session'
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as Knex from 'knex';
import * as cors from 'cors'
import * as aws from 'aws-sdk'
import * as multer from 'multer'
import * as multerS3 from 'multer-s3'

import { FamilyMembersService } from './services/FamilyMembersService';
import { AuthService } from './services/AuthService';
import { PermissionService } from './services/PermissionService';
import { ClientService } from './services/ClientService'
import { ContractService } from './services/ContractService';

import { AuthRouter, ContractRouter, ClientRouter, StaffRouter, FamilyMembersRouter } from './routers';
// import { isLoggedIn } from './passport/guard';

//environment settings
dotenv.config();
const app = express();
const PORT = 8000;
const knexConfig = require('./knexfile');
const knex: Knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


//multer setting
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1'
});


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'tecky-proj-3.static',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
        }
    })
})

//middleware settings
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'Tecky Academy teaches typescript',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));


//setting passport 
app.use(passport.initialize());
app.use(passport.session());
//要import番passport folder入面果個passport config file，hash function可以分開另外一個   (唔係node module入面果個)
import  './passport/passport'     




//routers setting
export const authService = new AuthService(knex)
export const permissionService = new PermissionService(knex)
const clientService = new ClientService(knex)
const familyMembersService = new FamilyMembersService(knex)
const contractService = new ContractService(knex)
const authRouter = new AuthRouter(authService)
const staffRouter = new StaffRouter(permissionService,upload)
const clientRouter = new ClientRouter(clientService)
const familyMembersRouter = new FamilyMembersRouter(familyMembersService, upload)
const contractRouter = new ContractRouter(contractService)


//different routers 
app.use('/auth', authRouter.router());
app.use('/user/staff', 
// isLoggedIn,
 staffRouter.router());
app.use('/user/familyMembers', familyMembersRouter.router())
app.use('/client', clientRouter.router())
app.use('/contract', contractRouter.router())

//indication of successful listening
app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}, using '${process.env.NODE_ENV}' as environment`);
})

