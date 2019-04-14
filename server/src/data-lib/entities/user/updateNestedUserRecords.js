 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedUserRecords(db, records){
 
    let nestedObjects = {
        userLogins: {
            name: "userLogin",
            hasFkFilter: true,
            referenceKey: "userId",
            targetKey: "id",
            list:[]
        },
        todos: {
            name: "todo",
            hasFkFilter: true,
            referenceKey: "userId",
            targetKey: "id",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "user");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedUserRecords;