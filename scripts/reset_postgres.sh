docker rm -f postgres
docker run --name postgres -e POSTGRES_USER=echo -e POSTGRES_PASSWORD=ThisIsASecret -p 5432:5432 -d postgres:9.6-alpine