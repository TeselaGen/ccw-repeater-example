const {
    each,
    assign,
    pick,
    map,
    startsWith,
    has
} = require('lodash');

const Promise = require('bluebird');
const getNestedParentRecords = require('../../core/getNestedParentRecords');
const insertParentRecords = require('../../core/insertParentRecords');
const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const mapAttributesToColumns = require('../../core/mapAttributesToColumns');

async function createTypeUpdates(createRecords, trx, opts){
    let allowQuery = await Promise.resolve(this.entities.typeUpdate.extensions.onCreate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.typeUpdate.extensions.onCreate.records.call(this, createRecords, opts));

    let qry = this.db;

    let dataAccessLib = this;

    let createdTimestamp = new Date();
    records.forEach((rec) => {
            //validate record key values
            if(rec.code && startsWith(rec.code, "&")) 
                throw new Error("Primary key typeUpdate.code = " + rec.code + " starts with the reserved character & ");
            //set timestamps
            rec.createdAt = createdTimestamp;
            //set timestamps
            rec.updatedAt = createdTimestamp;
        });

    let relatedObjects = {
    };
    
    let columnMap = {
        code: "code",
        lastUpdated: "lastUpdated",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        cid: "cid",
    };

    let nestedParentRecords = getNestedParentRecords(relatedObjects, records);
    await insertParentRecords(nestedParentRecords, dataAccessLib, qry);

    let cidsToResolve = getCidReferences(records, columnMap, relatedObjects, "code")
    await resolveCidReferences(cidsToResolve, qry);

    let recordsToInsert = mapAttributesToColumns(records, columnMap);

    return qry
        .batchInsert('typeUpdate', recordsToInsert, 500)
        .returning('code')
        .then((ids) => {
            return this.entities.typeUpdate.createNestedRecords(qry, ids, records)
                .then(()=> {
                        return Promise.resolve(ids);
                });
        });

}

module.exports = createTypeUpdates;