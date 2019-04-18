docker rm -f ccw-repeater
docker run -e "PORT=3000" -e "CLIENT_MODE=prod" -p 3080:3000 --rm -d --name ccw-repeater teselagen/ccw-repeater:latest
docker logs --tail 1000 -f -t ccw-repeater