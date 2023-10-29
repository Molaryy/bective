FROM node:20.4.0-alpine
WORKDIR /bective
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 5173
CMD ["yarn", "preview"]
