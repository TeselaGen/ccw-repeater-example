const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countUser(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.user.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.user.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.user.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.user.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "user", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.user.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "user", additionalFilter)

    let qry = this.db("user").count('* as count');
    
    qry = applyFilter(qry, "user", filter);

    return qry;
}

module.exports = countUser;