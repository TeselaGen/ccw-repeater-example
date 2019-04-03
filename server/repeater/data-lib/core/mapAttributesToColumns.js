const { keys, has } = require('lodash');

function mapAttributesToColumns(records, columnMap){
    let dbRecords = [];
    let attributes = keys(columnMap);

    records.forEach((rec) => {
        let dbRec = {};
        attributes.forEach((attrName) => {
            if(has(rec, attrName)){
                let columnName = columnMap[attrName];
                dbRec[columnName] = rec[attrName];
            }
        });
        dbRecords.push(dbRec);
    });

    return dbRecords;
}

module.exports = mapAttributesToColumns;