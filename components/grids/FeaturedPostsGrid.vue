<template>
  <featured-resource-grid
    v-bind="$props"
    :resource="$cms.post"
    :theme="$siteConfig.posts.theme || $siteConfig.featuredCards.theme || null"
  >
    <template v-slot:default="{ item }">
      <featured-post-card
        :title="item.title"
        :link="item.slug ? `/${item.slug}` : ''"
        :image="item.featureImage"
        :author="item.author"
        :date="item.date"
      />
    </template>
  </featured-resource-grid>
</template>

<script>
import FeaturedPostCard from '~/components/cards/FeaturedPostCard'
export default {
  name: 'FeaturedPostsGrid',
  components: { FeaturedPostCard },
  props: {
    perRow: { type: Number, default: 2 },
    number: { type: Number, default: 0 },
    order: { type: String, default: 'DESC' },
    category: {
      type: Array,
      default() {
        return []
      }
    },
    exclude: { type: String, default: '' }
  }
}
</script>
