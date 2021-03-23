import * as Knex from "knex";

export class ClientService {
    constructor(private knex: Knex) { }

    getAll = async () => {
        const clients = await this.knex.select('*')
        .from('elderly')
        .orderBy('id', 'asc')
        return clients
    }
}