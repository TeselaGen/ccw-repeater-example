docker rm -f postgres_echo
docker run --name postgres_echo -e POSTGRES_USER=echo -e POSTGRES_PASSWORD=ThisIsASecret -p 5442:5432 -d postgres:9.6-alpine