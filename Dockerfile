FROM node:14.2
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "dist", "-p", "3000"]