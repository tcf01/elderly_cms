

import * as Knex from "knex";
import * as  moment from "moment";

export async function seed(knex: Knex): Promise<any> {
    await knex.transaction(async (trx) => {

        await trx("elderly_visiting_member_profile").del() // no.22
        await trx("deliver_drug_status").del() // no.23
        await trx("drug_records").del() // no.24
        await trx("log_records").del() // no.26
        await trx("drug_details").del() // no.27
        await trx("catheter_record").del() // no.29
        await trx("temperature_record").del() // no.30
        await trx("blood_sugar_record").del() // no.31
        await trx("basic_contract_terms").del() // no.32
        await trx("additional_contract_terms").del() // no.33
        await trx("elderly_languages").del() // no.34
        await trx("elderly_drug_preset_time").del()


        // no.22 elderly_visiting_member_profile
        await trx('elderly_visiting_member_profile').insert([
            { elderly_id: 1, visiting_member_id: 1 },
            { elderly_id: 2, visiting_member_id: 2 },
        ])

        // no.23 official_deliver_drug_status
        await trx('deliver_drug_status').insert([
            { status: "not_yet_handled", remark: "text" },
            { status: "packed", remark: "text" },
            { status: "checked", remark: "text" },
            { status: "delivered", remark: "text" },
            { status: "home", remark: "text" },
            { status: "hospital", remark: "text" },
            { status: "reject", remark: "text" },
            { status: "others", remark: "text" },
        ])

        // no.24 official_drug_records
        await trx('drug_records').insert([
            { drug_name_id: 1, elderly_id: 1, dose: "5g", times_per_day: 2, start_date: "2019-09-05", end_date: "2020-09-05", depend_on_need: true, authorized_hospital: null, reason_of_taking: "family members asked for", isOfficial: false },
            { drug_name_id: 2, elderly_id: 2, dose: "5g", times_per_day: 2, start_date: "2019-09-02", end_date: "2022-09-10", depend_on_need: false, authorized_hospital: "仁濟醫院", isOfficial: true },
            { drug_name_id: 3, elderly_id: 1, dose: "3ml", times_per_day: 1, start_date: "2019-09-08", end_date: "2019-09-20", depend_on_need: false, authorized_hospital: "浸會醫院", isOfficial: true },
            { drug_name_id: 4, elderly_id: 2, dose: "5ml", times_per_day: 1, start_date: "2019-09-04", end_date: "2019-09-15", depend_on_need: true, authorized_hospital: null, isOfficial: false, reason_of_taking: "vitamin" },
            { drug_name_id: 5, elderly_id: 1, dose: "5g", times_per_day: 2, start_date: "2019-09-05", end_date: "2020-09-05", depend_on_need: true, authorized_hospital: null, reason_of_taking: "family members asked for", isOfficial: false },
            { drug_name_id: 1, elderly_id: 2, dose: "5g", times_per_day: 2, start_date: "2019-09-02", end_date: "2022-09-10", depend_on_need: false, authorized_hospital: "仁濟醫院", isOfficial: true },
            { drug_name_id: 2, elderly_id: 1, dose: "3ml", times_per_day: 1, start_date: "2019-09-08", end_date: "2019-09-20", depend_on_need: false, authorized_hospital: "浸會醫院", isOfficial: true },
            { drug_name_id: 3, elderly_id: 2, dose: "5ml", times_per_day: 1, start_date: "2019-09-04", end_date: "2019-09-15", depend_on_need: true, authorized_hospital: null, isOfficial: false, reason_of_taking: "vitamin" },
            { drug_name_id: 4, elderly_id: 1, dose: "5g", times_per_day: 2, start_date: "2019-09-05", end_date: "2020-09-05", depend_on_need: true, authorized_hospital: null, reason_of_taking: "family members asked for", isOfficial: false },
            { drug_name_id: 5, elderly_id: 2, dose: "5g", times_per_day: 2, start_date: "2019-09-02", end_date: "2022-09-10", depend_on_need: false, authorized_hospital: "仁濟醫院", isOfficial: true },
            { drug_name_id: 6, elderly_id: 3, dose: "5mg", times_per_day: 2, start_date: "2014-09-02", end_date: undefined, depend_on_need: false, authorized_hospital: "東華醫院", isOfficial: true },
            { drug_name_id: 7, elderly_id: 3, dose: "4g", times_per_day: 3, start_date: "2014-09-02", end_date: undefined, depend_on_need: false, authorized_hospital: "東華醫院", isOfficial: true },
            { drug_name_id: 8, elderly_id: 3, dose: "6mg", times_per_day: 3, start_date: "2011-12-02", end_date: undefined, depend_on_need: false, authorized_hospital: "東華醫院", isOfficial: true },
            { drug_name_id: 9, elderly_id: 3, dose: "10mg", times_per_day: 2, start_date: "2011-11-11", end_date: undefined, depend_on_need: false, authorized_hospital: "東華醫院", isOfficial: true },
            { drug_name_id: 10, elderly_id: 3, dose: "8mg", times_per_day: 4, start_date: "2013-04-15", end_date: undefined, depend_on_need: false, authorized_hospital: "東華醫院", isOfficial: true },
            { drug_name_id: 11, elderly_id: 4, dose: "3mg", times_per_day: 4, start_date: "2017-04-15", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 12, elderly_id: 4, dose: "15mg", times_per_day: 2, start_date: "2012-04-10", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 13, elderly_id: 4, dose: "30mg", times_per_day: 2, start_date: "2012-10-10", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 14, elderly_id: 4, dose: "15mg", times_per_day: 1, start_date: "2018-10-05", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 14, elderly_id: 5, dose: "15mg", times_per_day: 1, start_date: "2017-04-05", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 15, elderly_id: 5, dose: "2mg", times_per_day: 2, start_date: "2018-04-14", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 1, elderly_id: 5, dose: "10g", times_per_day: 3, start_date: "2019-04-13", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 2, elderly_id: 5, dose: "10g", times_per_day: 3, start_date: "2017-03-13", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 3, elderly_id: 5, dose: "15g", times_per_day: 2, start_date: "2018-03-24", end_date: undefined, depend_on_need: false, authorized_hospital: "贊育醫院", isOfficial: true },
            { drug_name_id: 1, elderly_id: 6, dose: "1粒", times_per_day: 3, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "鴨脷洲普通科門診診所", reason_of_taking: "飽肚服", isOfficial: true },
            { drug_name_id: 2, elderly_id: 6, dose: "1粒", times_per_day: 2, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "鴨脷洲普通科門診診所", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 5, elderly_id: 6, dose: "2粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "鴨脷洲普通科門診診所", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 6, elderly_id: 6, dose: "1粒", times_per_day: 3, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 8, elderly_id: 6, dose: "1粒", times_per_day: 2, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 9, elderly_id: 6, dose: "1粒", times_per_day: 3, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "李家明醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 10, elderly_id: 6, dose: "半粒", times_per_day: 2, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 12, elderly_id: 6, dose: "1粒", times_per_day: 2, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 13, elderly_id: 6, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉偉中醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 15, elderly_id: 6, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "李家明醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 2, elderly_id: 7, dose: "半粒", times_per_day: 2, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "李家明醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 3, elderly_id: 7, dose: "2粒", times_per_day: 3, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 4, elderly_id: 7, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉偉中醫生", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 5, elderly_id: 7, dose: "半粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 11, elderly_id: 7, dose: "1粒", times_per_day: 3, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "明愛醫院", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 14, elderly_id: 7, dose: "2粒", times_per_day: 4, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉偉中醫生", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 3, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "粉嶺家庭醫學中心", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 4, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉偉中醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 6, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "粉嶺家庭醫學中心", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 7, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "粉嶺家庭醫學中心", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 9, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "粉嶺家庭醫學中心", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 11, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉光曆醫生", reason_of_taking: "", isOfficial: true },
            { drug_name_id: 13, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉光曆醫生", reason_of_taking: "空肚服", isOfficial: true },
            { drug_name_id: 14, elderly_id: 8, dose: "1粒", times_per_day: 1, start_date: "2019-09-05", end_date: undefined, depend_on_need: false, authorized_hospital: "劉光曆醫生", reason_of_taking: "", isOfficial: true },
        ])

        // no.26 log_records
        await trx('log_records').insert([
            { username: "小龍" },
            { username: "陳真" },
            { username: "小龍" },
            { username: "陳真" },
            { username: "陳真" },
            { username: "小龍" },
        ])

        // no.27 drug_details
        await trx('drug_details').insert([
            { drug_record_id: 1, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 1, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "14:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 2, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 2, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "16:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 3, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "13:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 4, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "16:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 5, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "13:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 5, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "19:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 6, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "14:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 6, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "20:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 7, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 8, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "20:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 9, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 9, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 10, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "14:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 10, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 11, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "08:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 11, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "14:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 12, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 12, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 12, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 13, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 13, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 13, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 14, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 14, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 15, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 15, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "08:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 15, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 15, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 16, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 16, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "08:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 16, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 16, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 17, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 17, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 18, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 18, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 19, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 20, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 21, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 21, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 22, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 22, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 22, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 23, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 23, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 23, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 24, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 24, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 25, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 25, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 25, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 26, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 26, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 27, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 28, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 28, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 28, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 29, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 29, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 30, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 30, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 30, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 31, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 31, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 32, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 32, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 33, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 34, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 35, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 35, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 36, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 36, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 36, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 37, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 38, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 39, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 39, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 39, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 40, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 40, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "12:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 40, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "18:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 40, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "21:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 41, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 42, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 43, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 44, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 45, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 46, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 47, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 },
            { drug_record_id: 48, have_drug_date: moment().format('YYYY-MM-DD'), have_drug_time: "06:00", status_id: 1, log_record_id: 6 }
        ])


        // no.29 catheter_record
        await trx('catheter_record').insert([
            { elderly_id: 1, name: "Wong_Yum_Yum", bed_number: 2, date: "2019-08-25", time: "22:00", poop: "soft", urine_color: "white", urine_ml: "80" },
            { elderly_id: 2, name: "Wan_Ho_Ho", bed_number: 3, date: "2019-7-14", time: "18:00", poop: "hard", urine_color: "yellow", urine_ml: "75" },
        ])

        // no.30 temperature_record
        await trx('temperature_record').insert([
            { elderly_id: 1, name: "陳小龍", bed_number: 1, date: "2019-08-26", time: "13:00", temperature_data: "36.8", temperature_unit: "C" },
            { elderly_id: 2, name: "李小菲", bed_number: 2, date: "2019-08-26", time: "14:00", temperature_data: "37", temperature_unit: "F" }
        ])

        // no.31 blood_sugar_record
        await trx('blood_sugar_record').insert([
            { elderly_id: 1, name: "陳小龍", bed_number: 5, date: "2011-05-17", time: "21:30", blood_sugar_data: "95" },
            { elderly_id: 2, name: "李小菲", bed_number: 6, date: "2016-08-17", time: "11:30", blood_sugar_data: "80" },
        ])

        // no.32 basic_contract_terms
        await trx('basic_contract_terms').insert([
            {
                term: `1.每月必須按時繳交月費。
            2.如因任何原因退住本院，必須於一個月前通知院方，通知退住期間必須照常繳交月費，不能以按金代替之。家屬或住院者聯絡人需於住院者退住後一個星期內結清帳目，按金將於帳目結清後發還。
            3.如住院者突然死亡，該月之月費將不獲退還，按金則扣除雜費後退還。 
            4.如住院者患有傳染病，精神失常，行為不檢，對其他人構成危險，本院有權要求住院者 立即退院。
            5.如住院者破壞本院財物，家屬或住院者聯絡人須照價賠償。
            6.住院者可自由進出本院，則他在外發生任何事故或意外，本院概不負費。
            7.嚴重患病者，本院會代送醫院，住院其間，本院會替其保留床位，而月費必須照常按時繳交。 
            8.任何原因需本院職員陪同住院者外出，本院將收取外出費。 
            9.住院者之月費不包括:
              外診費
              出診車費
              紙尿片費
              換藥費
              物理治療費
              插胃管費
              插尿喉費` },
        ])

        // no.33 additional_contract_terms
        await trx('additional_contract_terms').insert([
            { term: "附加合約條款：冷氣費：(5日至10月):每月$200 陪診費： $200 (4小時)，之後每小時$50，另加實報實銷車費 尿片費" },
        ])

        // no.34 elderly_languages
        await trx('elderly_languages').insert([
            { elderly_id: 1, language_id: 1 },
            { elderly_id: 1, language_id: 2 },
            { elderly_id: 1, language_id: 3 },
            { elderly_id: 2, language_id: 1 },
        ])
        await trx("elderly_drug_preset_time").insert([{ drug_record_id: 1, preset_time: "1200" },
        { drug_record_id: 1, preset_time: "1400" },
        { drug_record_id: 2, preset_time: "1200" },
        { drug_record_id: 2, preset_time: "1600" },
        { drug_record_id: 3, preset_time: "1300" },
        { drug_record_id: 4, preset_time: "1600" },
        { drug_record_id: 5, preset_time: "1300" },
        { drug_record_id: 5, preset_time: "1900" },
        { drug_record_id: 6, preset_time: "1400" },
        { drug_record_id: 6, preset_time: "2000" },
        { drug_record_id: 7, preset_time: "2100" },
        { drug_record_id: 8, preset_time: "2000" },
        { drug_record_id: 9, preset_time: "1800" },
        { drug_record_id: 9, preset_time: "2100" },
        { drug_record_id: 10, preset_time: "1400" },
        { drug_record_id: 10, preset_time: "2100" },
        { drug_record_id: 11, preset_time: "0800" },
        { drug_record_id: 11, preset_time: "1400" },
        { drug_record_id: 12, preset_time: "0600" },
        { drug_record_id: 12, preset_time: "1200" },
        { drug_record_id: 12, preset_time: "2100" },
        { drug_record_id: 13, preset_time: "0600" },
        { drug_record_id: 13, preset_time: "1200" },
        { drug_record_id: 13, preset_time: "2100" },
        { drug_record_id: 14, preset_time: "0600" },
        { drug_record_id: 14, preset_time: "1200" },
        { drug_record_id: 15, preset_time: "0600" },
        { drug_record_id: 15, preset_time: "1200" },
        { drug_record_id: 15, preset_time: "1800" },
        { drug_record_id: 15, preset_time: "0800" },
        { drug_record_id: 16, preset_time: "0600" },
        { drug_record_id: 16, preset_time: "1200" },
        { drug_record_id: 16, preset_time: "1800" },
        { drug_record_id: 16, preset_time: "0800" },
        { drug_record_id: 17, preset_time: "0600" },
        { drug_record_id: 17, preset_time: "1200" },
        { drug_record_id: 18, preset_time: "0600" },
        { drug_record_id: 18, preset_time: "1200" },
        { drug_record_id: 19, preset_time: "0600" },
        { drug_record_id: 20, preset_time: "0600" },
        { drug_record_id: 21, preset_time: "0600" },
        { drug_record_id: 21, preset_time: "1200" },
        { drug_record_id: 22, preset_time: "0600" },
        { drug_record_id: 22, preset_time: "1200" },
        { drug_record_id: 22, preset_time: "1800" },
        { drug_record_id: 23, preset_time: "0600" },
        { drug_record_id: 23, preset_time: "1200" },
        { drug_record_id: 23, preset_time: "1800" },
        { drug_record_id: 24, preset_time: "0600" },
        { drug_record_id: 24, preset_time: "1200" },
        { drug_record_id: 25, preset_time: "0600" },
        { drug_record_id: 25, preset_time: "1200" },
        { drug_record_id: 25, preset_time: "1800" },
        { drug_record_id: 26, preset_time: "0600" },
        { drug_record_id: 26, preset_time: "1200" },
        { drug_record_id: 27, preset_time: "0600" },
        { drug_record_id: 28, preset_time: "0600" },
        { drug_record_id: 28, preset_time: "1200" },
        { drug_record_id: 28, preset_time: "1800" },
        { drug_record_id: 29, preset_time: "0600" },
        { drug_record_id: 29, preset_time: "1200" },
        { drug_record_id: 30, preset_time: "0600" },
        { drug_record_id: 30, preset_time: "1200" },
        { drug_record_id: 30, preset_time: "1800" },
        { drug_record_id: 31, preset_time: "0600" },
        { drug_record_id: 31, preset_time: "1200" },
        { drug_record_id: 32, preset_time: "0600" },
        { drug_record_id: 32, preset_time: "1200" },
        { drug_record_id: 33, preset_time: "0600" },
        { drug_record_id: 34, preset_time: "0600" },
        { drug_record_id: 35, preset_time: "0600" },
        { drug_record_id: 35, preset_time: "1200" },
        { drug_record_id: 36, preset_time: "0600" },
        { drug_record_id: 36, preset_time: "1200" },
        { drug_record_id: 36, preset_time: "1800" },
        { drug_record_id: 37, preset_time: "0600" },
        { drug_record_id: 38, preset_time: "0600" },
        { drug_record_id: 39, preset_time: "0600" },
        { drug_record_id: 39, preset_time: "1200" },
        { drug_record_id: 39, preset_time: "1800" },
        { drug_record_id: 40, preset_time: "0600" },
        { drug_record_id: 40, preset_time: "1200" },
        { drug_record_id: 40, preset_time: "1800" },
        { drug_record_id: 40, preset_time: "2100" },
        { drug_record_id: 41, preset_time: "0600" },
        { drug_record_id: 42, preset_time: "0600" },
        { drug_record_id: 43, preset_time: "0600" },
        { drug_record_id: 44, preset_time: "0600" },
        { drug_record_id: 45, preset_time: "0600" },
        { drug_record_id: 46, preset_time: "0600" },
        { drug_record_id: 47, preset_time: "0600" },
        { drug_record_id: 48, preset_time: "0600" }])
    })
};
