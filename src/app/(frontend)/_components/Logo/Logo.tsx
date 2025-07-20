'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export const Logo = () => {
  const { resolvedTheme } = useTheme()

  const logo = resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo.svg'

  if (!resolvedTheme) return null

  return (
    <Link href="/">
      <Image src={logo} alt="simply-logo" width={120} height={50} draggable={false} />
    </Link>
  )
}
