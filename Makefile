


.PHONY: ricardo
ricardo:
	./scripts/docker-make.sh


.PHONY: apply
apply:
	cd ./terraform && terraform apply

.PHONY: destroy
destroy:
	cd ./terraform && terraform destroy


.PHONY: show
show:
	cd ./terraform && terraform show
