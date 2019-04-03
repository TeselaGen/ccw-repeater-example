const {
    each,
    assign,
    pick,
    uniq,
    has
} = require('lodash');

const Promise = require('bluebird');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function updateTypeUpdatesQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            lastUpdated: stmt.values.lastUpdated,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
        };
        
        let columnMap = {
            code: "code",
            lastUpdated: "lastUpdated",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "code");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.typeUpdate.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "typeUpdate", additionalFilter)

        
        return applyFilter(qry("typeUpdate"), "typeUpdate", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("typeUpdate").select("code"), "typeUpdate", updateFilter);
                })
                .then((results) => {
                    results.forEach((row) => {
                        updatedIds.push(row.code);
                    });
                    return Promise.resolve();
                });
    })
    .then(() => {
        return Promise.resolve(uniq(updatedIds));
    });

}

module.exports = updateTypeUpdatesQuery;