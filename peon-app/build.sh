#!/bin/bash
node_version=10.16.0

docker run --rm -v /etc/group:/etc/group:ro -v /etc/passwd:/etc/passwd:ro -v /home/$USER:/home/$USER -v "$PWD":/workdir \
-w /workdir \
-u $(id -u $USER):$(id -g $USER) \
node:${node_version} npm install

docker run --rm -v /etc/group:/etc/group:ro -v /etc/passwd:/etc/passwd:ro -v /home/$USER:/home/$USER -v "$PWD":/workdir \
-w /workdir \
-u $(id -u $USER):$(id -g $USER) \
node:${node_version} npm run build