const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedCategoryRecords(db, records){
        let nestedObjects = {
            todos: {
                name: "todo",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedCategoryRecords;