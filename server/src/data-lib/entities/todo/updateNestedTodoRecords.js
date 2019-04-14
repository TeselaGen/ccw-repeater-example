 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedTodoRecords(db, records){
 
    let nestedObjects = {
        category: {
            name: "category",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "categoryId",
            list:[]
        },
        user: {
            name: "user",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "userId",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "todo");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedTodoRecords;