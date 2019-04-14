 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedCategoryRecords(db, records){
 
    let nestedObjects = {
        todos: {
            name: "todo",
            hasFkFilter: true,
            referenceKey: "categoryId",
            targetKey: "id",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "category");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedCategoryRecords;