import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  dir: 'resora',
  title: "Resora",
  description: "A structured API response layer for Node.js and TypeScript with automatic JSON responses, collection support, and pagination handling",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/resource' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Resources', link: '/guide/resources' },
          { text: 'Collections', link: '/guide/collections' },
          { text: 'Server Response', link: '/guide/server-response' },
          { text: 'Writing Resources', link: '/guide/writing-resources' },
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Resource', link: '/api/resource' },
          { text: 'Resource Collection', link: '/api/resource-collection' },
          { text: 'Generic Resource', link: '/api/generic-resource' },
          { text: 'Server Response', link: '/api/server-response' },
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'Roadmap', link: '/more/roadmap' },
          { text: 'Contributing', link: '/more/contributing' },
          { text: 'Changelog', link: '/more/changelog' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toneflix/resora' }
    ]
  }
})
