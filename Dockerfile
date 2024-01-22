FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json  /app/
RUN npm install --production
COPY .  /app
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
CMD [ "npm", "start" ]
