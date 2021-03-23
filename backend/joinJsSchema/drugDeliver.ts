export const drugDeliver = [

    {
        mapId: "timeInfo",
        idProperty: 'time',
        properties: [
            "time",
            "date"
        ],
        collections: [
            {
                name: 'elderly',
                mapId: 'elderlyDrugsInfo',
                columnPrefix: 'e_'
            }
        ]
    },
    {
        mapId: "elderlyDrugsInfo",
        idProperty: 'elderly_id',
        properties: [
            "elderly_id",
            "name",
            "image",
            "bed_number"
        ],
        collections: [
            {
                name: 'medicine',
                mapId: 'medMapInfo',
                columnPrefix: 'm_'
            }
        ]
    },
    {
        mapId: 'medMapInfo',
        idProperty: 'drug_records_id',
        properties: [
            "drug_records_id",
            "drug_name",
            "dose",
            "reason_of_taking",
            "isOfficial",
            "drug_image",
            "drug_details_id"
        ],
    }
]