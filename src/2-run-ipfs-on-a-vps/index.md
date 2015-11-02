---
baseurl: ..
template: tmpl/layouts/post.html
breadcrumbs:
  - {name: "2-run-ipfs-on-a-vps", link: "./" }
id: 2-run-ipfs-on-a-vps
date: 2015-11-02
title: Run IPFS latest on a VPS
author: Kyle Drake
collection: posts
---

The best way to provide content using [IPFS](https://ipfs.io) is to run your own IPFS node. You can do this by running an IPFS node on your personal computer, but that will only work as long as your computer is running. For hosting content with a higher availability, you need to run an IPFS node in a datacenter. That ensures your content is always online and available to other nodes on the network.

VPS instances provided by [Digital Ocean](https://www.digitalocean.com/), [Ramnode](http://ramnode.com/), [Linode](https://www.linode.com/), [Vultr](https://www.vultr.com/) and many other providers allow you to quickly setup your own Linux server with the reliability of a managed dedicated server without the full cost. This is a quick guide to setting up your own dedicated IPFS node on a VPS. We'll be using [Ubuntu](http://www.ubuntu.com/) 14.04LTS 64-bit for the example.

First, some initial housekeeping I like to do. We're going to update the installed system to make sure that it has the latest updates. We're also going to turn on unattended updates, so that security patches can be done automatically without your intervention, and setup OpenNTP so the system clock is automatically updated:

    apt-get update
    apt-get upgrade
    apt-get install openntpd unattended-upgrades unzip wget
    dpkg-reconfigure unattended-upgrades

Now you can download the latest build of IPFS from the [install page](https://ipfs.io/docs/install/). We'll be using Linux x86_64:

    wget https://gobuilder.me/get/github.com/ipfs/go-ipfs/cmd/ipfs/ipfs_master_linux-amd64.zip
    unzip ipfs_master_linux-amd64.zip
    cp ipfs/ipfs /usr/local/bin/

It's usually not a good idea to run a public-facing service as root. So we'll create a user account to run IPFS in and switch to it:

    adduser ipfs
    su ipfs

First let's initialize the IPFS config:

    ipfs init

This installs a basic IPFS config file for you.

Now we'll add a blocklist for local networks. IPFS works by actively seeking nearby nodes to connect to, which is a good thing for performance and availability. Unfortunately, many VPS providers incorrectly detect this as malware activity, so this is a temporary workaround you can use for now:

    ipfs config --json Swarm.AddrFilters '[
      "/ip4/10.0.0.0/ipcidr/8",
      "/ip4/100.64.0.0/ipcidr/10",
      "/ip4/169.254.0.0/ipcidr/16",
      "/ip4/172.16.0.0/ipcidr/12",
      "/ip4/192.0.0.0/ipcidr/24",
      "/ip4/192.0.0.0/ipcidr/29",
      "/ip4/192.0.0.8/ipcidr/32",
      "/ip4/192.0.0.170/ipcidr/32",
      "/ip4/192.0.0.171/ipcidr/32",
      "/ip4/192.0.2.0/ipcidr/24",
      "/ip4/192.168.0.0/ipcidr/16",
      "/ip4/198.18.0.0/ipcidr/15",
      "/ip4/198.51.100.0/ipcidr/24",
      "/ip4/203.0.113.0/ipcidr/24",
      "/ip4/240.0.0.0/ipcidr/4"
    ]'

Now you're ready to start IPFS!

    ipfs daemon &

Give it a minute to connect to some other IPFS nodes, and then test that it's working by running a quick test:

    echo "hello world" | ipfs add

This will return the hash `QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o`. Now run this command to make sure that your IPFS node has pinned this content:

    ipfs refs local | grep QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o

And you should see a response with the same hash.

If you want to have IPFS boot at startup, add an entry to `/etc/rc.local`. You can run this command as root to quickly add it:

    sed -i -e '$i /bin/su ipfs -c "/usr/local/bin/ipfs daemon &"\n' /etc/rc.local

This process will simplify in the future when IPFS starts being packaged with distributions (`apt-get install ipfs`). But until then, this will get you started with IPFS experimentation on your own server. Run `ipfs help` to get a list of things you can do, and let us know if you run into any issues.
