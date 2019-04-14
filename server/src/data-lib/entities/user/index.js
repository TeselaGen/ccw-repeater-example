const queryUser = require('./queryUser');
const countUser = require('./countUser');
const getUser = require('./getUser');
const createUsers = require('./createUsers');
const updateUsers = require('./updateUsers');
const updateUsersQuery = require('./updateUsersQuery');
const deleteUsers = require('./deleteUsers');
const deleteUsersQuery = require('./deleteUsersQuery');

const createNestedUserRecords = require('./createNestedUserRecords');
const updateNestedUserRecords = require('./updateNestedUserRecords');
const deleteNestedUserRecords = require('./deleteNestedUserRecords');

module.exports = {
        tableName: "user",
        
        attributes: {
            email: "email",
            firstName: "firstName",
            id: "id",
            lastName: "lastName",
            username: "username",
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

        query: queryUser,

        count: countUser,

        get: getUser,

        create: createUsers,

        update: updateUsers,

        updateQuery: updateUsersQuery,

        delete: deleteUsers,

        deleteQuery: deleteUsersQuery,

        createNestedRecords: createNestedUserRecords,

        updateNestedRecords: updateNestedUserRecords,

        deleteNestedRecords: deleteNestedUserRecords
}