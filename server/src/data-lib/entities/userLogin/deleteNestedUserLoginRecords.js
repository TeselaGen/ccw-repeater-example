const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedUserLoginRecords(db, records){
        let nestedObjects = {
            user: {
                name: "user",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedUserLoginRecords;