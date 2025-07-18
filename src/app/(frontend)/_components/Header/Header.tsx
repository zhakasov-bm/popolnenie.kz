'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from '../Logo/Logo'
import { PiMapPinFill } from 'react-icons/pi'
import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { CITY_RU, getCityRegex } from '@/app/utils/cities'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { CityModal } from './CityModal'

export interface Post {
  id: string
  name: string
  slug: string
}

interface NavbarProps {
  posts: Post[]
}

const Navbar: React.FC<NavbarProps> = ({ posts }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [isCityModalOpen, setIsCityModalOpen] = useState(false)

  const [currentCity, setCurrentCity] = useCurrentCity() as readonly [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ]

  const changeCity = (city: string) => {
    setCurrentCity(city)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCity', city)
    }
    // Если город не выбран в URL, редиректим на /city
    const cityRegex = getCityRegex()
    if (!cityRegex.test(pathname)) {
      router.push(`/${city}`)
    } else {
      const replacedPath = pathname.replace(cityRegex, `/${city}`)
      router.push(replacedPath)
    }
  }

  return (
    <nav className="container mx-auto flex justify-between fixed z-[1000] bg-back md:bg-transparent md:static items-center py-4 md:py-8 px-8 md:px-0">
      <Logo />

      <ul className="flex space-x-6 text-link/70">
        <li>
          <Link href={'/'} className="hover:text-link">
            Главная
          </Link>
        </li>
        {posts.slice(0, 3).map((post) => (
          <li key={post.id}>
            <Link href={`/${currentCity}/${post.slug}`} className="hover:text-link">
              {post.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="hidden md:flex text-base font-inter text-hoverText underline decoration-dashed items-center gap-0 cursor-pointer"
        onClick={() => setIsCityModalOpen(true)}
      >
        <PiMapPinFill />
        {typeof currentCity === 'string' && CITY_RU[currentCity]
          ? CITY_RU[currentCity]
          : 'Выберите город'}
      </button>

      {isCityModalOpen && (
        <CityModal
          currentCity={currentCity ?? ''}
          onSelect={(city) => {
            changeCity(city)
            setIsCityModalOpen(false)
          }}
          onClose={() => setIsCityModalOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
