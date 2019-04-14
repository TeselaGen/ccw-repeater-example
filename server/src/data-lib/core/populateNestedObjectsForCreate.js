
const { has, keys } = require('lodash');

module.exports = function populateNestedObjectsForCreate(nestedObjects, records, recordIds){

    let nestedAttributes = keys(nestedObjects);

    for(let i=0; i < records.length; i++){
        let recordId = recordIds[i];
        let record = records[i];
        let nestedRecords;

        nestedAttributes.forEach((attrName) => {
            if(has(record, attrName) && record[attrName] != null){
                let nestedReferenceKey = nestedObjects[attrName].referenceKey;
                nestedRecords = record[attrName];
                if(!Array.isArray(nestedRecords)){
                    nestedRecords = [nestedRecords];
                }

                nestedRecords.forEach((nestedRec) => {
                    nestedRec[nestedReferenceKey] = recordId;
                });
                
                nestedObjects[attrName].list = nestedObjects[attrName].list.concat(nestedRecords);
    
            }
        });
    }

    return nestedObjects;
}