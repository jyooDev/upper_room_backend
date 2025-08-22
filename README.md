# upper_room_backend

Platform to connect church organizations by posting, sharing events and translating sermons.

## tech stack

    node.js
    express
    mongo / mongoose
    docker

## dev mode

    docker compose up -d mongo mongo-express
    npm run dev

## start project

    npm run start

## stop project

    ctrl + c


## deploy

    docker compose up -d


## steps

    npm install express dotenv 

    npm install -D typescript ts-node @types/node @types/express nodemon eslint prettier

    npx tsc --init


## .env example

DEV_MONGO_URI=mongodb://localhost:27017/upper-room
PROD_MONGO_URI=mongodb://mongo/upper-room
PORT=8888
NODE_ENV=development


