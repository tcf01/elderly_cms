import { hashPassword } from "../passport/hash";
// import { User } from "../interface";
import * as Knex from 'knex'


export class AuthService {

    constructor(private knex: Knex) { }

    getUsers = async () => {
        const users = await this.knex.select('*').from('users')
        return users
    }

    getUserById = async (id: number) => {
        /* select * from users where username = <username> limit 1*/
        return this.knex.select('*').from("users").where('id', id)
    }

    getUserByUsername = async (username: string) => {
        /* select * from users where username = <username> limit 1*/
        return this.knex.select('*').from("users").where('username', username)
    }

    registerUser = async (userInput: any) => {
        console.log(userInput.username)
        const match = await this.getUserByUsername(userInput.username);
        console.log(match)

        if (match.length > 0) {
            throw new Error("Duplicated username");
        } else {
            console.log(123)
            const basicUserInfo = await this.knex('users').insert(
                {
                    name: userInput.name,
                    username: userInput.username,
                    password: await hashPassword(userInput.password),
                    isActive: true,
                    role_id: userInput.role_id
                    // email: userInput.email,
                    // age: parseInt(userInput.age),
                    // gender: userInput.gender
                }
            ).returning(['id']);
            console.log(basicUserInfo)
            return [basicUserInfo]
        }
    }

}




