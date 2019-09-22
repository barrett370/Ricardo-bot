#!/bin/bash

image_tag="$(git rev-parse --short HEAD)-$(date +%s)"
sudo docker build -t ricardo-bot .
sudo docker tag ricardo-bot barrett370/ricardo-bot:${image_tag}
sudo docker push barrett370/ricardo-bot:${image_tag}
echo "Pushed new Docker image with tag ${image_tag}"