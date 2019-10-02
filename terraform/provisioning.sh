#!/bin/bash
sudo useradd foo && sudo usermod -a -G docker foo
sudo -u foo bash -c 'echo yK6Z8hU_pQTyshes5avX | docker login -u gitlab-gcloud-deployment --password-stdin registry.gitlab.com'
sudo -u foo bash -c 'docker run registry.gitlab.com/chasbob/ricardo-bot:latest'
