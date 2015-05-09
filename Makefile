
builddir=build/

all: build

build: $(shell find src tmpl) build.js package.json
	node build.js
	# FIXME: this watches + serves. ideally it would be an option --watch.

publish: published.version
	echo "Published version "`cat latest-version`

published.version:
	ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q "$(builddir)" | tail -n1 >latest-version
	grep `cat latest-version` all-versions || cat latest-version >>all-versions

.PHONY: build publish
