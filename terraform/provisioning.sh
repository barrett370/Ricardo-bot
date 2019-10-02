#!/bin/bash
mkdir /var/lib/ricardo
cd /var/lib/ricardo || exit 94
sudo useradd foo && sudo usermod -a -G docker foo
sudo -u foo bash -c 'echo yK6Z8hU_pQTyshes5avX | docker login -u gitlab-gcloud-deployment --password-stdin registry.gitlab.com' &>> /dev/null|| exit 95
sudo -u foo bash -c 'docker run registry.gitlab.com/chasbob/ricardo-bot:latest &>> /dev/null|| exit 96'
