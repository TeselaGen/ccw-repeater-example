# INSTALL UBUNTU
FROM node:10

#Install yarn
# RUN npm install -g yarn

#INSTALL LIBAIO1 & UNZIP (NEEDED FOR STRONG-ORACLE)
# RUN apt-get update \
#   && apt-get install -y libaio1 \
#   && apt-get install -y build-essential \
#   && apt-get install -y unzip \
#   && apt-get install -y curl

#ADD ORACLE INSTANT CLIENT
# RUN mkdir -p opt/oracle
# ADD ./docker/oracle/linux/ .

# RUN unzip instantclient-basic-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
#   && unzip instantclient-sdk-linux.x64-12.2.0.1.0.zip -d /opt/oracle  \
#   && mv /opt/oracle/instantclient_12_2 /opt/oracle/instantclient \
#   && ln -s /opt/oracle/instantclient/libclntsh.so.12.2 /opt/oracle/instantclient/libclntsh.so \
#   && ln -s /opt/oracle/instantclient/libocci.so.12.2 /opt/oracle/instantclient/libocci.so

# ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"
# ENV OCI_HOME="/opt/oracle/instantclient"
# ENV OCI_LIB_DIR="/opt/oracle/instantclient"
# ENV OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include"
# ENV OCI_VERSION=12

# RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig

# set your port
ENV PORT 3000
ENV NODE_ENV production

RUN mkdir /app \
  && cd /app \
  WORKDIR /app
COPY . .
COPY .npmrc .npmrc
COPY .npmrc server/.npmrc
RUN ls -al
RUN yarn docker-install
# RUN (cd ./server && yarn add oracledb)

# expose the port to outside world
EXPOSE  3000

CMD ["yarn", "start"]