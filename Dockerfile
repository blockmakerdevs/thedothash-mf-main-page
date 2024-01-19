FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN yarn build

EXPOSE 3000

CMD [ "npm", "start" ]