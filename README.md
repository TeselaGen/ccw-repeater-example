# ccw-repeater-example

example app that just echos responses and talks to a database

get postgres

```
docker run  -it --name postgres  -e POSTGRES_USER=pguser -e POSTGRES_PASSWORD=ThisIsASecret -p 5432:5432 -d postgres:9.6-alpine
```

/usr/lib/postgresql/9.6/bin/pg_ctl stop

run the server

```
yarn install

yarn start

```

you can inspect the server at:

```
localhost:3001/postgres
```


## Running codefresh locally: 
- codefresh auth create-context --api-key 5cba1bef36f74f01002ea96a.694eaad6312946465680bc2c91089ad0
- codefresh get pipelines
- codefresh run TeselaGen/ccw-repeater-example/ccw-repeater-example --local -b master

## Setting up local docker containers: 
yarn docker-build //from ./ or ./e2e-tests this will build the docker images for ccw-repeater and ccw-repeater-cypress respectively 




## How the whole process works: 
 - add some new code, add a new cypress test for that
 - they'll push a new branch with that code and PR it 
 - that should trigger codefresh to start a new "build" 
 - that build should get the new code and run the app and run the cypress tests against it


## Current Questions:
where is the pipeline coming from ? -- TeselaGen/ccw-repeater-example/ccw-repeater-example 
  - it is getting cloned down from codefresh
where are images getting published to dockerhub/codefreshImages? 
  - from the codefresh.yml build step  

do we need to specifically "start" the newly built images?
where should we run the cypress test command from? 
how do we run a docker-compose.yml file with codefresh?
it appears that the codefresh pipeline branch regex is not working correctly -- master is getting run for all commits

## Next Steps 
set up s3 storage for cypress test recording fixtures
set up allure reporter for cypress runs 


