module.exports = {
  siteUrl: 'https://popolnenie.kz',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async (config) => {
    const paths = []

    const defaultSlugs = ['facebook', 'tiktok', 'target-tiktok']
    defaultSlugs.forEach((slug) => {
      paths.push({
        loc: `/default/${slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    const resPosts = await fetch('https://popolnenie.kz/api/posts?limit=1000')
    const postSlugs = resPosts.data?.docs?.map((post) => post.slug) || []

    const allSlugs = new Set([...defaultSlugs, ...postSlugs])

    const cities = [
      'almaty',
      'astana',
      'shymkent',
      'aktobe',
      'aktau',
      'atyrau',
      'taraz',
      'talgar',
      'kyzylorda',
      'kostanay',
      'dubai',
      'batumi',
    ]

    cities.forEach((city) => {
      paths.push({
        loc: `/${city}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })

      allSlugs.forEach((slug) => {
        paths.push({
          loc: `/${city}/${slug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      })
    })

    return paths
  },
}
