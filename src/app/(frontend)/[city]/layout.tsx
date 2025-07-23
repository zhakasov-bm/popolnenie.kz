// app/[city]/layout.tsx

import { CITY_METADATA } from '@/app/utils/cityMetadata'
import React from 'react'

// export async function generateMetadata({ params }: { params: { city: string } }) {
//   const city = params.city
//   const meta = CITY_METADATA[city]

//   if (!meta) {
//     return {
//       title: 'Пополнение рекламных кабинетов',
//       description:
//         'Зачисление денег для подготовки рекламных кампаний на Яндекс, Google, TikTok, Meta и других площадках.',
//     }
//   }

//   return {
//     title: meta.title,
//     description: meta.description,
//   }
// }

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
