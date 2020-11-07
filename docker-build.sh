#!/bin/bash

bamboo_cmd_usage="./docker-build.sh <build_number> [<property_file>:default=build-deploy.properties]"

build_number=
if [ ! -z $1 ]; then build_number=$1; else log ERROR "No build number specified as var-args! Usage: ${bamboo_cmd_usage}" 1; fi

properties="./config/build-deploy.properties"
if [ ! -z $2 ]; then properties=$2; else log INFO 'Using default property file: ./config/build-deploy.properties ...'; fi

app_name="$(cat ${properties} | grep "app.name" | cut -d'=' -f2)"
registry=$(cat ${properties} | grep "docker.registry" | cut -d'=' -f2)

docker_build(){
  docker build -t ${registry}/${app_name}:${build_number} . || return $?
}

docker_tag(){
	docker tag ${registry}/${app_name}:${build_number} ${registry}/${app_name}:latest || return $?
}

docker_push(){
	docker push ${registry}/${app_name}:${build_number} || return $?
	docker push ${registry}/${app_name}:latest || return $?
}

docker_build && \
docker_tag && \
docker_push