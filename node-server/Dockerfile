FROM node:20
WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
EXPOSE 8000