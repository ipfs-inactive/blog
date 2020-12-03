// configure this to an absolute url to enable a generated sitemap
const hostname = ''

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  dest: './dist',
  plugins: [
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
    [
      'vuepress-plugin-sitemap',
      hostname
        ? {
            hostname,
          }
        : false,
    ],
  ],
}
