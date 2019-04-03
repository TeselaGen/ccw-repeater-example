const queryCategory = require('./queryCategory');
const countCategory = require('./countCategory');
const getCategory = require('./getCategory');
const createCategories = require('./createCategories');
const updateCategories = require('./updateCategories');
const updateCategoriesQuery = require('./updateCategoriesQuery');
const deleteCategories = require('./deleteCategories');
const deleteCategoriesQuery = require('./deleteCategoriesQuery');

const createNestedCategoryRecords = require('./createNestedCategoryRecords');
const updateNestedCategoryRecords = require('./updateNestedCategoryRecords');
const deleteNestedCategoryRecords = require('./deleteNestedCategoryRecords');

module.exports = {
        tableName: "category",
        
        attributes: {
            id: "id",
            name: "name",
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

        query: queryCategory,

        count: countCategory,

        get: getCategory,

        create: createCategories,

        update: updateCategories,

        updateQuery: updateCategoriesQuery,

        delete: deleteCategories,

        deleteQuery: deleteCategoriesQuery,

        createNestedRecords: createNestedCategoryRecords,

        updateNestedRecords: updateNestedCategoryRecords,

        deleteNestedRecords: deleteNestedCategoryRecords
}