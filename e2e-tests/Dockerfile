# dockerfile to run cypress tests against the URL from another dockerfile/docker compose

# INSTALL UBUNTU
FROM cypress/browsers:node11.13.0-chrome73

# set your port
# ENV PORT 3000
# ENV NODE_ENV production

RUN mkdir /app \
  && cd /app \
  WORKDIR /app
COPY . .
# COPY .npmrc .npmrc
# COPY .npmrc server/.npmrc
# RUN ls -al
RUN yarn docker-install
# RUN (cd ./server && yarn add oracledb)

# expose the port to outside world
# EXPOSE  3000

CMD ["yarn", "start"]