import path from 'path'
import glob from 'glob'
import head from './config/head'
import { modules, modulesSettings } from './config/modules'
import plugins from './config/plugins'
import build from './config/build'
import css from './config/css'
import { routeMap, otherRoutes } from './config/generate'

export default {
  mode: 'universal',
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Headers of the page
   */
  head: head,
  generate: {
    routes: otherRoutes.concat(getDynamicPaths(routeMap))
  },
  /*
   ** Global CSS
   */
  css: css,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: plugins,
  /*
   ** Nuxt.js modules
   */
  modules: modules,
  ...modulesSettings,
  /*
   ** Build configuration
   */
  build: build,

  /*
   ** Feed for @nuxtjs/feed module, which provides RSS feed
   */
  feed: [
    {
      path: '/feed.xml',
      async create(feed, data) {
        feed.options = {
          title: 'DerpFeed',
          link: 'https://derp.news/feed.xml',
          description: "Derpbot here. Here's some human news. ACK upon receipt."
        }
        /*
        feed.addItem({
          title: data,
          id: 'check'
        })
        */
        data.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            date: new Date(post.date),
            description: post.subtitle,
            content: post.content
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: getPosts()
    }
  ]
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map((url) => {
      const filepathGlob = urlFilepathTable[url]
      return glob.sync(filepathGlob, { cwd: 'content' }).map((filepath) => {
        return `${url}/${path.basename(filepath, '.md')}`
      })
    })
  )
}

function getPosts() {
  const fs = require('fs')
  const postsJsonFilePath = path.resolve('static/api/posts.json')
  const posts = []

  fs.readFile(postsJsonFilePath, 'utf8', function (err, postsJsonFile) {
    if (err) {
      console.log(err)
    } else {
      const allPostsJson = JSON.parse(postsJsonFile)
      for (let i = 0, len = allPostsJson.length; i < len; ++i) {
        const currentPost = allPostsJson[i]
        currentPost.url = path.join('https://derp.news/', currentPost.slug)
        posts.push(currentPost)
      }
    }
  })
  return posts
}
