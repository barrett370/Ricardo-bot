#!/bin/bash
sudo useradd foo && sudo usermod -a -G docker foo
echo "${PASSWORD}" | sudo -u foo bash -c 'docker login -u barrett370 --password-stdin docker.pkg.github.com'
sudo -u foo bash -c 'docker run  --restart unless-stopped docker.pkg.github.com/barrett370/ricardo-bot/ricardo:latest'
