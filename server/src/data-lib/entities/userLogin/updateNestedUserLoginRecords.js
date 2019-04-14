 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedUserLoginRecords(db, records){
 
    let nestedObjects = {
        user: {
            name: "user",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "userId",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "userLogin");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedUserLoginRecords;