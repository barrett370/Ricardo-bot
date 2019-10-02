# Ricardo-bot

## Setup

- run `npm install` in the `src` directory to install dependencies

## Applying changes 
- any changes to `src/ricardo.js` must be followed by a run of `make ricardo` from the top level directory
- then to deploy said changes, change the `docker-tag` variable in `terraform/variables.tf` to the newly generated one and run `terraform apply` with google cloud credentials in your env
- **todo** check if state is shared or if a dynamo db equivalent is necessary 
 