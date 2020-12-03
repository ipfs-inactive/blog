const tailwindConfig = require('./tailwind.config')

// Theme API.
module.exports = (themeConfig, ctx) => {
  const { siteConfig, sourceDir, isProd } = ctx
  const { breakpoints } = tailwindConfig

  // add breakpoints to themeConfig
  siteConfig.themeConfig = { ...themeConfig, breakpoints }

  const purge = {
    enabled: isProd,
    content: [
      `${sourceDir}/.vuepress/**/*.{vue,js,html,css,styl}`,
      `${sourceDir}/**/*.md`,
    ],
  }

  const plugins = [
    require('tailwindcss')({ ...tailwindConfig, purge }),
    require('postcss-nested'),
    require('autoprefixer'),
  ]

  /**
   * Merge in the site's purgecss config
   */
  siteConfig.postcss = { ...(siteConfig.postcss || {}), plugins }

  return {
    plugins: [],
  }
}
