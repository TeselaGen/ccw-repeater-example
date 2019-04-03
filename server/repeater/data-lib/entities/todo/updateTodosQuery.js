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

async function updateTodosQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.todo.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.todo.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            description: stmt.values.description,
            name: stmt.values.name,
            status: stmt.values.status,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
            todoCategory: {
                modelName: "category",
                referenceKey: "todoCategoryId",
                targetTable: "category",
                targetKeyColumn: "id"   
            },
        };
        
        let columnMap = {
            description: "description",
            id: "id",
            name: "name",
            todoCategoryId: "todoCategoryId",
            status: "status",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "Id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.todo.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "todo", additionalFilter)

        
        return applyFilter(qry("todo"), "todo", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("todo").select("Id"), "todo", updateFilter);
                })
                .then((results) => {
                    results.forEach((row) => {
                        updatedIds.push(row.Id);
                    });
                    return Promise.resolve();
                });
    })
    .then(() => {
        return Promise.resolve(uniq(updatedIds));
    });

}

module.exports = updateTodosQuery;