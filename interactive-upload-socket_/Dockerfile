FROM node:14-alpine As development

RUN npm install -g nodemon

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /home/node/app/dist ./dist

CMD ["node", "dist/main"]