<template>
  <div id="home-page" class="page-wrapper home-page">
    <main-section theme="one-column">
      <template v-slot:default>
        <h2 class="featured-text">
          EXTRA! EXTRA! READ ALL ABOUT IT!
        </h2>
        <featured-posts-grid />
        <!-- All Posts -->
        <h5 class="regular-posts-text">
          CELEBRITIES FIGHTING NAKED! or something!
        </h5>
        <posts-grid />
      </template>
      <template v-slot:sidebar>
        Nothing here
      </template>
    </main-section>
    <news-letter-form-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setPageData } from '../helper'
import NewsLetterFormModal from '~/components/NewsLetterFormModal'

export default {
  name: 'HomePage',
  head() {
    return {
      title: `Home | ${this.$siteConfig.siteName}`
    }
  },
  components: {
    NewsLetterFormModal
  },
  computed: {
    ...mapState(['title', 'subtitle', 'featureImage'])
  },
  fetch({ store, params }) {
    setPageData(store, { slug: 'home' })
  }
}
</script>

<style>
.home-page .under-subtitle {
  border-top: none;
}
.featured-text {
  font-family: 'Cabin Sketch', cursive;
  //font-family: 'Fredericka the Great', cursive;
  color: red;
  font-size: 40px;
  text-align: center;
}
.regular-posts-text {
  font-family: 'Frijole', cursive;
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
