
const {
    each,
    assign,
    pick,
    reduce,
    startsWith,
    uniq,
    has
} = require('lodash');

const Promise = require('bluebird');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function updateUserLogins(updateRecords, fkFilter, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onUpdate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.userLogin.extensions.onUpdate.records.call(this, updateRecords, opts));

    let qry = this.db;

    let dataLib = this;

    
    
    let ids = [];
    let modifiedTimestamp = new Date();
    return Promise.each(records, async (updateRecord) =>
    {
        let recordId = updateRecord.id;

        if (Object.keys(updateRecord).length <= 1) {
            return Promise.resolve() //no values are actually being updated (just the primary key is getting passed on updateRecord object)
        }

        if(startsWith(recordId, "&")){
            let rec = await qry("userLogin").first("id").where({ cid: recordId.substr(1) });
            recordId = rec.id;
            updateRecord.id = recordId;
        }

        let values = {
                    
            loginName: updateRecord.loginName,
                    
            loginPassword: updateRecord.loginPassword,
                    
            token: updateRecord.token,
                    
            loginType: updateRecord.loginType,
                    
            userId: updateRecord.userId,
                    
            createdAt: updateRecord.createdAt,
                    
            updatedAt: updateRecord.updatedAt,
                    
            cid: updateRecord.cid,
        };

        values = reduce(values, (result, value, key) => {
            if(typeof value !== 'undefined'){
                result[key] = value;
            }
            return result;
        }, {});

        let select = [
            "userId",
            "id",
        ];

        let updateFilter = {
            id: recordId 
        };

        //this is just being used as a linker record
        //no values are actually being updated
        if (Object.keys(values).length < 1) {
            qry("userLogin")
                    .select(select)
                    .where(updateFilter)
                    .first()
            .then((result) => {
                if(result) ids.push(result.id);
                assign(updateRecord, result);
                return Promise.resolve();
            });
        }

        values.updatedAt = modifiedTimestamp;


        if(startsWith(recordId, "&")){
            updateFilter = {
                cid: recordId.substr(1)
            };
        }

        if(fkFilter){
            let fkField = Object.keys(fkFilter)[0];
            delete values[fkField];
            updateFilter[fkField] = fkFilter[fkField];
        }

        updateFilter = await Promise.resolve(dataLib.entities.userLogin.extensions.onUpdate.filter.call(dataLib, updateFilter, opts));

        let additionalFilter = await Promise.resolve(this.entities.userLogin.extensions.onUpdate.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "userLogin", additionalFilter)


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


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id")
        await resolveCidReferences(cidsToResolve, qry, true);

        return applyFilter(qry("userLogin"), "userLogin", updateFilter)
                .update(values)
                .then(() => {
                    return applyFilter(qry("userLogin").select(select), "userLogin", updateFilter)
                           .first();
                })
                .then((result) => {
                    if(result) ids.push(result.id);
                    assign(updateRecord, result);
                    return Promise.resolve();
                });
    })
    .then(() => {
        return this.entities.userLogin.updateNestedRecords(qry, records);
    })
    .then(() => {
        return Promise.resolve(uniq(ids));
    });
}

module.exports = updateUserLogins;