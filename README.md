# OS2Display Admin

This is an admin for OS2Display. This is based on create-react-app. See
<https://github.com/os2display/display-docs/blob/main/admin.md> for a
description of the admin.

## Docker development setup

### Create public/config file

By default, the api that is requested is located at `/api/`.
This can be configured by:

```shell
cp public/example_config.json public/config.json
```

And modify the entries to suit your setup.

```json
{
  "api": "[WHERE TO FIND THE API]"
}
```

### Create public/access-config file

This file contains the access config. This file is only required if other access
setting are required than what is default.

```shell
cp public/example-access-config.json public/access-config.json
```

### Up the containers and install npm packages

```shell
docker compose up --detach
docker compose run --rm node yarn install
```

**Note**: When to `node` container is running, the JavaScript is continously
being built.

### Redux Toolkit

The communication with the API is generated from an OpenAPI
specification with Redux Toolkit.

To regenerate (when the API specification has changed):

```shell
# Action: Replace api.json with the new api.json OpenAPI specification

# Install and run scripts to generate ned Redux Api slices.
docker compose exec node npm --prefix src/redux/api install
docker compose exec node npm --prefix src/redux/api start
```

## Testing with playwright

We use [playwright](https://playwright.dev/) for testing.

To run playwright tests with docker:

```shell
 docker compose run --rm playwright npx playwright test
```

To test with user interface, up the containers and change the baseUrl in playwright.config.ts, then: 

```shell
yarn playwright test --ui 
```

### Linting

```shell
docker compose run --rm node yarn check-coding-standards
```

```shell
docker compose run --rm node yarn apply-coding-standards
```
