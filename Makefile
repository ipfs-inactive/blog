
all: build

build: $(shell find content static themes) config.toml
	hugo

watch:
	hugo server --buildDrafts --watch

publish: published.version
	echo "Published version "`cat latest-version`

published.version: build
	ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q public | tail -n1 >latest-version
	grep `cat latest-version` all-versions || cat latest-version >>all-versions

.PHONY: watch build publish
