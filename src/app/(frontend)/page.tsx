import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import BGraphic from './_components/BGraphic'
import HeroBlock from './_components/HeroBlock'
import AdvantagesBlock from './_components/AdvantagesBlock'
import TarifBlock from './_components/TarifBlock'
import StepsBlock from './_components/StepsBlock'
import TeamBlock from './_components/TeamBlock'
import ClientsBlock from './_components/ClientsBlock'
import ReviewsBlock from './_components/ReviewsBlock'
import FloatingNav from './_components/FloatingNav'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
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
    </div>
  )
}
