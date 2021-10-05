const template = {
    entityTypes: [
        'driveItem'
    ],
    query: {},
    fields: [
        // TODO fields from request and field names from constants.js
        'id',
        'name',
        'title',
        'webUrl',
        'createdBy',
        'createdDateTime',
        'size'
    ],
    // TODO pagination
    from: 0,
    size: 9
    // TODO orderBy
}

export default function (queryString, fields) {
    return ({
        requests: [
            {
                ...template,
                query: {...template.query, queryString},
                fields: (Array.isArray(fields) && fields.length > 0) ? fields : template.fields
            }
        ]
    })

}
