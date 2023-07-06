#!/bin/sh

set -eux

APP_VERSION=develop
VERSION=alpha

docker build --pull --no-cache --build-arg APP_VERSION=${APP_VERSION} --tag=os2display/admin-client:${VERSION} --file="Dockerfile" .

# docker push os2display/admin-client:${VERSION}
