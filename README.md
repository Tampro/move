## Create project
   npm i -g @nestjs/cli
   nest new movie --skip-git
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Setup database

```bash
  npm install --save @nestjs/typeorm typeorm@0.2 mysql2
```

- app.module.ts

```
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'movie',
      entities: [],
      synchronize: true,
    }),
```

- run app: 

```

 npm run start:dev

```

## Entities

- add User Module


```
nest g module user

```

- add Movie Module

```
nest g module movie

```

- add Like Movie Module

```
nest g module likeMovie

```

## Controller

- add User controller

```
nest g controller user

```


- add Movie controller

```
nest g controller movie

```
