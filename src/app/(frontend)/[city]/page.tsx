import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import BGraphic from '../_components/BGraphic'
import HeroBlock from '../_components/HeroBlock'
import AdvantagesBlock from '../_components/AdvantagesBlock'
import TarifBlock from '../_components/TarifBlock'
import StepsBlock from '../_components/StepsBlock'
import ApplicationFormBlock from '../_components/ApplicationFormBlock'

export default async function CityPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
  })
  const page = res.docs[0]

  return (
    <div>
      <BGraphic />
      <HeroBlock page={page} />
      <AdvantagesBlock page={page} />
      <TarifBlock page={page} />
      <StepsBlock page={page} />
      <ApplicationFormBlock page={page} />
    </div>
  )
}
