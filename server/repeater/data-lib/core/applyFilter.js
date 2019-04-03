const queryResolver = require('tg-knex-query-resolver');
const tableMap = require('../db/table-map.json');

function applyFilter(qry, modelName, filter){

    if(filter != null){
        let normalizedFilter = queryResolver.convertSimpleFilter(modelName, filter);
        let mappedQuery = queryResolver.mapFieldNames(normalizedFilter, tableMap);
        let parsedFilter = queryResolver.parseQuery(mappedQuery);
        
        qry = queryResolver.resolveQuery(qry, parsedFilter, { filterOnly: true });
    }

    return qry;
}

module.exports = applyFilter;