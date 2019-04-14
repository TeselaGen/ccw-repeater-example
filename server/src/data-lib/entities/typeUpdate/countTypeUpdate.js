const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countTypeUpdate(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.typeUpdate.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.typeUpdate.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.typeUpdate.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.typeUpdate.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "typeUpdate", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.typeUpdate.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "typeUpdate", additionalFilter)

    let qry = this.db("typeUpdate").count('* as count');
    
    qry = applyFilter(qry, "typeUpdate", filter);

    return qry;
}

module.exports = countTypeUpdate;