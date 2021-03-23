import { RegistrationFormat } from './../interface';
import * as Knex from 'knex'


export class FamilyMembersService {
    constructor(private knex: Knex) {

    }

    updateProfileUrl = async (id: number, location: string) => {
        this.knex.select('*').from('elderly')
    }

    register = async (basicInfo: RegistrationFormat, file) => {
        console.log('hello, is it there?')
        console.log("FamilyMembersService -register")
        console.log(basicInfo)
        const { name_chi, name_eng, gender, birth_date, id_card_number,
            telephone, check_in_date, address, past_job, edu_level,
            status, emergency_contact }
            = basicInfo;

        // TESTING寫法    
        let location = ""
        if (file !== undefined) {
            location = file.location
        }


        //knex transaction 寫法
        this.knex.transaction(async (trx) => {

            const edu_id = await trx
                .select('id')
                .from('edu_levels')
                .where('edu_level', edu_level)
                .first();

            const marriage_id = await trx
                .select('id')
                .from('marriage_status')
                .where('status', status)
                .first();
            const edu_level_id = edu_id.id;
            const marriage_status_id = marriage_id.id;
            const maxBedNumberArray = await this.knex('elderly').max('bed_number') /*  select('bed_number').from('elderly').max() */
            const bedNumberToInsert = maxBedNumberArray[0].max + 1

            const [elderly_id] = await trx
                .insert({
                    name_chi,
                    name_eng,
                    gender,
                    birth_date,
                    id_card_number,
                    telephone,
                    check_in_date,
                    address,
                    edu_level_id,
                    past_job,
                    bed_number: bedNumberToInsert,
                    marriage_status_id,
                    image: location
                })
                .into("elderly")
                .returning("id");

            const emergencyContactToBeInserted = emergency_contact.map(contact => {
                return { ...contact, elderly_id }
            })

            const contactIDArray = await trx
                .insert(emergencyContactToBeInserted)
                .into("emergency_contact_people")
                .returning("id");

            const contactToBeInserted = contactIDArray.map((emergency_contact_person_id) => {
                return { emergency_contact_person_id, elderly_id }
            });
            console.log("After Knex - returning ");
            console.log(contactToBeInserted);

            await trx
                .insert(contactToBeInserted)
                .into("elderly_emergency_contact_people")
        })
    }
}