/* Copyright (C) 2019 TeselaGen Biotechnology, Inc. */
const knex = require("knex");
const Promise = require("bluebird");

const truncate =
  "TRUNCATE TABLE SCHEMA.category cascade; TRUNCATE TABLE SCHEMA.user cascade;";

const sql = [
  "insert into category (name) values ('WORK')",
  "insert into category (name) values ('PLAY')",
  "insert into \"user\" (email, \"firstName\", \"lastName\", \"username\") values ('noone@example.org', 'Default', 'User', 'defuser')"
];

function resetSequences(db, appConfig, opts) {
  return db
    .raw(
      `
SELECT  'ALTER SEQUENCE "' ||S.relname|| '" RESTART WITH 1;'
FROM pg_class AS S, pg_depend AS D, pg_class AS T, pg_attribute AS C
WHERE S.relkind = 'S'
  AND S.oid = D.objid
  AND D.refobjid = T.oid
  AND D.refobjid = C.attrelid
  AND D.refobjsubid = C.attnum
ORDER BY S.relname;
  `
    )
    .then(function(results) {
      return Promise.each(results.rows, row => {
        var sql = row["?column?"];
        console.log(sql);
        return db
          .raw(sql)
          .then(function() {
            console.log("OK");
            return Promise.resolve();
          })
          .catch(function(e) {
            console.log("Failed");
            return Promise.resolve();
          });
      });
    });
}

module.exports = async function(appConfig) {
  const {
    db: { appSchema }
  } = appConfig;

  var db = knex(appConfig.db.app);
  if (process.env.DATABASE_URL) {
    db = knex({
      client: "pg",
      connection:
        process.env.DATABASE_URL + (process.env.SKIP_PG_SSL ? "" : "?ssl=true")
    });
  }

  console.log("Truncating db: ", truncate);

  return await db
    .raw(truncate.replace(/SCHEMA/g, appSchema))
    .then(() => {
      return resetSequences(db, appConfig);
    })
    .then(() => {
      console.log("db truncated");
      return db.raw(sql.join(";").replace(/SCHEMA/g, appSchema));
    })
    .then(() => {
      console.log("db seeded");
      return Promise.resolve();
    })
    .catch(err => {
      console.log("Truncate failed");
      console.log(err);
      return Promise.reject(err);
    });

  console.log("Initialized db: ", sql);
};
