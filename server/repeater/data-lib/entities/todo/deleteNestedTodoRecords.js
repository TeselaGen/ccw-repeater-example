const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedTodoRecords(db, records){
        let nestedObjects = {
            todoCategory: {
                name: "category",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedTodoRecords;