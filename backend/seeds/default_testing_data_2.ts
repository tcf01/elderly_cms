

import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    await knex.transaction(async (trx) => {

        await trx("marriage_status").del() // no.11
        await trx("languages").del() // no.12
        await trx("religion_status").del() // no.13
        await trx("economic_status").del() // no.14
        await trx("social_activities_profile").del() // no.15
        await trx("visiting_member_profile").del() // no.16
        await trx("elderly").del() // no.17
        await trx("emergency_contact_people").del() // no.10
        await trx("elderly_emergency_contact_people").del() // no.18
        await trx("elderly_religion_status").del() // no.19
        await trx("elderly_economic_status").del() // no.20
        await trx("elderly_social_activity_profile").del() // no.21




        // no.11 marriage_status
        await trx('marriage_status').insert([
            { status: "single" },
            { status: "married" },
            { status: "separate" },
            { status: "divorce" },
            { status: "widow" }
        ])

        // no.12 languages
        await trx('languages').insert([
            { language: "廣東話", remark: "text" },
            { language: "潮州話", remark: "text" },
            { language: "福建話", remark: "text" },
            { language: "客家話", remark: "text" },
            { language: "上海話", remark: "text" },
            { language: "國語", remark: "text" },
            { language: "其他", remark: "text" }
        ])

        // no.13 religion_status
        await trx('religion_status').insert([
            { religion: "天主教", remark: "text" },
            { religion: "基督教", remark: "text" },
            { religion: "佛教", remark: "text" },
            { religion: "回教", remark: "text" },
            { religion: "其他", remark: "text" },
        ])

        // no.14 economic_status
        await trx('economic_status').insert([
            { status: "經濟獨立", remark: "text" },
            { status: "家人供養", remark: "text" },
            { status: "高齡津貼（高）", remark: "text" },
            { status: "高齡津貼（低）", remark: "text" },
            { status: "傷殘津貼（高）", remark: "text" },
            { status: "傷殘津貼（低）", remark: "text" },
            { status: "綜緩", remark: "text" },
        ])

        // no.15 social_activities_profile
        await trx('social_activities_profile').insert([
            { activity: "社區中心", remark: "text" },
            { activity: "教會", remark: "text" },
        ])

        // no.16 visiting_member_profile
        await trx('visiting_member_profile').insert([
            { name: "Wong_Kwan_Ying", visiting_time: "15:00" },
            { name: "Kwong_Kwan_Sing", visiting_time: "16:30" }
        ])

        // no.17 elderly
        await trx('elderly').insert([
            { name_chi: "陳小龍", bed_number: 1, name_eng: "Chan Siu Long", image: "http://bit.ly/2Pl2vQl", gender: "M", birth_date: "1930-01-29", id_card_number: "Z215440(3)", telephone: 62514235, check_in_date: "2000-02-18", check_out_date: "2018-11-29", check_out_reason: 1, address: "Hong Kong", edu_level_id: 2, past_job: "officer", marriage_status_id: 1 },
            { name_chi: "李小菲", bed_number: 2, name_eng: "Lee Siu Mei", image: "http://bit.ly/2ZoGDIp", gender: "F", birth_date: "1944-10-29", id_card_number: "Z518112(2)", telephone: 56845217, check_in_date: "2018-01-01", check_out_reason: 2, address: "Hong Kong", edu_level_id: 1, past_job: "worker", marriage_status_id: 2 },
            { name_chi: "王芯林", bed_number: 3, name_eng: "Wong Sum Lam", image: "https://g6.psychcentral.com/news/u/2018/05/elderly-Chinese-man-worry-sad-large-bigstock-768x576.jpg", gender: "M", birth_date: "1950-04-21", id_card_number: "K521365(4)", telephone: 63254125, check_in_date: "2017-03-14", check_out_reason: 2, address: "Hong Kong", edu_level_id: 1, past_job: "programmer", marriage_status_id: 3 },
            { name_chi: "陳施君", bed_number: 4, name_eng: "Chan Sze Kwan", image: "https://sporteluxe.com/wp-content/uploads/2016/09/chinese-herbs4-768x584.jpg", gender: "F", birth_date: "1936-02-28", id_card_number: "M125435(4)", telephone: 91254785, check_in_date: "2014-03-11", check_out_reason: 1, address: "Hong Kong", edu_level_id: 4, past_job: "housewife", marriage_status_id: 5 },
            { name_chi: "王偉雄", bed_number: 5, name_eng: "Wong Wai Hung", image: "https://www.coresponsibility.com/wp-content/uploads/2016/07/elderly-chinese-man-17.jpg", gender: "M", birth_date: "1943-02-02", id_card_number: "K523012(4)", telephone: 65236521, check_in_date: "2012-01-11", check_out_reason: 3, address: "Hong Kong", edu_level_id: 1, past_job: "teacher", marriage_status_id: 1 },
            { name_chi: "王偉江", bed_number: 6, name_eng: "Wong Wai Kwong", image: "https://ak8.picdn.net/shutterstock/videos/6193838/thumb/10.jpg", gender: "M", birth_date: "1954-06-02", id_card_number: "K254125(4)", telephone: 63250012, check_in_date: "2016-01-11", check_out_reason: 2, address: "Hong Kong", edu_level_id: 3, past_job: "teacher", marriage_status_id: 2 },
            { name_chi: "何嘉堅", bed_number: 7, name_eng: "Ho Ka Kin", image: "https://ak4.picdn.net/shutterstock/videos/24375524/thumb/7.jpg", gender: "M", birth_date: "1948-12-02", id_card_number: "K512010(4)", telephone: 93205200, check_in_date: "2010-01-11", check_out_reason: 1, address: "Hong Kong", edu_level_id: 2, past_job: "MTR", marriage_status_id: 3 },
            { name_chi: "陳錦荃", bed_number: 8, name_eng: "Chan Kum Tsuen", image: "https://ichef.bbci.co.uk/news/624/cpsprodpb/2FA0/production/_87329121_nun976.jpg", gender: "M", birth_date: "1962-12-02", id_card_number: "M251211(4)", telephone: 96654102, check_in_date: "2011-01-11", check_out_reason: 2, address: "Hong Kong", edu_level_id: 4, past_job: "driver", marriage_status_id: 4 },
        ])

        // no.10 emergency_contact_people
        await trx('emergency_contact_people').insert([
            { elderly_id: 1, name: "Chan Siu Mui", id_card_number: "Z123456(1)", relation_with_elderly: "daugther", telephone: "52145874", address: "Hong Kong", contact_priority: "36253142" },
            { elderly_id: 2, name: "Wong Sin Sit", id_card_number: "K122456(1)", relation_with_elderly: "son", telephone: "58456321", address: "Hong Kong", contact_priority: "25142458" },
            { elderly_id: 3, name: "Chan Fiu Hung", id_card_number: "M351204(1)", relation_with_elderly: "son", telephone: "62541235", address: "Hong Kong", contact_priority: "31512458" },
            { elderly_id: 4, name: "Ho Fung Ling", id_card_number: "M251354(2)", relation_with_elderly: "daugther", telephone: "65214253", address: "Hong Kong", contact_priority: "65214253" },
            { elderly_id: 5, name: "Ho Ka Ki", id_card_number: "B251230(2)", relation_with_elderly: "daugther", telephone: "95214510", address: "Hong Kong", contact_priority: "95214510" },
            { elderly_id: 6, name: "Ng Ho Ming", id_card_number: "Y252510(2)", relation_with_elderly: "son", telephone: "54121011", address: "Hong Kong", contact_priority: "54121011" },
            { elderly_id: 7, name: "Chan Wai Ho", id_card_number: "Y472510(2)", relation_with_elderly: "son", telephone: "63200012", address: "Hong Kong", contact_priority: "63200012" },
            { elderly_id: 8, name: "Chan Mun Yum", id_card_number: "B251235(2)", relation_with_elderly: "son", telephone: "96521044", address: "Hong Kong", contact_priority: "96521044" },
        ])


        // no.18 elderly_emergency_contact_people
        await trx('elderly_emergency_contact_people').insert([
            { elderly_id: 1, emergency_contact_person_id: 1 },
            { elderly_id: 2, emergency_contact_person_id: 2 },
            { elderly_id: 3, emergency_contact_person_id: 3 },
            { elderly_id: 4, emergency_contact_person_id: 4 },
            { elderly_id: 5, emergency_contact_person_id: 5 },
            { elderly_id: 6, emergency_contact_person_id: 6 },
            { elderly_id: 7, emergency_contact_person_id: 7 },
            { elderly_id: 8, emergency_contact_person_id: 8 },
        ])

        // no.19 elderly_religion_status
        await trx('elderly_religion_status').insert([
            { elderly_id: 1, religion_status_id: 3 },
            { elderly_id: 2, religion_status_id: 2 },
        ])

        // no.20 elderly_economic_status
        await trx('elderly_economic_status').insert([
            { elderly_id: 1, economic_status_id: 2 },
            { elderly_id: 2, economic_status_id: 5 }
        ])

        // no.21 elderly_social_activity_profile
        await trx('elderly_social_activity_profile').insert([
            { elderly_id: 1, social_activity_profile_id: 1 },
            { elderly_id: 2, social_activity_profile_id: 2 },
        ])


    })

};
