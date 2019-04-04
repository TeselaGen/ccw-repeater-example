const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countUserLogin(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.userLogin.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.userLogin.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.userLogin.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "userLogin", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.userLogin.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "userLogin", additionalFilter)

    let qry = this.db("userLogin").count('* as count');
    
    qry = applyFilter(qry, "userLogin", filter);

    return qry;
}

module.exports = countUserLogin;