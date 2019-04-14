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

async function updateCategoriesQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.category.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.category.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            name: stmt.values.name,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
        };
        
        let columnMap = {
            id: "id",
            name: "name",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.category.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "category", additionalFilter)

        
        return applyFilter(qry("category"), "category", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("category").select("id"), "category", updateFilter);
                })
                .then((results) => {
                    results.forEach((row) => {
                        updatedIds.push(row.id);
                    });
                    return Promise.resolve();
                });
    })
    .then(() => {
        return Promise.resolve(uniq(updatedIds));
    });

}

module.exports = updateCategoriesQuery;