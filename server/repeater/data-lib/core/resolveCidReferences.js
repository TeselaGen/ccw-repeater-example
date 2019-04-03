const { map } = require('lodash');
const Promise = require('bluebird');


function resolveCidReferences(cidsToResolve, qry){
    const cidKeys = map(cidsToResolve, (val, key) => { return key; });

    return Promise.each(cidKeys, (cidKey) => {
        let cid = cidsToResolve[cidKey];
        let cidList = cid.map((cidDef) => { return cidDef.cid; });
        let key = cid[0].referenceKey;

        return qry.select([key, 'cid'])
                .from(cid[0].referenceTable)
                .whereIn('cid', cidList)
                .then((rec) => {
                    if(rec){
                        let cidMap = {};

                        rec.forEach((r) => {
                            cidMap[r.cid] = r[key];
                        });
                        cid.forEach((cidDef) => {
                            cidDef.record[cidDef.attrName] = cidMap[cidDef.cid];
                        });
                    }
                });
    });
}

module.exports = resolveCidReferences;