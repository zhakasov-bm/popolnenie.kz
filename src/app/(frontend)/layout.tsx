import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from './_components/Header/Header'
import './styles.css'
import { unbounded, montserrat, inter } from '@/app/fonts'
import ApplicationFormBlock from './_components/ApplicationFormBlock'
import ContactBlock from './_components/ContactBlock'

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

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
  })
  const page = res.docs[0]

  return (
    <html lang="en" className={`${unbounded.variable} ${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header posts={posts} />
        <main>{children}</main>
        <ApplicationFormBlock page={page} />
        <ContactBlock page={page} />
      </body>
    </html>
  )
}
