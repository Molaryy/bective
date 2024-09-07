FROM node:20.4.0-alpine

WORKDIR /bective/front

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
