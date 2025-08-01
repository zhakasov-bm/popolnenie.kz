'use client'

import { Post } from '@/payload-types'
import { RichText, RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'
import { ClientCityHeading } from '../ClientCityHeading'
import CustomButton from '@/app/(frontend)/_components/CustomButton'

export default function HeroPost({ post }: { post: Post }) {
  return (
    <section className="container mx-auto p-8 pb-20 sm:p-20">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col gap-4 md:max-w-5xl md:px-6 mx-auto">
          <ClientCityHeading post={post} />
          <div className="w-full text-left hero-richtext">
            <RichText data={post.subheading} />
          </div>
        </div>
        <CustomButton label={post.button || 'Заказать'} to="#form" />
      </div>

      <div className="md:px-32 pt-24 flex items-center justify-center">
        {post.content && <SerializedRichText className="payload-richtext" data={post.content} />}
      </div>
    </section>
  )
}
