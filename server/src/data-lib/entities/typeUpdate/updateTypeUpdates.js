
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

async function updateTypeUpdates(updateRecords, fkFilter, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdate.records.call(this, updateRecords, opts));

    let qry = this.db;

    let dataLib = this;

    
    
    let ids = [];
    let modifiedTimestamp = new Date();
    return Promise.each(records, async (updateRecord) =>
    {
        let recordId = updateRecord.code;

        if (Object.keys(updateRecord).length <= 1) {
            return Promise.resolve() //no values are actually being updated (just the primary key is getting passed on updateRecord object)
        }

        if(startsWith(recordId, "&")){
            let rec = await qry("typeUpdate").first("code").where({ cid: recordId.substr(1) });
            recordId = rec.code;
            updateRecord.code = recordId;
        }

        let values = {
                    
            lastUpdated: updateRecord.lastUpdated,
                    
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
            "code",
        ];

        let updateFilter = {
            code: recordId 
        };

        //this is just being used as a linker record
        //no values are actually being updated
        if (Object.keys(values).length < 1) {
            qry("typeUpdate")
                    .select(select)
                    .where(updateFilter)
                    .first()
            .then((result) => {
                if(result) ids.push(result.code);
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

        updateFilter = await Promise.resolve(dataLib.entities.typeUpdate.extensions.onUpdate.filter.call(dataLib, updateFilter, opts));

        let additionalFilter = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdate.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "typeUpdate", additionalFilter)


        let relatedObjects = {
        };
        
        let columnMap = {
            code: "code",
            lastUpdated: "lastUpdated",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "code")
        await resolveCidReferences(cidsToResolve, qry, true);

        return applyFilter(qry("typeUpdate"), "typeUpdate", updateFilter)
                .update(values)
                .then(() => {
                    return applyFilter(qry("typeUpdate").select(select), "typeUpdate", updateFilter)
                           .first();
                })
                .then((result) => {
                    if(result) ids.push(result.code);
                    assign(updateRecord, result);
                    return Promise.resolve();
                });
    })
    .then(() => {
        return this.entities.typeUpdate.updateNestedRecords(qry, records);
    })
    .then(() => {
        return Promise.resolve(uniq(ids));
    });
}

module.exports = updateTypeUpdates;