

import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    await knex.transaction(async (trx) => {

        await trx("drugs").del() // no.1
        await trx("permissions").del() // no.2
        await trx("todo_list_status").del() // no.3
        await trx("roles").del() // no.4
        await trx("todo_lists").del() // no.5
        await trx("roles_permission").del() // no.6
        await trx("users").del() // no.7
        await trx("check_out_reasons").del() // no.8
        await trx("edu_levels").del() // no.9
   
        
    
        // no.1 drugs table
        await trx('drugs').insert([
            { name: 'Panadol', image: 'http://bit.ly/2Lnm6Ks' },
            { name: '幸福傷風素', image: 'http://bit.ly/2MQBpOU' },
            { name: 'Ademetionine', image: 'http://bit.ly/2Ukes7G'},
            { name: 'Erythromycin', image: 'http://bit.ly/2ZCpZVb'},
            { name: 'Adderall', image: 'http://bit.ly/2zLMPet'},
            { name: 'Montair 10mg', image: 'https://5.imimg.com/data5/UV/QU/MY-32236360/montair-10mg-500x500.jpg'},
            { name: 'Baclofen', image: 'https://5.imimg.com/data5/QY/UU/MY-32236360/baclofen-500x500.jpg'},
            { name: 'Valtensin降血壓', image: 'http://gia.info.gov.hk/general/201808/01/P2018080100687_photo_1141230.jpg'},
            { name: 'Xeloda Tab 500mg', image: 'http://gia.info.gov.hk/general/201112/28/P201112280469_photo_1034251.JPG'},
            { name: '藿香正氣丸', image: 'https://www.dh.gov.hk/english/press/2012/121003.jpg'},
            { name: 'Allacan 10mg', image: 'https://i.ebayimg.com/images/g/NysAAOSwstNcbaCl/s-l640.jpg'},
            { name: 'Bactozyme Tab 60mg', image: 'http://www.meyerpharm.com.hk/Uploads/Product/55fa7bcc233af.jpg'},
            { name: 'Analmin Forte Tab 500mg', image: 'http://www.meyerpharm.com.hk/Uploads/Product/55fa6c66b57d5.jpg'},
            { name: 'Levophane Extra Tab', image: 'http://www.meyerpharm.com.hk/Uploads/Product/55fa6cf09cad6.jpg'},
            { name: 'Polomin Tab 2mg', image: 'http://www.meyerpharm.com.hk/Uploads/Product/55fa30293df09.jpg'},
        ])
    
        // no.2 permissions table
        await trx('permissions').insert([
            { permission_name: 'getHealthRecord' },
            { permission_name: 'editHealthRecord' },
            { permission_name: 'addPatient' },
            { permission_name: 'editStaffInfo' }
        ])
    
        // no.3 todo_list_status
        await trx('todo_list_status').insert([
            { option: 'pending' },
            { option: 'done' }
        ])
    
        // no.4 roles
        await trx('roles').insert([
            { role: 'generalStaff'},
            { role: 'manager' },
            { role: 'familyMember' }
        ])
    
        // no.5 roles_permission
        await trx('roles_permission').insert([
            { role_id: 1, permission_id: 1 },
            { role_id: 1, permission_id: 2 },
            { role_id: 1, permission_id: 3 },
            { role_id: 2, permission_id: 1 },
            { role_id: 2, permission_id: 2 },
            { role_id: 2, permission_id: 3 },
            { role_id: 2, permission_id: 4 },
            { role_id: 3, permission_id: 3 },
        ])
    
        // no.6 users
        await trx('users').insert([
            { name: "陳真", username: "manager1", password: "$2b$10$FJdMU.rPMr8K9TkGZZq.DuFvv0BLLrfXRqTV6eQRwn7cMjKP6/9EC", isActive: true, role_id: 2 },
            { name: "小龍", username: "generalStaff1", password: "$2b$10$UfJRpVW7qlksaX4IOFCwUOEBVtR3sapKtxFkQ8n/QTPKJ6f2Bmasq", isActive: true, role_id: 1 },
            { name: "大b", username: "familyMember", password: "$2b$10$.2NBBpLWth7nR5.AS8lZfuzSdGjlcJpkxWrbHQuZsM8ZqKCEKCl.K", isActive: true, role_id: 3 },
            { name: "franky", username: "franky", password: "$2b$10$Z8r2NqdcDsSO/01rW697N.Wu.lCz18nmrEcTJTQlfL3jOtqjFRXi6", isActive: true, role_id: 2 },
        ])
    
        // no.7 todo_lists
        await trx('todo_lists').insert([
            { user_id: 2, name: 'drugsDispensed', time: "15:00", status_id: 1 },
            { user_id: 2, name: 'drugsDispensed', time: "15:00", status_id: 2 },
            { user_id: 2, name: 'drugsDispensed', time: "9:00", status_id: 1 },
            { user_id: 2, name: 'drugsDispensed', time: "9:00", status_id: 2 },
            { user_id: 2, name: 'drugsDispensed', time: "21:00", status_id: 1 },
            { user_id: 2, name: 'drugsDispensed', time: "21:00", status_id: 2 },
            { user_id: 2, name: 'drugsPrescribe', time: "9:30", status_id: 1 },
            { user_id: 2, name: 'drugsPrescribe', time: "9:30", status_id: 2 },
            { user_id: 2, name: 'drugsCheck', time: "14:30", status_id: 1 },
            { user_id: 2, name: 'drugsCheck', time: "14:30", status_id: 2 }
        ])
    
        // no.8 check_out_reasons
        await trx('check_out_reasons').insert([
            { reason: "dead", remark: "text" },
            { reason: "changeRestHome", remark: "text" },
            { reason: "others", remark: "text" }
        ])
    
        // no.9 edu_levels
        await trx('edu_levels').insert([
            { edu_level: "noEducation" },
            { edu_level: "canReadNewspaper" },
            { edu_level: "primary" },
            { edu_level: "highSchoolOrBelow" },
            { edu_level: "university" },
        ])
    
  
    })

    
};
 