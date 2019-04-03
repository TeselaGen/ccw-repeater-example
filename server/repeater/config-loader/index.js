// Copyright (C) 2019 TeselaGen Biotechnology, Inc.

/* eslint-disable no-console */
const path = require("path");
const Promise = require("bluebird");
// const dbConfig = require('../ora-db.config.js');
const dbConfig = require("../pg-db.config.js");

module.exports = function(configName) {
  configName = configName || "default";

  let customDbConfig;
  console.log("Starting Backend...");
  if (process.env.config) {
    customDbConfig = require(`../${process.env.config}`);
  }

  let config = {
    db: customDbConfig || dbConfig,
    refreshSchema: false,
    qa: false,
    workflowSeed: false,
    cleanDB: false,
    generateFakeData: false,
    resetDBContainer: false,
    truncateAndSeedDatabase: false,
    seedData: false,
    profileJ5Upload: false,
    web: {
      port: process.env.PORT || 3040,
      clientMode:
        process.env.CLIENT_MODE ||
        process.env.prod ||
        process.env.TG_SERVE_CLIENT ||
        "prod"
    },
    graphql: {
      datamodelCSVPath: path.resolve(__dirname, "../datamodel-csv-export"),
      resolversPath: path.resolve(__dirname, "../graphql/resolvers"),
      schemaPath: path.resolve(__dirname, "../graphql/schema"),
      mockResolversPath: path.resolve(__dirname, "../graphql/mock-resolvers"),
      dataLibPath: path.resolve(__dirname, "../data-lib"),
      enableMockResolvers: false,
      enableModelResolvers: true
    },
    codeGenerationPassword: "joi12o3bjk123npj1"
  };

  // Environment variables overrides
  if (process.env.refreshSchema) {
    console.log("refreshSchema=1");
    config.refreshSchema = true;
  }
  if (process.env.qa) {
    console.log("qa=1");
    config.qa = true;
  }
  if (process.env.workflow) {
    console.log("workflow=1");
    config.workflowSeed = true;
  }
  if (process.env.cleanDB) {
    console.log("cleanDB=1");
    config.cleanDB = true;
  }
  if (process.env.generateFakeData) {
    console.log("generateFakeData=1");
    config.generateFakeData = true;
  }
  if (process.env.resetDBContainer) {
    console.log("resetDBContainer=1");
    config.resetDBContainer = true;
  }
  if (process.env.enableMockResolvers) {
    console.log("enableMockResolvers=1");
    config.enableMockResolvers = true;
  }
  if (process.env.enableModelResolvers) {
    console.log("enableModelResolvers=1");
    config.enableModelResolvers = true;
  }
  if (process.env.truncate) {
    console.log("truncate=1");
    config.truncateAndSeedDatabase = true;
  }

  if (process.env.seed) {
    console.log("seed=1");
    config.seedData = true;
  }

  if (process.env.profileJ5Upload) {
    console.log("profileJ5Upload=1");
    config.profileJ5Upload = true;
  }

  console.log("DB Host: ", config.db.app.connection.host);
  console.log("DB Name: ", config.db.dbName);

  if (process.env.BUCKETEER_BUCKET_NAME) {
    // we're using Bucketeer on Heroku instead of AWS
    // map the config vars
    process.env.AWS_S3_BUCKET = process.env.BUCKETEER_BUCKET_NAME;
    process.env.AWS_ACCESS_KEY = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
    process.env.AWS_REGION = process.env.BUCKETEER_AWS_REGION;
    process.env.AWS_SECRET_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
    console.log(`Using Bucketeer Buckets ${process.env.AWS_S3_BUCKET}`);
  }

  if (process.env.HEROKU_PARENT_APP_NAME) {
    //this is a review app so we want to override some
    console.log(`Setting review app variables`);
    process.env.HOST_URL = `https://${
      process.env.HEROKU_APP_NAME
    }.herokuapp.com`;
    process.env.FE_TOP_WARNING = `Review App: ${process.env.HEROKU_APP_NAME}`;
    process.env.REVIEW_APP = 1;
  }

  return Promise.resolve(config);
};
