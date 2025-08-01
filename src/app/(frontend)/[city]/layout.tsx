// app/[city]/layout.tsx

import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import React from 'react'

type Props = {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  return {
    title: {
      default: 'Пополнение рекламных кабинетов',
      template: '%s | Пополнение рекламных кабинетов',
    },
    description: 'Зачисление денег для подготовки рекламных кампаний...',
    alternates: {
      canonical: `https://popolnenie.kz/${city}`,
    },
  }
}

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
