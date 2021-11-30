set dotenv-load := true


run: 
    tsc -p tsconfig.json
    node ./bin/ricardo.js

run-docker:
    podman run -e TOKEN=${TOKEN} -e CLIENT_ID=${CLIENT_ID} ricardo
