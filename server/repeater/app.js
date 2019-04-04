const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Promise = require("bluebird");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

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

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // add endpoints
    app.use("/graphql", graphqlExpress({ schema: gqlSchema }));
    app.use(
      "/graphiql",
      graphiqlExpress({ endpointURL: "http://localhost:3000/graphql" })
    );
    app.use("/users", usersRouter);
    app.use("/*", indexRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
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
      var addr = server.address();
      var bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
      debug("Listening on " + bind);
    }
  });
