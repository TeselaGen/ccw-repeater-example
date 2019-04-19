const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fse = require("fs-extra");
const initClient = require("./initClient");
const initDb = require("./initDb");
const envFilePath = path.resolve(__dirname, "../.env");
if (fse.existsSync(envFilePath)) {
  console.log(`Loading environment variables from ${envFilePath}`);
  dotenv.config({ path: envFilePath });
} else {
  console.log(
    `${envFilePath} not found! Not loading any environment variables from file`
  );
}

const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
//const initAuthManager = require("./auth/initAuthManager");

const {
  refreshSchema,
  dropAndSyncDatabase,
  loadDataLib,
  loadResolvers,
  loadSchemaStr
} = require("oradm-to-gql");
const { makeExecutableSchema } = require("graphql-tools");

const debug = require("debug")("repeater:server");
const http = require("http");
const truncateAndSeed = require("./truncateAndSeed");

const getAppConfig = require("./config-loader");
getAppConfig()
  .then(appConfig => {
    const app = express();
    app.set("appConfig", appConfig);
    return Promise.resolve(app);
  })
  .tap(app => {
    if (app.get("appConfig").refreshSchema) {
      return refreshSchema(app.get("appConfig"), {
        log: console.log,
        timestamps: { created: "createdAt", modified: "updatedAt" }
      });
    }
    return Promise.resolve();
  })
  .tap(app => {
    if (app.get("appConfig").refreshSchema) {
      return dropAndSyncDatabase(app.get("appConfig"), undefined, {
        log: console.log
      });
    } else {
      initDb(app.get("appConfig"));
    }
    return Promise.resolve();
  })
  .tap(app => {
    if (process.env.TG_INIT_DB || process.env.AUTO_INIT_DB) {
      return truncateAndSeed(app.get("appConfig"));
    }
  })
  .tap(() => {
    if (process.env.TG_INIT_DB) {
      console.log("Exiting because TG_INIT_DB is set");
      process.exit();
    }
    return Promise.resolve();
  })
  .tap(app => {
    const appConfig = app.get("appConfig");
    const { DataLib, db } = loadDataLib(appConfig);
    app.set("DataLib", DataLib);
    app.set("db", db);
    const resolvers = loadResolvers({ DataLib, db }, appConfig);
    const graphQLSchemaStr = loadSchemaStr(appConfig.graphql.schemaPath);
    const gqlSchema = makeExecutableSchema({
      typeDefs: graphQLSchemaStr,
      resolvers
    });
    app.set("gqlSchema", gqlSchema);

    if (process.env.CORS) {
      // cors TODO make less broad
      app.use(
        cors({
          credentials: true,
          origin: true
        })
      );
      // Handle CORS Pre-flight request
      app.options(
        "*",
        cors({
          origin: true
        })
      );
    }

    app.use(logger("dev"));
    app.use(express.json());
    //initAuthManager(app);

    // add endpoints
    app.use("/graphql", graphqlExpress({ schema: gqlSchema }));
    app.use(
      "/graphiql",
      graphiqlExpress({ endpointURL: "http://localhost:3000/graphql" })
    );

    initClient(app, appConfig);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      console.error(err);
      // render the error page
      res.status(err.status || 500);
      res.send("error: " + err.message);
    });
    return Promise.resolve();
  })
  .tap(app => {
    //app.listen(3000);
    console.log("listening..");
    return Promise.resolve();
  })
  .tap(app => {
    /**
     * Module dependencies.
     */

    /**
     * Get port from environment and store in Express.
     */

    var port = normalizePort(process.env.PORT || "3000");
    app.set("port", port);

    /**
     * Create HTTP server.
     */

    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
      if (error.syscall !== "listen") {
        throw error;
      }

      var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
      console.log(`Server listening on port: ${port}`);
      if (process.platform === "darwin" && !process.env.NGROK) {
        console.log(`Server running at http://localhost:${port}/`);
      } else {
        let hostUrl = process.env.HOST_URL;
        console.log(`Server running at ${hostUrl}`);
      }
    }
  });
