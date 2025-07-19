// app/posts/[slug]/page.tsx

import { getPayload } from 'payload'
import config from '@/payload.config'
import BGraphic from '../../_components/BGraphic'
import StepsBlock from '../../_components/StepsBlock'
import HeroPost from './components/HeroPost'
import AdvantagesBlock from '../../_components/AdvantagesBlock'

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

  const advantagesBlock = post.layout?.find((block: any) => block.blockType === 'advantagesblock')

  const stepsBlock = post.layout?.find((block: any) => block.blockType === 'stepsblock')

  return (
    <>
      <BGraphic />
      <HeroPost post={post} />

      {advantagesBlock && <AdvantagesBlock layout={post.layout} />}
      {stepsBlock && <StepsBlock layout={post.layout} />}
    </>
  )
}
