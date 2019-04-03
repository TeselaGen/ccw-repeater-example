 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedTodoRecords(db, records){
 
    let nestedObjects = {
        todoCategory: {
            name: "category",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "todoCategoryId",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "todo");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedTodoRecords;