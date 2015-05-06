
all: lib.version

clean:
	-rm lib.version

lib.version: $(find static/lib)
	ipfs add -r -q static/lib | tail -n1 | tr -d '\n' >$@
