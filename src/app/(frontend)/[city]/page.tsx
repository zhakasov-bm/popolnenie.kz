import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'

import React from 'react'
import config from '@/payload.config'
import BGraphic from '../_components/BGraphic'
import HeroBlock from '../_components/HeroBlock'
import AdvantagesBlock from '../_components/AdvantagesBlock'
import TarifBlock from '../_components/TarifBlock'
import StepsBlock from '../_components/StepsBlock'
import ClientsBlock from '../_components/ClientsBlock'
import TeamBlock from '../_components/TeamBlock'
import ReviewsBlock from '../_components/ReviewsBlock'
import { notFound } from 'next/navigation'
import FloatingNav from '../_components/FloatingNav'
import { ALLOWED_CITIES } from '@/app/utils/cities'
import { Metadata } from 'next'
import ArticleSection from '../_components/ArticleSection'

type Props = {
  params: Promise<{ city: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { city } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  return {
    openGraph: {
      title: 'Пополнение рекламных кабинетов',
      description:
        'Зачисление денег для подготовки рекламных кампаний на площадках Яндекс Маркет, Яндекс Директ, Google ADW, Тик Ток, ВКонтакте, Meta (Facebook, Instagram) на выгодных условиях для юридических лиц и ИП.',
      url: `https://popolnenie.kz/${city}`,
      images: [
        {
          url: 'https://popolnenie.kz/company-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Пополнение рекламных кабинетов',
      description:
        'Зачисление денег для подготовки рекламных кампаний на площадках Яндекс Маркет, Яндекс Директ, Google ADW, Тик Ток, ВКонтакте, Meta (Facebook, Instagram) на выгодных условиях для юридических лиц и ИП.',
      images: ['https://popolnenie.kz/company-og.jpg'],
    },
  }
}

export default async function CityPage({ params }: Props) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  const { city } = await params

  if (!ALLOWED_CITIES.includes(city)) {
    notFound()
  }

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    user,
  })
  const page = res.docs[0]

  if (!page) return notFound()

  return (
    <div>
      <BGraphic />
      <HeroBlock page={page} />
      <FloatingNav blocks={page.layout ?? []} />
      <AdvantagesBlock layout={page.layout} />
      <TarifBlock page={page} />
      <StepsBlock layout={page.layout} />

      <TeamBlock page={page} />
      <ReviewsBlock page={page} />

      <ClientsBlock page={page} />
      <ArticleSection page={page} />
    </div>
  )
}
