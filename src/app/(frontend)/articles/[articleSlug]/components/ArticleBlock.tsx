'use client'

import { Article } from '@/payload-types'
import Image from 'next/image'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { formatDate } from '@/app/utils/date'
import { useCurrentCity } from '@/app/utils/useCurrentCity'

type Props = {
  articles: Article[]
  article: Article
}

export default function ArticleBlock({ articles, article }: Props) {
  return (
    <section className="container mx-auto my-10 px-6 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8 pt-10">
        <div className="flex flex-col gap-8 md:gap-16 md:w-[75%] w-full">
          {article.image && typeof article.image === 'object' && article.image.url && (
            <div className="w-full">
              <Image
                src={article.image.url}
                alt={article.image.alt || ''}
                width={1920}
                height={200}
                layout="responsive"
                className="object-cover rounded-2xl"
                draggable={false}
              />
            </div>
          )}

          <div>
            <h4 className="font-inter font-semibold text-xl mb-4">{article.title}</h4>
            {article.content && (
              <SerializedRichText className="payload-richtext" data={article.content} />
            )}
          </div>
        </div>

        <div className="flex md:h-screen sticky flex-col gap-8 md:w-[35%]">
          <h3 className="text-xl">Последнее в блоге</h3>
          <div className="flex flex-col gap-4">
            {articles
              .filter((item) => item.id !== article.id)
              .map((article) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.id}
                  className="group flex gap-3"
                >
                  <div className="w-[100px] h-[60px] overflow-hidden rounded-lg relative shrink-0">
                    {article.image && typeof article.image === 'object' && article.image.url && (
                      <Image
                        src={article.image.url}
                        alt={article.image.alt || ''}
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <time className="text-link/40 font-inter text-xs font-normal">
                      {formatDate(article.createdAt)}
                    </time>
                    <article className="space-y-4 font-inter">
                      <h4 className="text-sm font-normal text-link line-clamp-3 group-hover:text-hoverText transition-colors mb-3">
                        {article.title}
                      </h4>
                    </article>
                  </div>
                </Link>
              ))}
          </div>
          <Link
            href={'/articles'}
            className="font-inter text-sm text-blue-500 underline cursor-pointer"
          >
            Смотреть все блоги
          </Link>
        </div>
      </div>
    </section>
  )
}
