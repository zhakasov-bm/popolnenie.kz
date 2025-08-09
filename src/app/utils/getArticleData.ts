import config from '@/payload.config'
import { getPayload } from 'payload'
import { Article } from '@/payload-types'

export async function getArticle(slug: string): Promise<Article> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'articles',
      sort: '-createdAt',

      where: {
        slug: {
          equals: slug,
        },
        includedInBlog: {
          equals: true,
        },
      },
    })

    return result.docs?.[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}
