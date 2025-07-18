// app/posts/[slug]/page.tsx

import { getPayload } from 'payload'
import { RichText, RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import BGraphic from '../../_components/BGraphic'
import { ClientCityHeading } from './ClientCityHeading'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const payloadClient = await getPayload({ config })

  const postResult = await payloadClient.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!postResult.docs.length) {
    return <div className="text-center py-10 text-red-500">Post not found</div>
  }

  const post = postResult.docs[0]

  return (
    <>
      <BGraphic />
      <div className="container mx-auto p-8 pb-20 sm:p-20">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex flex-col gap-4 md:max-w-5xl px-6">
            <ClientCityHeading post={post} />
            <RichText data={post.subheading} />
          </div>
          <button className="my-16 w-auto md:min-w-fit px-12 py-4 max-w-fit font-unbounded bg-primary text-black rounded-custom cursor-pointer hover:bg-hover transition">
            {post.button}
          </button>
        </div>

        <div className="flex flex-col gap-4 md:max-w-6xl px-6">
          {post.content && <SerializedRichText className="payload-richtext" data={post.content} />}
        </div>
      </div>
    </>
  )
}
