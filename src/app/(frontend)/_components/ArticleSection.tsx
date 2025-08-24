import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'

import { formatDate } from '@/app/utils/date'
import { Page } from '@/payload-types'

export default async function ArticleSection({ page }: { page: Page }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  const articles = await payload.find({
    collection: 'articles',
    limit: 2,
    sort: '-createdAt',
    where: {
      includedInBlog: {
        equals: true,
      },
    },
    user,
  })

  const article = articles.docs
  // const [currentCity] = useCurrentCity()

  return (
    <>
      {article.length > 0 && (
        <div className="container-class" id="articles">
          {(page.layout ?? []).map((block, id) => {
            if (block.blockType === 'articles') {
              return (
                <div key={id} className="flex gap-12 sm:gap-24 md:flex-row flex-col">
                  <div className="w-72">
                    <h3 className="font-unbounded text-xl md:text-2xl pb-12 text-left">
                      {block.heading}
                    </h3>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {articles.docs.map((article) => (
                      <Link
                        href={`/articles/${article.slug}`}
                        key={article.id}
                        className="group block"
                      >
                        <article className="space-y-4">
                          <h3 className="texl-lg md:text-xl font-normal text-label line-clamp-3 group-hover:text-hoverText transition-colors mb-3">
                            {article.title}
                          </h3>
                        </article>
                        <div>
                          <time className="text-link/40 font-inter text-sm font-light">
                            {formatDate(article.createdAt)}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
          })}
        </div>
      )}
    </>
  )
}
