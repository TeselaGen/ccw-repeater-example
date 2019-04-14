const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

function createNestedUserRecords(db, recordIds, records){
    let nestedObjects = {
        userLogins: {
            name: "userLogin",
            referenceKey: "userId",
            list:[]
        },
        todos: {
            name: "todo",
            referenceKey: "userId",
            list:[]
        },
    };
    
    nestedObjects = populateNestedObjectsForCreate(nestedObjects, records, recordIds);
    
    return this.createNestedObjects(db, nestedObjects);
}

module.exports = createNestedUserRecords;