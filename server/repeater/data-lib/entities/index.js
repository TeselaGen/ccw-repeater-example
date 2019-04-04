
const typeUpdateEntityDef = require('./typeUpdate');
const todoEntityDef = require('./todo');
const userEntityDef = require('./user');
const categoryEntityDef = require('./category');
const userLoginEntityDef = require('./userLogin');

const entityMethods = [
    "query",
    "count",
    "get",
    "create",
    "update",
    "updateQuery",
    "delete",
    "deleteQuery",
    "createNestedRecords",
    "updateNestedRecords",
    "deleteNestedRecords"
];

let cache;
let extCache;

function initEntities(dataLib, extender) {
    if(extender) {
        // if the entityCache with extensions hasn't been populated
        // then populate it
        if(!extCache){
            // first initialize the cache and assign it to dataLib
            // so it can be extended
            dataLib.entities = getExtendedEntityCache();

            // the dataLib extensions will get attached to extCache
            extender(dataLib);
            
            // proxy the entities to ensure proper this binding 
            dataLib.entities = proxyEntities(dataLib.entities, dataLib);
        } else {
            dataLib.entities = proxyEntities(getExtendedEntityCache(), dataLib);
        }
    } else {
        dataLib.entities = proxyEntities(getEntityCache(), dataLib);
    }
}

function getEntityTrap(dataLib){
    const entityTrap = {
        get: function trapEntity(obj, key){
            const entity = obj[key];

            // console.log(`Accessing entity: ${key}`);
            if(typeof entity === "object"){
                // console.log(`Proxying entity: ${key}`);
                return new Proxy(entity, getEntityMethodTrap(dataLib));
            }
            // console.log(`Not proxying entity: ${key}`);
            return entity;
        }
    };

    return entityTrap;
}

function getEntityMethodTrap(dataLib){
    const entityMethodTrap = {
        get: function trapEntityMethod(obj, key){
            const method = obj[key];
            if(typeof method === "function"){
                // console.log(`Proxying entity method: ${key}`);
                return new Proxy(method, getMethodTrap(dataLib));
            } 
            // else if(typeof method === "object"){ // uncomment this to debug traps
            //    return new Proxy(method, getGenericReporterTrap());
            // }
            // console.log(`Accessing entity property: ${key}`);
            return method;
        }
    };

    return entityMethodTrap;
}

function getMethodTrap(dataLib){
    const methodTrap = {
        apply: function trapMethod(target, thisArg, argumentsList){
            // console.log(`Intercepting entity method call switching from ${thisArg.constructor.name} to ${dataLib.constructor.name}`);
            return target.call(dataLib, ...argumentsList);
        }
    };

    return methodTrap;
}

function getGenericReporterTrap(){
    return {
        get: function reporterTrap(obj, key){
            const prop = obj[key];

            // console.log(`Accessing prop: ${key}`);
            if(typeof prop === "object"){
                // console.log(`Proxying prop: ${key}`);
                return new Proxy(prop, getGenericReporterTrap());
            }
            // console.log(`Not proxying prop: ${key}`);
            return prop;
        }
    };
}

function proxyEntities(entities, dataLib){
    return new Proxy(entities, getEntityTrap(dataLib))
}

function getEntityCache() {
    if(!cache){
        cache = {};

        cache.typeUpdate = {
            ...typeUpdateEntityDef,
            extensions: getDefaultExtensions(typeUpdateEntityDef)
        };
        cache.todo = {
            ...todoEntityDef,
            extensions: getDefaultExtensions(todoEntityDef)
        };
        cache.user = {
            ...userEntityDef,
            extensions: getDefaultExtensions(userEntityDef)
        };
        cache.category = {
            ...categoryEntityDef,
            extensions: getDefaultExtensions(categoryEntityDef)
        };
        cache.userLogin = {
            ...userLoginEntityDef,
            extensions: getDefaultExtensions(userLoginEntityDef)
        };
    }
    return cache;
}

function getExtendedEntityCache() {
    if(!extCache){
        extCache = {};

        extCache.typeUpdate = {
            ...typeUpdateEntityDef,
            extensions: getDefaultExtensions(typeUpdateEntityDef)
        };
        extCache.todo = {
            ...todoEntityDef,
            extensions: getDefaultExtensions(todoEntityDef)
        };
        extCache.user = {
            ...userEntityDef,
            extensions: getDefaultExtensions(userEntityDef)
        };
        extCache.category = {
            ...categoryEntityDef,
            extensions: getDefaultExtensions(categoryEntityDef)
        };
        extCache.userLogin = {
            ...userLoginEntityDef,
            extensions: getDefaultExtensions(userLoginEntityDef)
        };
    }
    return extCache;
}

module.exports = initEntities;


function getDefaultExtensions(entityDef){
    let {
        onCreate,
        onUpdate,
        onUpdateQuery,
        onDelete,
        onDeleteQuery,
        onQuery,
        onGet,
        onSelect
    } = entityDef.extensions;
    return {
        onCreate: { ...onCreate },
        onUpdate: { ...onUpdate },
        onUpdateQuery: { ...onUpdateQuery },
        onDelete: { ...onDelete },
        onDeleteQuery: { ...onDeleteQuery },
        onQuery: { ...onQuery },
        onGet: { ...onGet },
        onSelect: { ...onSelect }
    }
}
