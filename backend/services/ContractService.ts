import * as Knex from "knex";

export class ContractService {
    constructor(private knex: Knex) { }

    getContract = async () => {
        const contract = await this.knex.select('id', 'term').from('basic_contract_terms').first()
        return contract.term
    }

    getAdditionContract = async () => {
        const additionContract = await this.knex.select('id', 'term').from('additional_contract_terms').first()
        return additionContract.term
    }
}