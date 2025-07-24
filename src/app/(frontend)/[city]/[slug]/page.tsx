import { getPayload } from 'payload'
import config from '@/payload.config'
import BGraphic from '../../_components/BGraphic'
import StepsBlock from '../../_components/StepsBlock'
import HeroPost from './components/HeroPost'
import AdvantagesBlock from '../../_components/AdvantagesBlock'
import FloatingNav from '../../_components/FloatingNav'
import { notFound } from 'next/navigation'
import { Post } from '@/payload-types'

type Props = {
  params: {
    slug: string
    city: string
  }
}

// Получаем пост по слагу
async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

// Метаданные страницы
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Пост не найден',
    }
  }

  return {
    title: post.heading,
    description: post?.subheading || '',
  }
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) return notFound()

  // const post = postResult.docs[0]

  const advantagesBlock = post.layout?.find((block: any) => block.blockType === 'advantagesblock')
  const stepsBlock = post.layout?.find((block: any) => block.blockType === 'stepsblock')

  if (!post) return notFound()

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
