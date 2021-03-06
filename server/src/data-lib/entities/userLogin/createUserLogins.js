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

async function createUserLogins(createRecords, trx, opts){
    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onCreate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.userLogin.extensions.onCreate.records.call(this, createRecords, opts));

    let qry = this.db;

    let dataAccessLib = this;

    let createdTimestamp = new Date();
    records.forEach((rec) => {
            //validate record key values
            if(rec.id && startsWith(rec.id, "&")) 
                throw new Error("Primary key userLogin.id = " + rec.id + " starts with the reserved character & ");
            //set timestamps
            rec.createdAt = createdTimestamp;
            //set timestamps
            rec.updatedAt = createdTimestamp;
        });

    let relatedObjects = {
        user: {
            modelName: "user",
            referenceKey: "userId",
            targetTable: "user",
            targetKeyColumn: "id"   
        },
    };
    
    let columnMap = {
        loginName: "loginName",
        loginPassword: "loginPassword",
        token: "token",
        loginType: "loginType",
        userId: "userId",
        id: "id",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        cid: "cid",
    };

    let nestedParentRecords = getNestedParentRecords(relatedObjects, records);
    await insertParentRecords(nestedParentRecords, dataAccessLib, qry);

    let cidsToResolve = getCidReferences(records, columnMap, relatedObjects, "id")
    await resolveCidReferences(cidsToResolve, qry);

    let recordsToInsert = mapAttributesToColumns(records, columnMap);

    return qry
        .batchInsert('userLogin', recordsToInsert, 500)
        .returning('id')
        .then((ids) => {
            return this.entities.userLogin.createNestedRecords(qry, ids, records)
                .then(()=> {
                        return Promise.resolve(ids);
                });
        });

}

module.exports = createUserLogins;