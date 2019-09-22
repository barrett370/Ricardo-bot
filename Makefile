


.PHONY: ricardo
ricardo:
	./scripts/docker-make.sh


.PHONY: apply
apply:
	cd ./terraform && terraform apply