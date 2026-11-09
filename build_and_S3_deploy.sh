#!/usr/bin/env bash
# DEPRECATED: the app is no longer deployed to S3. It is built and served by the
# `web` container in ../deploy/docker-compose.yml (see ../deploy/README.md).
#
# To build locally instead of via Docker (needs the pinned Node from .nvmrc):
#   nvm install && nvm use          # Node 20
#   npm install
#   npm run build -- --configuration production
# The static app is then in ./www.
echo "Deprecated. See ../deploy/README.md — the 'web' service builds and serves the app."
exit 1
