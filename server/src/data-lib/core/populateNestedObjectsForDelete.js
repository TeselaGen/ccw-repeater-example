const { keys, has } = require('lodash');

function populateNestedObjectsForDelete(nestedObjects, records){
    let nestedAttributes = keys(nestedObjects);

    for(let i=0; i < records.length; i++){
        let record = records[i];
        let nestedRecords;


        nestedAttributes.forEach((attrName) => {
            if(has(record, attrName) && record[attrName] != null){
                nestedRecords = record[attrName];
                if(!Array.isArray(nestedRecords)){
                    nestedRecords = [nestedRecords];
                }
                nestedObjects[attrName].list = nestedObjects[attrName].list.concat(nestedRecords);    
            }
        });
    }

    return nestedObjects;
}

module.exports = populateNestedObjectsForDelete;