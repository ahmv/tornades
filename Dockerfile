# base iùmage
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


COPY package.json ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
RUN corepack enable && yarn install

COPY ./ ./

# start app
#CMD ["next", "dev"]
#CMD ["cd", "syncmon"]
CMD ["yarn", "start"]
