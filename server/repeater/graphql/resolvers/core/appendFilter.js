const queryResolver = require('tg-knex-query-resolver');

function appendFilter(filter, modelName, additionalFilter){
    if(filter != null && additionalFilter != null){
        var f1 = queryResolver.convertSimpleFilter(modelName, filter);
        var f2 = queryResolver.convertSimpleFilter(modelName, additionalFilter);
        return queryResolver.combineQueries(f1, f2);
    }else if(filter != null){
        return queryResolver.convertSimpleFilter(modelName, filter);
    }else if(additionalFilter != null){
        return queryResolver.convertSimpleFilter(modelName, additionalFilter);
    }else{
        return;
    }
}

module.exports = appendFilter;