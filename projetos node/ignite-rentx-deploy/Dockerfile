FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
