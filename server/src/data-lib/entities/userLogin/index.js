const queryUserLogin = require('./queryUserLogin');
const countUserLogin = require('./countUserLogin');
const getUserLogin = require('./getUserLogin');
const createUserLogins = require('./createUserLogins');
const updateUserLogins = require('./updateUserLogins');
const updateUserLoginsQuery = require('./updateUserLoginsQuery');
const deleteUserLogins = require('./deleteUserLogins');
const deleteUserLoginsQuery = require('./deleteUserLoginsQuery');

const createNestedUserLoginRecords = require('./createNestedUserLoginRecords');
const updateNestedUserLoginRecords = require('./updateNestedUserLoginRecords');
const deleteNestedUserLoginRecords = require('./deleteNestedUserLoginRecords');

module.exports = {
        tableName: "userLogin",
        
        attributes: {
            loginName: "loginName",
            loginPassword: "loginPassword",
            token: "token",
            loginType: "loginType",
            userId: "userId",
            id: "id",
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

        query: queryUserLogin,

        count: countUserLogin,

        get: getUserLogin,

        create: createUserLogins,

        update: updateUserLogins,

        updateQuery: updateUserLoginsQuery,

        delete: deleteUserLogins,

        deleteQuery: deleteUserLoginsQuery,

        createNestedRecords: createNestedUserLoginRecords,

        updateNestedRecords: updateNestedUserLoginRecords,

        deleteNestedRecords: deleteNestedUserLoginRecords
}