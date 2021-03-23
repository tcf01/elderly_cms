export const drugTime = [

    {
        mapId: "elderlyInfo",
        idProperty: 'elderly_id',
        properties: [
            "elderly_id",
        ],
        collections: [
            {
                name: 'drug',
                mapId: 'drugRecordInfo',
                columnPrefix: 'drug_'
            }
        ]
    },
    {
        mapId: "drugRecordInfo",
        idProperty: 'drug_record_id',
        properties: [
            "drug_name",
            "drug_image",
            "dose",
            "times_per_day",
            "start_date",
            "end_date",
            "authorized_hospital",
            "reason_of_taking",
            "depend_on_need",
            "isOfficial",
        ],
        collections: [
            {
                name: 'drugInterval',
                mapId: 'timeMap',
                columnPrefix: 'time_'
            }
        ]
    },
    {
        mapId: 'timeMap',
        idProperty: 'time_id',
        properties: [
            'time'
        ],
        
    }
]