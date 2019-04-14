const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countTodo(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.todo.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.todo.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.todo.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.todo.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "todo", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.todo.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "todo", additionalFilter)

    let qry = this.db("todo").count('* as count');
    
    qry = applyFilter(qry, "todo", filter);

    return qry;
}

module.exports = countTodo;