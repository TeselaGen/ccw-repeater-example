
const { has, keys } = require('lodash');

function getNestedParentRecords(nestedParentObjects, records){
    let parentRecordsToInsert = {};
    let nestedAttributes = keys(nestedParentObjects);

    records.forEach((record) => {
        nestedAttributes.forEach((attrName) => {
            if(has(record, attrName) && record[attrName] != null){
                let modelName = nestedParentObjects[attrName].modelName;
                let referenceKey = nestedParentObjects[attrName].referenceKey;

                if(!parentRecordsToInsert[modelName]) parentRecordsToInsert[modelName] = [];

                parentRecordsToInsert[modelName].push({
                    modelName,  
                    record: record[attrName],
                    referenceKey,
                    childRecord: record
                });
            }
        });
    });

    return parentRecordsToInsert;
}

module.exports = getNestedParentRecords;