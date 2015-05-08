# IPFS Blog

This is the source repository for the [IPFS Blog](http://ipfs.io/blog).

## Editing

1. [install node + npm](http://iojs.org) and required modules

    ```sh
    npm install
    ```

2. run build

    ```sh
    node build.js
    ```

### Creating a Post

To create a new post:

```sh
mkdir posts/<next-number>-<short-title>/
touch posts/<next-number>-<short-title>/index.md
```

That will create a directory for the post inside `posts/`. Edit the `index.md` there. Place any static assets (e.g. images) inside that directory.

### Live editing

Run build:

```
make build
```

This should setup a server. For now, it screws up the styling because the styles are pulled from ipfs directly. (FIXME, should put the styles in the build dir.) Just kill it when you're ready to publish

### Publishing Post

Just run

```sh
make publish
```

### Theme

The layouts follow [the example viewer](https://github.com/ipfs/examples/tree/master/webapps/example-viewer). Modify the files inside

```
tmpl/
```
