---
date: 2019-11-26
url: 2019-11-26-debug-go-ipfs-with-delve-and-visual-studio-code
title: Debug go-ipfs with delve and visual studio code
author: olizilla
---

I wanted to write a script to cohost websites that are hosted on IPFS. The websites have a DNSLink, a DNS TXT record that maps the domain to the current IPFS hash for the directory of files that make up the website. Absent-mindedly I went to remove a directory with `ipfs files rm --force /foo` command, and was met with an error! 

```console
$ ipfs files rm --force /foo
Error: merkledag: not found
```

I've rimraff'd a few dirs in my time. I expected that command to remove the directory, regardless of whether or not it actually existed. The principle of least suprise is violated. I pondered it for a moment but could see no good reason for that command to fail. 

I don't normally write Go code, but who cares, LET'S FIX IT! I'd been meaning to see what the fuss was about and give that fancy new Code editor ago, so this seemed like a good excuse. What follows is new persons guide to fixing a bug in go-ipfs with a little help from Visual Studio Code and _a debugger_ called `delve`.

## Install the things!

Install and configure Go. There are [lots of ways]() to do this. This is what I did _(...ok not exactly what I did, but a reduction; an ideal form, like I had known exactly what to type first time. The real version had a lot more typos, and open tabs.)_

```console
$ brew install go

# Set GOPATH to tell go where to install and look for go tools.
$ GOPATH=~/Code/go

# Make sure that dir exists
$ mkdir -p $GOPATH

# Save the env var so it sticks around 
$ echo GOPATH=$GOPATH >> ~/.bash_profile
```

Install Visual studio code. On osx this was also just a `brew` away

```console
$ brew cask install visual-studio-code
```

## Get yourself a go-ipfs

With [git installed](), you can clone go-ipfs from github

```console
$ mkdir -p ~/Code/go/ipfs
$ cd ~/Code/go/ipfs
$ git clone https://github.com/ipfs/go-ipfs.git
```

You now have a local copy of go-ipfs, let's build it to create our very own `ipfs` binary

```console
$ cd ~/Code/go/ipfs/go-ipfs
$ make build
$ ./cmd/ipfs/ipfs version --commit
ipfs version 0.5.0-dev-14605f9d7
```

🎉 That last command runs the `version` command against our local `ipfs` binary. Adding the `--commit` flag shows us what commit it was built from.


## Open the code

So visual-studio-code has land-grabbed the command line alias `code`. I have feelings about that, but the terminal doesn't care much about them. So let's open `code` right from the command line

```console
$ cd ~/Code/go/ipfs/go-ipfs
$ code .
```

The visual-studio-code UI should open up. It'll probably present you with a ream of news about what's been going on in the world of visual-studio-code development. Glaze over. Try to avoid scrolling. Push bravely on, we are doing a thing.

Install the go extension. it's gonna give you _"Rich Go language support for Visual Studio Code"_. You could hit the extentions tab, the last icon on the left hand side of the editor, but why mouse around like an animal when you could copy'n'paste'n'execute like a maveric wizard.

```console
$ code --install-extension ms-vscode.Go
```

## Debugé

- install delve
- create a launch.json

```json
    {
      "name": "Launch IPFS",
      "type": "go",
      "request": "launch",
      "mode": "auto",
      "program": "${workspaceFolder}/cmd/ipfs",
      "args": [
        "files",
        "rm",
        "--force",
        "/nono"
      ]
    }
```
- open `core/commands/files.go`
- drop a break point in `filesRmCmd` in the `Run:` function.
- see the error triggered in 

```go
// if '--force' specified, it will remove anything else,
// including file, directory, corrupted node, etc
force, _ := req.Options[forceOptionName].(bool)
if force {
  err := pdir.Unlink(name)
  if err != nil {
    return err
  }
  return pdir.Flush()
}
```

the comment gives us courage that what was intended was for this to succeed regardless of the mess it found. The code is trying to unlink the named file from the parent dir... in the debugger we see the pdir is `/` and the named entry is `foo`. Hit step over again, and we see `err` gets the value `not found`.

So if unlinking does fail, then we can't say that the remove succeded, and we should inform the user. But if it fails because the item wasn't there then it should succeed, so we just need another condition

```diff
if force {
  err := pdir.Unlink(name)
  if err != nil {
+    if err == os.ErrNotExist {
+      return nil
+    }
    return err
  }
  return pdir.Flush()
}
```

Run the command again, and look! Nothing! in accordance with command-line lore, the command quietly succeeded 🎉

It's not done till it's tested, so let's go add a shaness test to prove it.

```sh
test_expect_success "remove nonexistant path forcibly" '
  ipfs files rm --force /nonexistant
'
```

 that will run the command and assert that it succeeds as part of the go-ipfs test suite that gets run for every PR.

**HOW TO RUN THE TEST?**






> may the `--force` remove you.