
builddir=build/

all: build

build: $(shell find src tmpl) build.js package.json
	node build.js
	# FIXME: this watches + serves. ideally it would be an option --watch.

publish: versions/latest
	echo "Published version "`cat versions/latest`

versions/latest: $(shell find build/)
	ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q "$(builddir)" | tail -n1 >versions/latest
	grep `cat versions/latest` versions/all || cat versions/latest >>versions/all

.PHONY: build publish
