FROM node:16
WORKDIR /app-node
EXPOSE 3333
COPY . .
RUN npm install
ENTRYPOINT npm start