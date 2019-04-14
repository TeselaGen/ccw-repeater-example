const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedTypeUpdateRecords(db, records){
        let nestedObjects = {
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedTypeUpdateRecords;