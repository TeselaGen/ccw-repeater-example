const Promise = require('bluebird');
const { each } = require('lodash');

const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function deleteUserLogins(records, trx, opts){
    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onDelete.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let qry = this.db;
    
    let ids = [];

    each(records, (rec) => {
        ids.push(rec.id);
    });

    let deleteFilter = { "id": ids };

    deleteFilter = await Promise.resolve(this.entities.userLogin.extensions.onDelete.filter.call(this, deleteFilter, opts));

    let additionalFilter = await Promise.resolve(this.entities.userLogin.extensions.onDelete.appendFilter.call(this, opts));
    if(additionalFilter) deleteFilter = appendFilter(deleteFilter, "userLogin", additionalFilter)

    let deletedCount = 0;

    return this.entities.userLogin.deleteNestedRecords(qry, records)
            .then((numDeleted) => {
                deletedCount += numDeleted;
                return applyFilter(qry("userLogin"), "userLogin", deleteFilter)
                        .del()
                        .then((numDeleted) => {
                                deletedCount += numDeleted;
                        });
                
            })
            .then(() => {
                return Promise.resolve(deletedCount);
            });

}

module.exports = deleteUserLogins;