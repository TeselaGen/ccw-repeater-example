const queryTodo = require('./queryTodo');
const countTodo = require('./countTodo');
const getTodo = require('./getTodo');
const createTodos = require('./createTodos');
const updateTodos = require('./updateTodos');
const updateTodosQuery = require('./updateTodosQuery');
const deleteTodos = require('./deleteTodos');
const deleteTodosQuery = require('./deleteTodosQuery');

const createNestedTodoRecords = require('./createNestedTodoRecords');
const updateNestedTodoRecords = require('./updateNestedTodoRecords');
const deleteNestedTodoRecords = require('./deleteNestedTodoRecords');

module.exports = {
        tableName: "todo",
        
        attributes: {
            description: "description",
            id: "id",
            name: "name",
            status: "status",
            categoryId: "categoryId",
            userId: "userId",
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

        query: queryTodo,

        count: countTodo,

        get: getTodo,

        create: createTodos,

        update: updateTodos,

        updateQuery: updateTodosQuery,

        delete: deleteTodos,

        deleteQuery: deleteTodosQuery,

        createNestedRecords: createNestedTodoRecords,

        updateNestedRecords: updateNestedTodoRecords,

        deleteNestedRecords: deleteNestedTodoRecords
}