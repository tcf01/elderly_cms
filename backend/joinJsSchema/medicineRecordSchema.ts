export const medicineRecordSchema = [
    {
        mapId: "elderlyInfo",
        idProperty: 'elderly_id',
        properties: [
            "elderly_id",
            "elderly_image",
            "elderly_chi_name",
            "elderly_eng_name",
            "elderly_bed_number"
        ],
        collections: [
            {
                name: 'drug_basic_info',
                mapId: 'drugBasicInfoMap',
                columnPrefix: 'drugBI_'
            }
        ]
    },
    {
        mapId: 'drugBasicInfoMap',
        idProperty: 'drug_records_id',
        properties: [
            'name',
            'dose',
            'image',
            'times_per_day',
            'start_date',
            'end_date',
            'depend_on_need',
            'authorized_hospital',
            'isOfficial',
            'reason_of_taking'
        ],
        collections: [
            {
                name: 'drug_details',
                mapId: 'drugDetails',
                columnPrefix: 'drugD_'
            }
        ]
    },
    {
        mapId: 'drugDetails',
        idProperty: 'drug_details_id',
        properties: [
            'have_drug_time',
            'status_id',
            'remark',
        ]
    }
]