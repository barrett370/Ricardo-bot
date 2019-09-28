#!/usr/bin/env bash

docker login -u "gitlab-gcloud-deployment" -p "yK6Z8hU_pQTyshes5avX" registry.gitlab.com
docker login docker run registry.gitlab.com/chasbob/ricardo-bot:latest