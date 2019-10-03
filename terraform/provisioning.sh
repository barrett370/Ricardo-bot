#!/bin/bash
sudo useradd foo && sudo usermod -a -G docker foo
echo "$PASSWORD" | sudo -u foo bash -c 'docker login -u gitlab-gcloud-deployment --password-stdin registry.gitlab.com'
sudo -u foo bash -c 'docker run  --restart unless-stopped registry.gitlab.com/chasbob/ricardo-bot:add_avatar'
