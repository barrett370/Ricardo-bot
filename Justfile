set dotenv-load := true


run: 
    tsc -p tsconfig.json
    node ./bin/ricardo.js
