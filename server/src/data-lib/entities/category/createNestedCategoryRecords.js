const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

function createNestedCategoryRecords(db, recordIds, records){
    let nestedObjects = {
        todos: {
            name: "todo",
            referenceKey: "categoryId",
            list:[]
        },
    };
    
    nestedObjects = populateNestedObjectsForCreate(nestedObjects, records, recordIds);
    
    return this.createNestedObjects(db, nestedObjects);
}

module.exports = createNestedCategoryRecords;