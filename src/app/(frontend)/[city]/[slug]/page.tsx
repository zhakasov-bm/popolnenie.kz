// app/posts/[slug]/page.tsx

import { getPayload } from 'payload'
import config from '@/payload.config'
import BGraphic from '../../_components/BGraphic'
import StepsBlock from '../../_components/StepsBlock'
import HeroPost from './components/HeroPost'
import AdvantagesBlock from '../../_components/AdvantagesBlock'
import FloatingNav from '../../_components/FloatingNav'

interface Props {
  params: {
    city: string
    slug: string
  }
}

import { CITY_METADATA } from '@/app/utils/cityMetadata'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: {
    city: string
    slug: string
  }
}): Promise<Metadata> {
  const meta = CITY_METADATA[params.city]

  return {
    title: meta?.title || 'Пополнение рекламных кабинетов',
    description:
      meta?.description ||
      'Зачисление денег для подготовки рекламных кампаний на Яндекс, Google, TikTok, Meta и других площадках.',
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params

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

  const advantagesBlock = post.layout?.find((block: any) => block.blockType === 'advantagesblock')
  const stepsBlock = post.layout?.find((block: any) => block.blockType === 'stepsblock')

  return (
    <>
      <BGraphic />
      <HeroPost post={post} />
      <FloatingNav blocks={post.layout ?? []} />

      {advantagesBlock && <AdvantagesBlock layout={post.layout} />}
      {stepsBlock && <StepsBlock layout={post.layout} />}
    </>
  )
}
