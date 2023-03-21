
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
```

## Small details

Main (task) code is located in the src/modules/services/offer-provider folder.

I have created two approaches for mapping provider1.service and provider2.service. There are several pros and cons to consider when determining the appropriate mapping due to the data.

Perhaps there is a more elegant way to do mapping that relies heavily on NestDTO, but I have tried to write it more dynamically to allow for future flexibility in case we no longer use NestJS and need to move provider services without extensive refactoring.
