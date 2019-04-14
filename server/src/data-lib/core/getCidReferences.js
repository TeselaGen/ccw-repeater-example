const { map, has, startsWith, keys } = require('lodash');

function getCidReferences(records, columnMap, relatedObjects, recordKeyAttr){
    let cidsToResolve = {};

    let cidAttributes = map(relatedObjects, (val, key) => {
        return {
            ...val,
            relAttrName: key
        };
    });

    records.forEach((rec) => {
        cidAttributes.forEach((relObj) => {
            const attrName = relObj.referenceKey;
            
            if(has(rec, attrName) && startsWith(rec[attrName], "&")){
                const key = `${relObj.targetTable}.${relObj.targetKeyColumn}`;

                if(!cidsToResolve[key]) cidsToResolve[key] = [];

                let attrColumnName = columnMap[relObj.referenceKey];

                cidsToResolve[key].push({
                    cid: rec[relObj.referenceKey].substr(1),
                    attrName,
                    referenceKey: relObj.targetKeyColumn,
                    referenceTable: relObj.targetTable,
                    record: rec
                });
            }
        });
    });

    return cidsToResolve;
}

module.exports = getCidReferences;