# Image
FROM node:14

# Enviroment variables
ARG WORK_DIR
ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}
 

# Preparing workdir
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

# Files
COPY package*.json ./

# Init commands
RUN npm install

# CMD [ "npm", "run", "dev" ]