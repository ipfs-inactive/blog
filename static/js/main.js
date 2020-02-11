// Fix ipfs.io/blog/* links loaded via DNSLink: https://github.com/ipfs/blog/issues/360
if (window.location.hostname === 'ipfs.io' && window.location.pathname.startsWith('/blog')) {
  window.location.replace(window.location.href.replace('//ipfs.io/blog', '//blog.ipfs.io'))
}
