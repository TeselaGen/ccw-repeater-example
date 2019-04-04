const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedUserRecords(db, records){
        let nestedObjects = {
            userLogins: {
                name: "userLogin",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedUserRecords;