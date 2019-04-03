const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countCategory(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.category.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.category.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.category.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.category.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "category", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.category.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "category", additionalFilter)

    let qry = this.db("category").count('* as count');
    
    qry = applyFilter(qry, "category", filter);

    return qry;
}

module.exports = countCategory;