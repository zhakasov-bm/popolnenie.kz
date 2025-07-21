'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { CITY_RU } from '@/app/utils/cities'
import { PiMapPinFill } from 'react-icons/pi'
import { handleScroll } from '@/app/utils/scroll'
import { Post } from '@/payload-types'
import { FaPhoneAlt } from 'react-icons/fa'

type Props = {
  toggleMobileMenu: () => void
  isMobileOpen: boolean
  post: Post[]
  onOpenCityModal: () => void
  currentCity: string | null
}

export function MobileMenu({
  toggleMobileMenu,
  isMobileOpen,
  post,
  onOpenCityModal,
  currentCity,
}: Props) {
  const [servicesOpen, setServicesOpen] = useState(false)

  // Prevent page scroll when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    isMobileOpen && (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-400"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
        {/* Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-inputBG shadow-lg font-inter z-500 px-8 py-10 flex flex-col gap-4 transform transition-transform duration-300 ease-in-out ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-end items-center mb-4 flex-shrink-0">
            <button onClick={toggleMobileMenu}>
              <X size={40} />
            </button>
          </div>

          {/* City Selector */}
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-2 text-base font-inter underline decoration-dashed cursor-pointer"
              onClick={onOpenCityModal}
            >
              <PiMapPinFill />
              {typeof currentCity === 'string' && CITY_RU[currentCity]
                ? CITY_RU[currentCity]
                : 'Выберите город'}
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex flex-col gap-4 overflow-y-auto mt-4">
            {/* Main nav links */}
            <ul className="flex flex-col gap-6 text-link text-lg font-unbounded">
              <li>
                <Link href={'/'} className="hover:text-link" onClick={toggleMobileMenu}>
                  Главная
                </Link>
              </li>
              <li className="relative">
                <button
                  className="flex items-center gap-1 w-full text-left"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown"
                >
                  Услуги {servicesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {servicesOpen && (
                  <ul id="services-dropdown" className="mt-2 w-full z-50 font-inter">
                    {post.map((p: any) => (
                      <li key={p.id}>
                        <Link
                          href={`/${currentCity}/${p.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setServicesOpen(false)
                            toggleMobileMenu()
                          }}
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href={'#'}
                  className="hover:text-link"
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll('contact')
                    toggleMobileMenu()
                  }}
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="tel:+77752026010"
            className="text-base flex items-center gap-2 group font-unbounded pt-6"
          >
            <FaPhoneAlt size={20} className="font-unbounded" />
            +7 775 202 60 10
          </Link>
        </div>
      </>
    )
  )
}
