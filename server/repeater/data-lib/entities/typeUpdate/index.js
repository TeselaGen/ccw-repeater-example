const queryTypeUpdate = require('./queryTypeUpdate');
const countTypeUpdate = require('./countTypeUpdate');
const getTypeUpdate = require('./getTypeUpdate');
const createTypeUpdates = require('./createTypeUpdates');
const updateTypeUpdates = require('./updateTypeUpdates');
const updateTypeUpdatesQuery = require('./updateTypeUpdatesQuery');
const deleteTypeUpdates = require('./deleteTypeUpdates');
const deleteTypeUpdatesQuery = require('./deleteTypeUpdatesQuery');

const createNestedTypeUpdateRecords = require('./createNestedTypeUpdateRecords');
const updateNestedTypeUpdateRecords = require('./updateNestedTypeUpdateRecords');
const deleteNestedTypeUpdateRecords = require('./deleteNestedTypeUpdateRecords');

module.exports = {
        tableName: "typeUpdate",
        
        attributes: {
            code: "code",
            lastUpdated: "lastUpdated",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        },

        extensions: {
            onCreate: {
                records: (records) => records,
                allow: () => true
            },
            onUpdate: {
                records: (records) => records,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onUpdateQuery: {
                allow: () => true,
                statements: (stmts) => stmts,
                appendFilter: () => ({})
            },
            onDelete: {
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onDeleteQuery: {
                allow: () => true,
                statements: (stmts) => stmts,
                appendFilter: () => ({})
            },
            //called by both get, count, and query
            onSelect: {
                fields: (fields) => fields,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onGet: {
                fields: (fields) => fields,
                allow: (key) => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            //called by count and query
            onQuery: {
                fields: (fields) => fields,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            }
        },

        query: queryTypeUpdate,

        count: countTypeUpdate,

        get: getTypeUpdate,

        create: createTypeUpdates,

        update: updateTypeUpdates,

        updateQuery: updateTypeUpdatesQuery,

        delete: deleteTypeUpdates,

        deleteQuery: deleteTypeUpdatesQuery,

        createNestedRecords: createNestedTypeUpdateRecords,

        updateNestedRecords: updateNestedTypeUpdateRecords,

        deleteNestedRecords: deleteNestedTypeUpdateRecords
}