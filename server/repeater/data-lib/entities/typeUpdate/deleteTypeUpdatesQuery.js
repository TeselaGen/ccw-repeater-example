const Promise = require('bluebird');
const { each } = require('lodash');

const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function deleteTypeUpdatesQuery(deleteStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.typeUpdate.extensions.onDeleteQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let statements = await Promise.resolve(this.entities.typeUpdate.extensions.onDeleteQuery.statements.call(this, deleteStatements, opts));

    let qry = this.db;
    
    

    let deletedCount = 0;

    return Promise.each(statements, async (stmt) =>
    {
        let deleteFilter = stmt;

        let additionalFilter = await Promise.resolve(this.entities.typeUpdate.extensions.onDeleteQuery.appendFilter.call(this, opts));
        if(additionalFilter) deleteFilter = appendFilter(deleteFilter, "typeUpdate", additionalFilter)

        return applyFilter(qry("typeUpdate"), "typeUpdate", deleteFilter)
                .del()
                .then((numDeleted) => {
                    deletedCount += numDeleted;
                });
    })
    .then(() => {
        return Promise.resolve(deletedCount);
    });
} 

module.exports = deleteTypeUpdatesQuery;