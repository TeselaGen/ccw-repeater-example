const { keys } = require('lodash');
const Promise = require('bluebird');

function insertParentRecords(nestedParentRecords, dataAccessLib, qry){
    let parentModels = keys(nestedParentRecords);

    return Promise.each(parentModels, (modelName) => {

        let parentRecordsInsertDef = nestedParentRecords[modelName];

        let parentRecords = parentRecordsInsertDef.map((def) => { return def.record; });

        return dataAccessLib.entities[modelName]
                            .create(parentRecords, qry)
                            .then((ids) => {
                                parentRecordsInsertDef.forEach((def, index) => {
                                    const fkValue = ids[index];
                                    def.childRecord[def.referenceKey] = fkValue;
                                });
                            });
    });
}

module.exports = insertParentRecords;