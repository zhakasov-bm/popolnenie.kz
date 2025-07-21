import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from './_components/Header/Header'
import './styles.css'
import { unbounded, montserrat, inter } from '@/app/fonts'
import ApplicationFormBlock from './_components/ApplicationFormBlock'
import ContactBlock from './_components/ContactBlock'
import { Providers } from './_components/providers/provider'
import Footer from './_components/Footer/Footer'

export const metadata = {
  description:
    'Зачисление денег для подготовки рекламных кампаний на площадках Яндекс Маркет, Яндекс Директ, Google ADW, Тик Ток, ВКонтакте, Meta (Facebook, Instagram) на выгодных условиях для юридических лиц и ИП.',
  title: 'Пополнение рекламных кабинетов',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch posts for the header navigation
  const payload = await getPayload({ config })
  const postsResult = await payload.find({
    collection: 'posts',
    sort: 'createdAt',
    limit: 10,
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
        <Providers>
          <Header posts={posts} />
          <main>{children}</main>
          <ApplicationFormBlock page={page} />
          <ContactBlock page={page} />
          <Footer posts={posts} />
        </Providers>
      </body>
    </html>
  )
}
