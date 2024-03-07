FROM node:20

RUN mkdir -p /server/node_modules && chown -R node:node /server

WORKDIR /server

COPY --chown=node:node package.json ./
COPY --chown=node:node .env ./
COPY --chown=node:node app.js ./

USER node

RUN npm i

EXPOSE 8000

CMD [ "node", "app.js" ]