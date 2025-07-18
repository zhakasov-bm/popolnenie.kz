import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from './_components/Header/Header'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch posts for the header navigation
  const payload = await getPayload({ config })
  const postsResult = await payload.find({
    collection: 'posts',
    limit: 10, // Get first 10 posts for navigation
  })
  const posts = postsResult.docs

  return (
    <html lang="en">
      <body>
        <Header posts={posts} />
        <main>{children}</main>
      </body>
    </html>
  )
}
