 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedTypeUpdateRecords(db, records){
 
    let nestedObjects = {
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "typeUpdate");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedTypeUpdateRecords;