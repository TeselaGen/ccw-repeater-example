const _ = require('lodash');
const Promise = require('bluebird');
const graphqlFields = require('graphql-fields');
const dumpster = require('dumpster');
const path = require('path');
const fse = require('fs-extra');
const queryResolver = require('tg-knex-query-resolver');
const getResultsCursor = require('./core/getResultsCursor');

function log(obj){
    console.log(dumpster.dump(obj));
}

module.exports = function generateCoreResolver(db, DataLib, opts){

    let resolvers = {
        Query: {},
        Mutation: {}
    };

    let nestedResolvers;

    function getDataLibWithContext(db, context){
        return new DataLib(db, context, opts);
    }



    resolvers.Query.typeUpdates = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.typeUpdate = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.typeUpdate.get(args.code, fields, { root: true });
    }

    resolvers.Mutation.createTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createTypeUpdatePayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };

            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateTypeUpdatePayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };
            
            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTypeUpdatesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateTypeUpdatesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };
            
            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteTypeUpdatesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.typeUpdate = nestedResolvers;
    }


    resolvers.Query.todos = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("todo","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.todo = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.todo.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createTodo = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.todo.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createTodoPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "todo", pkFilter);

            return getResultsCursor("todo","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTodo = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.todo.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateTodoPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "todo", pkFilter);

            return getResultsCursor("todo","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTodosWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.todo.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateTodosWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "todo", pkFilter);

            return getResultsCursor("todo","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteTodo = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.todo.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteTodosWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.todo.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        todoCategory: function(todo, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(todo.todoCategoryId != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { id: todo.todoCategoryId };
                
                filter = appendFilter(filter, "category", fkFilter);

                return dataLib.entities.category.query(fields, filter, sort, pageNumber, pageSize).then(returnFirstResult);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.todo = nestedResolvers;
    }


    resolvers.Query.users = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.user = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.user.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createUserPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateUserPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUsersWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateUsersWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteUsersWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        userLogins: function(user, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(user.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { userId: user.id };
                
                filter = appendFilter(filter, "userLogin", fkFilter);

                return dataLib.entities.userLogin.query(fields, filter, sort, pageNumber, pageSize);
            }
            return Promise.resolve([]);
        },
        userLoginsCursor: function(user, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(user.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { userId: user.id };
                
                filter = appendFilter(filter, "userLogin", fkFilter);

                return getResultsCursor("userLogin","id", filter, sort, pageNumber, pageSize, info, dataLib);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.user = nestedResolvers;
    }


    resolvers.Query.categories = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("category","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.category = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.category.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createCategory = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.category.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createCategoryPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "category", pkFilter);

            return getResultsCursor("category","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateCategory = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.category.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateCategoryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "category", pkFilter);

            return getResultsCursor("category","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateCategoriesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.category.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateCategoriesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "category", pkFilter);

            return getResultsCursor("category","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteCategory = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.category.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteCategoriesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.category.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        todos: function(category, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(category.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { todoCategoryId: category.id };
                
                filter = appendFilter(filter, "todo", fkFilter);

                return dataLib.entities.todo.query(fields, filter, sort, pageNumber, pageSize);
            }
            return Promise.resolve([]);
        },
        todosCursor: function(category, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(category.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { todoCategoryId: category.id };
                
                filter = appendFilter(filter, "todo", fkFilter);

                return getResultsCursor("todo","id", filter, sort, pageNumber, pageSize, info, dataLib);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.category = nestedResolvers;
    }


    resolvers.Query.userLogins = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("userLogin","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.userLogin = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.userLogin.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createUserLogin = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.userLogin.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createUserLoginPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "userLogin", pkFilter);

            return getResultsCursor("userLogin","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUserLogin = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.userLogin.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateUserLoginPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "userLogin", pkFilter);

            return getResultsCursor("userLogin","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUserLoginsWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.userLogin.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateUserLoginsWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "userLogin", pkFilter);

            return getResultsCursor("userLogin","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteUserLogin = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.userLogin.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteUserLoginsWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.userLogin.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        user: function(userLogin, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(userLogin.userId != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { id: userLogin.userId };
                
                filter = appendFilter(filter, "user", fkFilter);

                return dataLib.entities.user.query(fields, filter, sort, pageNumber, pageSize).then(returnFirstResult);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.userLogin = nestedResolvers;
    }

    
    //tnr: allow for resolver overrides/additions here. 
    //Note: /ext/index.js must return the resolvers object
    let extResolverPath = path.resolve(__dirname, './ext/index.js');
    if(fse.existsSync(extResolverPath)){
        resolvers = require(extResolverPath)({
            db,
            DataLib,
            opts,
            resolvers,
            getResultsCursor,
            returnFirstResult,
            appendFilter,
        });
    }

    return resolvers;

    function returnFirstResult(result){
        return Promise.resolve(result[0]);
    }


    function addLastFetchedDate(lastFetchedDate){
        return function addLastFetched(result){
            if(Array.isArray(result)){
                return Promise.resolve(result.map((rec) => {
                    rec.lastFetched = lastFetchedDate;
                    return rec;
                }));
            }
            result.lastFetched = lastFetchedDate;
            return Promise.resolve(result);
        }
    }

    function appendFilter(filter, modelName, additionalFilter){
        if(filter != null && additionalFilter != null){
            let f1 = queryResolver.convertSimpleFilter(modelName, filter);
            let f2 = queryResolver.convertSimpleFilter(modelName, additionalFilter);
            return queryResolver.combineQueries(f1, f2);
        }else if(filter != null){
            return queryResolver.convertSimpleFilter(modelName, filter);
        }else if(additionalFilter != null){
            return queryResolver.convertSimpleFilter(modelName, additionalFilter);
        }else{
            return;
        }
    }

    function getDeleteResult(deletedCount, info, dataLib){

        let fields = graphqlFields(info);
        let result = { deletedCount };
        let qry = Promise.resolve(result);

        if(fields.typeUpdates){
            let typeUpdateSelectFields = Object.keys(fields.typeUpdates);
            qry = qry.then((result) => {
                return dataLib.entities['typeUpdate'].query(typeUpdateSelectFields, {}, ['code'], 1, 100000)
                    .then((results) => {
                        result.typeUpdates = results;
                        return Promise.resolve(result);
                    });
            });
        }

        return qry;
    }
}
