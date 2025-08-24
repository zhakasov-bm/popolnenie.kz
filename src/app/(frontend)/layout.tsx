import React from 'react'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'

import config from '@/payload.config'
import Header from './_components/Header/Header'
import './styles.css'
import { unbounded, montserrat, inter } from '@/app/fonts'
import ApplicationFormBlock from './_components/ApplicationFormBlock'
import ContactBlock from './_components/ContactBlock'
import { Providers } from './_components/providers/provider'
import Footer from './_components/Footer/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Пополнение рекламных кабинетов',
    template: '%s | Пополнение рекламных кабинетов',
  },
  description:
    'Зачисление денег для подготовки рекламных кампаний на площадках Яндекс Маркет, Яндекс Директ, Google ADW, Тик Ток, ВКонтакте, Meta (Facebook, Instagram) на выгодных условиях для юридических лиц и ИП.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  // Параллельно запросы
  const [postsResult, pagesResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      sort: 'createdAt',
      limit: 10,
      user,
    }),
    payload.find({
      collection: 'pages',
      limit: 1,
      user,
    }),
  ])

  const posts = postsResult.docs
  const page = pagesResult.docs[0]

  return (
    <html lang="ru" className={`${unbounded.variable} ${montserrat.variable} ${inter.variable}`}>
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
