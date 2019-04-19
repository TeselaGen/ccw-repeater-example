# # remove current image from local registry to prevent caching issues
# docker rmi teselagen/ccw-repeater-cypress:latest

# # remove dangling intermediate images that may be used as a cached layer
# docker rmi $(docker images -a | grep none | awk '{print $3}') --force

# build image
docker build --no-cache -t teselagen/ccw-repeater-cypress:latest -f Dockerfile .