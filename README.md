# IPFS Blog

This is the source repository for the [IPFS Blog](http://ipfs.io/blog).

![](https://www.evernote.com/l/AMaEbN3YfmVC-JDtlxRdFnMMbfvQjQlmU9MB/image.png)

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
mkdir src/<next-number>-<short-title>/
touch src/<next-number>-<short-title>/index.md
```

That will create a directory for the post inside `src/`. Edit the `index.md` there. Place any static assets (e.g. images) inside that directory.

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

# and deploy
make dnslink
```

### Theme

The layouts follow [the example viewer](https://github.com/ipfs/examples/tree/master/webapps/example-viewer). Modify the files inside

```
tmpl/
```

### Known Issues

On Ubuntu, `make build` might fail: https://github.com/arve0/codeclub_lesson_builder/issues/39#issuecomment-71342456

```
Error: watch ENOSPC
```

This works around it:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
