export const elderlyPastRecord = [

    {
        mapId: "dateInfo",
        // idProperty: 'have_drug_date',
        properties: [
            "have_drug_date"
        ],
        collections: [
            {
                name: 'time',
                mapId: 'timeInfo',
                columnPrefix: 't_'
            }
        ]
    }
    ,
    {
        mapId: "timeInfo",
        idProperty: 'have_drug_time',
        properties: [
            "have_drug_time"
        ],
        collections: [
            {
                name: 'drug',
                mapId: 'drugInfo',
                columnPrefix: 'drug_'
            }
        ]
    },
    {
        mapId: 'drugInfo',
        idProperty: 'drug_details_id',
        properties: [
            "drug_records_id",
            "drug_name",
            "dose",
            "reason_of_taking",
            "isOfficial",
            "status",
            "drug_details_id"
        ]
    }
]