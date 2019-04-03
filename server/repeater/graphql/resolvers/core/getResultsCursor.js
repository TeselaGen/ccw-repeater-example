const Promise = require('bluebird');
const graphqlFields = require('graphql-fields');


function getResultsCursor(tableName, primaryKeyField, filter, sort, pageNumber, pageSize, info, dataLib, opts) {
    sort = sort || [primaryKeyField];
    pageNumber = pageNumber || 1;
    pageSize = pageSize || 100;

    let initialResult = {};

    let fields = graphqlFields(info);

    if (fields.pageNumber) initialResult.pageNumber = pageNumber;
    if (fields.pageSize) initialResult.pageSize = pageSize;
    if (fields.sort) initialResult.sort = sort;
    if (fields.filter) initialResult.filter = filter;

    let qry = Promise.resolve(initialResult);

    if (fields.results && fields.lastFetched) {
        qry = qry.then((result) => {
            return dataLib.getCurrentTimestamp()
                .then((timestamp) => {
                    result.lastFetched = timestamp;
                    return Promise.resolve(result);
                });
        });
    }

    if (fields.results) {
        let selectFields = Object.keys(fields.results);
        qry = qry.then((result) => {
            return dataLib.entities[tableName].query(selectFields, filter, sort, pageNumber, pageSize, opts)
                .then((results) => {
                    result.results = results;
                    return Promise.resolve(result);
                });
        });
    }

    if (fields.totalResults) {
        qry = qry.then((result) => {
            return dataLib.entities[tableName].count(filter, opts)
                .then((results) => {
                    result.totalResults = results[0].count;
                    return Promise.resolve(result);
                });
        });
    }

    if (fields.typeUpdates) {
        let typeUpdateSelectFields = Object.keys(fields.typeUpdates);
        qry = qry.then((result) => {
            return dataLib.entities['typeUpdate'].query(typeUpdateSelectFields, {}, ['code'], 1, 100000)
                .then((results) => {
                    result.typeUpdates = results;
                    return Promise.resolve(result);
                });
        });
    }
    return qry.then((result) => {
        return Promise.resolve(result);
    });
}

module.exports = getResultsCursor;