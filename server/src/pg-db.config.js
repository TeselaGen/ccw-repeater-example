/* Copyright (C) 2018 TeselaGen Biotechnology, Inc. */
const { parse } = require("pg-connection-string");
const dbName = process.env.DB_NAME || "postgres";
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "echo";
const pass = process.env.DB_PASS || "ThisIsASecret";
const port = process.env.DB_PORT || 5442;
const appSchema = "echo";

let dbConfig = {
  dbName,
  appSchema,
  dialect: "postgres",
  sys: {
    client: "pg",
    connection: {
      host: host,
      user: user,
      password: pass,
      port,
      database: "postgres" //this must be postgres in case the database has not yet been created
    },
    debug: true,
    searchPath: "public"
  },
  app: {
    client: "pg",
    connection: {
      host: host,
      user: user,
      password: pass,
      port,
      database: dbName
    },
    debug: true,
    searchPath: [`${appSchema}`, `public`]
  }
};

const { DATABASE_URL, SKIP_PG_SSL } = process.env;
if (DATABASE_URL) {
  let config = parse(DATABASE_URL);
  dbConfig.dbName = config.database;
  const dbUrl = DATABASE_URL + (SKIP_PG_SSL ? "" : "?ssl=true");
  dbConfig.sys.connection = dbUrl;
  dbConfig.app.connection = dbUrl;
}

module.exports = dbConfig;
