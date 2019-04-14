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

async function updateUsersQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.user.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.user.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            email: stmt.values.email,
            firstName: stmt.values.firstName,
            lastName: stmt.values.lastName,
            username: stmt.values.username,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
        };
        
        let columnMap = {
            email: "email",
            firstName: "firstName",
            id: "id",
            lastName: "lastName",
            username: "username",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.user.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "user", additionalFilter)

        
        return applyFilter(qry("user"), "user", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("user").select("id"), "user", updateFilter);
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

module.exports = updateUsersQuery;