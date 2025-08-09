import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import config from '@/payload.config'
import { getPayload } from 'payload'
import ArticleBlock from './components/ArticleBlock'
import { getArticle } from '@/app/utils/getArticleData'

type Props = {
  params: Promise<{ articleSlug: string }>
}

// Метаданные страницы
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { articleSlug: slug } = await params

  const article = await getArticle(slug)
  const imageUrl = typeof article.image === 'string' ? article.image : article.image?.url || ''

  if (!article) {
    notFound()
  }

  return {
    title: `${article.title}`,
    description: article.description.substring(0, 160) || '',
    alternates: {
      canonical: `https://popolnenie.kz/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description ?? '',
      url: `https://popolnenie.kz/articles/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description ?? '',
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function Page({ params }: Props) {
  const { articleSlug: slug } = await params

  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const articles = await payload.find({
    collection: 'articles',
    limit: 8,
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  })

  return (
    <div className="pt-8 md: pt-0">
      <ArticleBlock articles={articles.docs} article={article} />
    </div>
  )
}
