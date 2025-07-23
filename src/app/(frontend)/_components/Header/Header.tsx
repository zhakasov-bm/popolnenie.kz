'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Logo } from '../Logo/Logo'
import { Menu } from 'lucide-react'
import { PiMapPinFill } from 'react-icons/pi'
import { FaPhoneAlt } from 'react-icons/fa'

import { useCurrentCity } from '@/app/utils/useCurrentCity'
import { CITY_RU, getCityRegex } from '@/app/utils/cities'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { CityModal } from './CityModal'
import { handleScroll } from '@/app/utils/scroll'
import { MobileMenu } from './MobileMenu'
import type { Post } from '@/payload-types'
import CustomButton from '../CustomButton'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'

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

  const city = pathname.split('/')[1] || ''
  const cityUrl = city ? `/${city}` : '/'

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  // Mobile Menu
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev)

  return (
    <nav className="container mx-auto flex justify-between fixed z-[1000] bg-back md:bg-transparent md:static items-center py-5 md:py-8 px-6 md:px-0">
      <div className="flex gap-2 md:gap-16 items-center">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-around">
          <ul className="flex gap-6 text-link/70 cursor-pointer font-unbounded">
            <li>
              <Link href={cityUrl} className="hover:text-link">
                Главная
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="hover:text-link cursor-pointer">Услуги</div>

              <ul
                ref={dropdownRef}
                className={`absolute left-0 mt-2 w-48 bg-inputBG text-black rounded text-link shadow-lg transition-all z-50 font-inter ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {posts.map((post: any) => (
                  <li key={post.id}>
                    <Link
                      href={`/${currentCity}/${post.slug}`}
                      className="block px-4 py-2 hover:bg-link/10"
                      onClick={() => {
                        setDropdownOpen(false)
                      }}
                    >
                      {post.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href={'#'}
                className="hover:text-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleScroll('contact')
                }}
              >
                Контакты
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-2 md:gap-5">
        <button
          className="hidden md:flex text-base font-inter text-hoverText underline decoration-dashed items-center gap-0 cursor-pointer"
          onClick={() => setIsCityModalOpen(true)}
        >
          <PiMapPinFill />
          {typeof currentCity === 'string' && CITY_RU[currentCity]
            ? CITY_RU[currentCity]
            : 'Выберите город'}
        </button>

        <Link
          href="tel:+77752026010"
          className="hidden text-base md:flex items-center gap-2 group font-unbounded"
        >
          <FaPhoneAlt
            size={20}
            className="transition-transform duration-300 group-hover:rotate-12 font-unbounded"
          />
          +7 775 202 60 10
        </Link>
        <div className="flex items-center justify-center w-10 h-10 cursor-pointer">
          <ThemeSwitch />
        </div>

        {/* Burger button (mobile only) */}
        <div className="flex gap-3 md:hidden z-50">
          <CustomButton label="Заказать" className="!m-0 !px-4 !py-1 !text-xs" to="#form" />
          <button onClick={toggleMobileMenu}>{isMobileOpen ? '' : <Menu size={40} />}</button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 bg-white shadow-lg font-inter z-50 px-8 py-10 flex flex-col gap-4
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
          ${isMobileOpen ? '' : 'pointer-events-none'}
        `}
        style={{ visibility: isMobileOpen ? 'visible' : 'hidden' }}
      >
        <MobileMenu
          toggleMobileMenu={toggleMobileMenu}
          isMobileOpen={isMobileOpen}
          post={posts}
          onOpenCityModal={() => setIsCityModalOpen(true)}
          currentCity={currentCity}
        />
      </div>

      {isCityModalOpen && (
        <CityModal
          currentCity={currentCity ?? ''}
          onSelect={(city) => {
            changeCity(city)
            setIsCityModalOpen(false)
            setIsMobileOpen(false)
          }}
          onClose={() => setIsCityModalOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
