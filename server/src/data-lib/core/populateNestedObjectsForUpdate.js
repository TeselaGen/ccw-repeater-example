
const { has, keys, startsWith } = require('lodash');

module.exports = function populateNestedObjectsForUpdate(nestedObjects, records, recordModelName){

    let nestedAttributes = keys(nestedObjects);

    for(let i=0; i < records.length; i++){
        let record = records[i];
        let nestedRecords;
        let nestedRecord;

        nestedAttributes.forEach((attrName) => {
            if(has(record, attrName) && record[attrName] != null){
                let isNestedChild = nestedObjects[attrName].hasFkFilter;

                if(isNestedChild){

                    nestedRecords = record[attrName];
                    let referenceKey = nestedObjects[attrName].referenceKey;
                    let targetKey = nestedObjects[attrName].targetKey;
                    if(!Array.isArray(nestedRecords)){
                        nestedRecords = [nestedRecords];
                    }

                    let nestedRecordKey = record[targetKey];
                    
                    if(startsWith(nestedRecordKey, "&")){
                        throw new Error(`Attempting to update a nested child record ${recordModelName}.${attrName} using key: ${nestedRecordKey} which is a cid and currently unsupported`);
                    }

                    let updateItem = {
                        records: nestedRecords,
                        fkFilter: { [referenceKey]: nestedRecordKey }
                    };
    
                    nestedObjects[attrName].list.push(updateItem);
                }else{
                    nestedRecord = record[attrName];
                    let nestedTargetKey = nestedObjects[attrName].targetKey;
                    let referenceKey = nestedObjects[attrName].referenceKey;

                    let nestedRecordKey = nestedRecord[nestedTargetKey];

                    if("" + record[referenceKey] !== "" + nestedRecordKey){
                        if(startsWith(nestedRecordKey, "&")){
                            throw new Error(`Attempting to update a parent record ${recordModelName}.${attrName} using key: ${nestedRecordKey} which is a cid and currently unsupported`);
                        }else{
                            throw new Error(`Attempting to update a parent record ${recordModelName}.${attrName} with key: ${nestedRecordKey} which does not match child's foreign key: ${record[referenceKey]}`);
                        }
                    }
    
                    nestedObjects[attrName].list.push(nestedRecord);
                }

            }
        });
    }

    return nestedObjects;
}