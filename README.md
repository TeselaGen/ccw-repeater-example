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
