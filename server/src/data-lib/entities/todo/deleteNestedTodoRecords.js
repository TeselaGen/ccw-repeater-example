const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedTodoRecords(db, records){
        let nestedObjects = {
            category: {
                name: "category",
                list:[]
            },
            user: {
                name: "user",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedTodoRecords;