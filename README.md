# Display admin

The admin for OS2Display ver. 2.

Currently, this is a create-react-app.

## Docker development setup

### Get the api mock project

```bash
git clone https://github.com/os2display/display-api-mock.git json-server

# Install npm packages
docker-compose run json-server npm install
```

### Up the containers

```bash
docker-compose up -d
```

### Install npm packages

```bash
docker-compose run node yarn install
```

## Testing with cypress

We use [cypress](https://www.cypress.io/) for testing.

To run cypress tests in the cypress container:

```bash
docker-compose run cypress run
```

### Linting

```bash
docker-compose run node yarn check-coding-standards
```

```bash
docker-compose run node yarn apply-coding-standards
```
