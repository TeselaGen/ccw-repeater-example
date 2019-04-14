const {
    each,
    assign,
    pick,
    startsWith,
    has
} = require('lodash');

const Promise = require('bluebird');

async function getUserLogin(key, selectFields = [], opts){

    let allowQuery = await Promise.resolve(this.entities.userLogin.extensions.onSelect.allow.call(this, opts));
    if(!allowQuery) return Promise.resolve();

    let allowGet = await Promise.resolve(this.entities.userLogin.extensions.onGet.allow.call(this, key, opts));
    if(!allowGet) return Promise.resolve();

    if(key == null || typeof key === 'undefined') return Promise.resolve();

    let fields = await Promise.resolve(this.entities.userLogin.extensions.onSelect.fields.call(this, selectFields, opts));
    fields = await Promise.resolve(this.entities.userLogin.extensions.onGet.fields.call(this, selectFields, opts));
    
    let tableColumns = {
        loginName: "loginName",
        loginPassword: "loginPassword",
        token: "token",
        loginType: "loginType",
        userId: "userId",
        id: "id",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        cid: "cid",
    };

    let alwaysSelect = {
        userId: "userId",
        id: "id",
    };

    let selectMap = assign(pick(tableColumns, fields), alwaysSelect);
    
    let select = [];
    each(selectMap, (columnName, attributeName) => {
        select.push(`${columnName} as ${attributeName}`);
    });

    let qry = Promise.resolve();

    if(fields.indexOf('lastFetched') > -1){
        qry = this.getCurrentTimestamp();
    }


    let convertJsonToText = this.db.client.config.client !== 'pg';

    if(startsWith(key, "&")){
        return qry.then((cts) => {
            return this.db("userLogin").first(select).where({ cid: key.substr(1) })
            .then((rec) => {
                return processResult(rec, cts, convertJsonToText);
            });
        });
    }
    
    return qry.then((cts) => {
        return this.db("userLogin").first(select).where({ id: key })
                .then((rec) => {
                    return processResult(rec, cts, convertJsonToText);
                });
        });
}

module.exports = getUserLogin;

function processResult(rec, cts, convertJsonToText){
    if(rec){
        if(cts) rec.lastFetched = cts;
    }
    return Promise.resolve(rec);
}