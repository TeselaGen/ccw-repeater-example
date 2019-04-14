const { isNumber } = require('lodash');
const queryResolver = require('tg-knex-query-resolver');
const applyFilter = require('./applyFilter');
const tableMap = require('../db/table-map.json');

function buildQuery(qry, tableColumns, entityName, modelName, select, filter, sortBy, pageNumber, pageSize){
        
    qry = qry(tableMap[entityName].tableName).select(select);
    
    qry = applyFilter(qry, modelName, filter);

    if(sortBy){
        sortBy.forEach((fieldName) => {
            if(fieldName.indexOf('-') === 0){
                qry = qry.orderBy(tableColumns[fieldName.substr(1)], 'desc');
            }else{
                qry = qry.orderBy(tableColumns[fieldName], 'asc');
            }
        });
    }else{
        qry = qry.orderBy(tableMap[entityName].primaryKeyField, 'asc');
    }
    
    if(isNumber(pageNumber) && isNumber(pageSize)){
        let offset = (pageNumber - 1) * pageSize;
        qry = qry.limit(pageSize).offset(offset);
    }

    return qry;
}

module.exports = buildQuery;