<template>
  <main
    class="max-w-screen-xl mx-auto m-8 px-8 py-4 rounded border font-sans leading-loose text-lg text-grey-darkest bg-white"
  >
    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </main>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Page from '@theme/components/Page.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
  },

  data() {
    return {
      isSidebarOpen: false,
    }
  },

  computed: {
    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
  },
}
</script>

<style lang="postcss">
body {
  @apply bg-gray-500 antialiased;
}
</style>
