import { getPayload } from 'payload'
import config from '@/payload.config'
import BGraphic from '../../_components/BGraphic'
import StepsBlock from '../../_components/StepsBlock'
import HeroPost from './components/HeroPost'
import AdvantagesBlock from '../../_components/AdvantagesBlock'
import FloatingNav from '../../_components/FloatingNav'
import { notFound } from 'next/navigation'
import { Post } from '@/payload-types'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

// Получаем пост по слагу
async function getPost(slug: string): Promise<Post> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0]
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

// Метаданные страницы
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    title: `${post.name}`,
    // description: post.subheading.substring(0, 160),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

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
