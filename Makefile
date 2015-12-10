builddir=build/

local="http://localhost:8080/ipfs/"
gway="https://ipfs.io/ipfs/"
domain="blog.ipfs.io"
record="@"

all: build

build: $(shell find src tmpl) build.js package.json
	node build.js
	# FIXME: this watches + serves. ideally it would be an option --watch.

dnslink : key = $(shell cat $(HOME)/.protocol/digitalocean.key)
dnslink: node_modules
	@DIGITAL_OCEAN=$(key) node_modules/.bin/dnslink-deploy \
		--domain=$(domain) --record=$(record) --path=/ipfs/$(HASH)
	@echo "http://$(domain)"
	@echo "https://ipfs.io/ipns/$(domain)"

publish: versions/current
	@export hash=`cat versions/current`; \
		echo ""; \
		echo "new version:"; \
		echo "- $(local)$$hash"; \
		echo "- $(gway)$$hash"; \
		echo ""; \
		echo "next:"; \
		echo "- make dnslink HASH=$$hash"; \
		echo "- ipfs pin add $$hash"; \

versions/current: $(shell find build/)
	ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q "$(builddir)" | tail -n1 >versions/current
	grep `cat versions/current` versions/history || cat versions/current >>versions/history

.PHONY: build publish
