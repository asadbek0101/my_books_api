FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package*.json  /app/
RUN npm install
<<<<<<< HEAD
COPY ./app
EXPOSE 3000
CMD [ "npm", "start" ]
=======
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]
>>>>>>> 9888545059ef3713fa0eec4165e5b99da6f23998
