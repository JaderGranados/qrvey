# Image
FROM node:14

# Enviroment variables
ARG WORK_DIR

# Preparing workdir
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

# Files
COPY package*.json ./

# Init commands
RUN npm install
COPY . .

# CMD [ "npm", "run", "dev" ]