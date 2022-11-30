FROM node:19-alpine3.15 as node-alpine
WORKDIR /app
COPY ./build ./build
# RUN npm install --silent
#RUN npm run build 
EXPOSE 3000
CMD [ "npx", "serve", "build" ]