FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
RUN npm run build
COPY . .
EXPOSE 3000
CMD [ "serve", "-s build -l 3000" ]