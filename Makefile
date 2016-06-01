local="http://localhost:8080/ipfs/"
gway="https://ipfs.io/ipfs/"

zone="ipfs.io"
record="_dnslink.blog"

build: $(shell find src tmpl) build.js package.json
	node build.js

serve: $(shell find src tmpl) build.js package.json
	node build.js --watch

node_modules: package.json
	npm install
	touch node_modules

clean:
	rm -rf build

publish: build
	@ipfs swarm peers >/dev/null 2>&1 || ( \
		echo "error: ipfs daemon must be online to publish"; \
		echo "try running: ipfs daemon" && exit 1)
	ipfs add -r -q build/ | tail -n1 >versions/current
	cat versions/current >>versions/history
	@export hash=`cat versions/current`; \
		echo ""; \
		echo "published blog:"; \
		echo "- $(local)$$hash"; \
		echo "- $(gway)$$hash"; \
		echo ""; \
		echo "next steps:"; \
		echo "- ipfs pin add -r /ipfs/$$hash"; \
		echo "- make publish-to-domain"; \

publish-to-github:
	./publish-to-github

# Only run after publish, or there won't be a path to set.
publish-to-domain: auth.token
	DIGITAL_OCEAN=$(shell cat auth.token) node_modules/.bin/dnslink-deploy \
		--domain=$(zone) --record=$(record) --path=/ipfs/$(shell cat versions/current)

.PHONY: build clean publish publish-to-github
