'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

export const Logo = () => {
  const { resolvedTheme } = useTheme()

  const logo = resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'

  const pathname = usePathname()
  const city = pathname.split('/')[1] || ''
  const cityUrl = city ? `/${city}` : '/'

  if (!resolvedTheme) return null

  return (
    <Link href={cityUrl}>
      <Image src={logo} alt="simply-logo" width={120} height={50} draggable={false} />
    </Link>
  )
}
