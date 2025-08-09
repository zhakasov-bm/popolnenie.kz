import { getPayload } from 'payload'
import config from '@/payload.config'
import ArticleCard from './components/ArticleCard'
import BGraphic from '../_components/BGraphic'

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const articles = await payload.find({
    collection: 'articles',
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
  })

  return (
    <div>
      <BGraphic />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 pt-24 p-6 mb-10 lg:px-24 md:auto-rows-fr">
        {articles.docs.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
