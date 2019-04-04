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

async function updateUserLoginsQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.userLogin.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            loginName: stmt.values.loginName,
            loginPassword: stmt.values.loginPassword,
            token: stmt.values.token,
            loginType: stmt.values.loginType,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

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


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.userLogin.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "userLogin", additionalFilter)

        
        return applyFilter(qry("userLogin"), "userLogin", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("userLogin").select("id"), "userLogin", updateFilter);
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

module.exports = updateUserLoginsQuery;