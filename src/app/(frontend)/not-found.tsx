'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'

export default function NotFound() {
  const pathname = usePathname()
  const city = pathname.split('/')[1] || ''
  const cityUrl = city ? `/${city}` : '/'

  return (
    <>
      <Head>
        <title>404 — Страница не найдена</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '8rem 1rem' }}>
        <h1 className="font-unbounded text-4xl mb-4">404</h1>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Страница не найдена</h1>
        <p>
          Проверьте правильность адреса или вернитесь на{' '}
          <Link className="underline decoration-blue-500 decoration-2" href={cityUrl}>
            главную
          </Link>
          .
        </p>
      </main>
    </>
  )
}
