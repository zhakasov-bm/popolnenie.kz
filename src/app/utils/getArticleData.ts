import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import { Article } from '@/payload-types'

export async function getArticle(slug: string): Promise<Article> {
  try {
    const headers = await getHeaders()
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers })

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
      user,
    })

    return result.docs?.[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}
