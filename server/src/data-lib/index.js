const { values } = require('lodash');
const Promise = require('bluebird');
const queryResolver = require('tg-knex-query-resolver');
const tableMap = require('./db/table-map');
const fse = require('fs-extra');
const path = require('path');

const initEntities = require('./entities');
const dataLibExtender = require('./ext');

class DataLib {
    constructor(db, context, opts = {}){
        this.db = db;
        this.context = context;
        this.opts = opts;

        this.entities = {};
        if(!opts.extensionsDisabled){
            // dataLibExtender(this);
            initEntities(this, dataLibExtender);
        } else {
            initEntities(this);
        }
    }

    createNestedObjects(db, nestedObjectsMap){
        let dataAccessLib = this;
        let nestedObjects = values(nestedObjectsMap); 
        return Promise.each(nestedObjects, (nestedObject) =>{
            if(nestedObject.list.length == 0) return Promise.resolve();
            return dataAccessLib.entities[nestedObject.name].create(nestedObject.list, db);
        });
    }

    updateNestedObjects(db, nestedObjectsMap){
        let dataAccessLib = this;
        let nestedObjects = values(nestedObjectsMap); 
        return Promise.each(nestedObjects, (nestedObject) =>{
            if(nestedObject.list.length == 0) return Promise.resolve();
            if(nestedObject.hasFkFilter){
                return Promise.each(nestedObject.list, (updateWithFilter) => {
                    return dataAccessLib.entities[nestedObject.name].update(updateWithFilter.records, updateWithFilter.fkFilter, db);
                });
            }else{
                return dataAccessLib.entities[nestedObject.name].update(nestedObject.list, null, db);
            }
        });
    }

    deleteNestedObjects(db, nestedObjectsMap){
        let dataAccessLib = this;
        let nestedObjects = values(nestedObjectsMap); 
        let deletedCount = 0;
        return Promise.each(nestedObjects, (nestedObject) =>{
            if(nestedObject.list.length == 0) return Promise.resolve();
            return dataAccessLib.entities[nestedObject.name].delete(nestedObject.list, db)
                   .then((numDeleted) => {
                        deletedCount += numDeleted;
                   });
        })
        .then(()=> {
            return Promise.resolve(deletedCount);
        });
    }

    getCurrentTimestamp(){
        let dataAccessLib = this;
        let db = dataAccessLib.db;

        if(db.client.config.client == 'pg'){
            return db.raw(`select current_timestamp as "cts"`).then((results) => {
                return Promise.resolve(results.rows[0].cts);
            });
        }else{
            return db.raw(`select cast(systimestamp as TIMESTAMP) "cts" from dual`).then((results) => {
                return Promise.resolve(new Date(results[0].cts));
            });
        }
    }
}

module.exports = DataLib;
