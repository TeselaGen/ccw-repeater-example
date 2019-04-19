docker rm -f ccw-repeater-cypress
docker run --rm -e "TEST_URL=http://localhost:3081" -d --name ccw-repeater-cypress teselagen/ccw-repeater-cypress:latest
docker logs --tail 1000 -f -t ccw-repeater-cypress