FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build 
EXPOSE 3000
CMD [ "npx", "serve", "build" ]