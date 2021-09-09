# Redux setup

The Redux setup is built with Redux Toolkit and RTK Query for communicating with the api.

The api integration is generated with https://github.com/rtk-incubator/rtk-query-codegen.

The folder `src/redux/api` contains the latest generated ApiSlice and a node setup for generating a new ApiSlice:
```
# Override api.json with new OpenAPI specification.

npm install
node start
```

The generated api is typescript which is compiled to a javascript file (`api.generated.js`).
