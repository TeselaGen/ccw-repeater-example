const express = require("express");
const path = require("path");
const historyAPIFallback = require("connect-history-api-fallback");
const Bundler = require("parcel-bundler");

module.exports = function initClient(app, appConfig) {
  const clientMode = appConfig.web.clientMode;

  console.log(`Initializing client with mode: ${clientMode}`);

  const pathToClient = path.resolve(__dirname, "../../client/");
  const pathToClientDist = path.join(pathToClient, "dist");
  const pathToClientCache = path.join(pathToClient, ".cache");
  const pathToClientIndex = path.join(pathToClientDist, "index.html");
  const pathToClientEntryFile = path.join(pathToClient, "public/index.html");

  if (clientMode === "dev" || clientMode === "development") {
    console.log("Serving development version of client");
    let devConfig = {
      outDir: pathToClientDist,
      outFile: "index.html",
      cacheDir: pathToClientCache
    };

    const bundler = new Bundler(pathToClientEntryFile, devConfig);
    app.use(historyAPIFallback());
    app.use(bundler.middleware());
    app.use(express.static(path.join(pathToClient, "public")));
  } else {
    console.log(`Serving static version of client from ${pathToClientDist}`);
    console.log(`Serving default document ${pathToClientIndex}`);

    const staticClientMiddleware = express.static(pathToClientDist);
    app.use("/", staticClientMiddleware);
    app.get("*", function(req, res) {
      res.sendFile(pathToClientIndex);
    });
  }
};
