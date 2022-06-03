set dotenv-load := true


build:
    CGO_ENABLED=0 go build -o ./bin/


run-docker:
    podman run -e TOKEN=${TOKEN} -e CLIENT_ID=${CLIENT_ID} ricardo
