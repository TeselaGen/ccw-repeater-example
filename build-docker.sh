# remove current image from local registry to prevent caching issues
docker rmi teselagen/ccw-repeater:latest

# remove dangling intermediate images that may be used as a cached layer
docker rmi $(docker images -a | grep none | awk '{print $3}') --force

# build image
docker build -t teselagen/ccw-repeater:latest -f Dockerfile .