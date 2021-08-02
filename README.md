# Display admin

The admin for OS2Display ver. 2.

Currently, this is a create-react-app.

## Docker development setup

### Up the containers

`docker-compose up -d`

### Install npm packages

`docker-compose run node bash -c 'yarn'`

## Testing with cypress

We use [cypress](https://www.cypress.io/) for testing.

To run cypress tests in the cypress container:

```

docker-compose run cypress run
```

### Linting

```
yarn check-coding-standards
```

```
yarn apply-coding-standards
```
