'use client'

import ThemeSwitch from './ThemeSwitch/ThemeSwitch'
import { Logo } from './Logo/Logo'
import { IoArrowUpOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import CustomButton from './CustomButton'

type LayoutProps = {
  blocks: {
    blockType: string
  }[]
  children?: React.ReactNode
}

export default function FloatingNav({ blocks }: LayoutProps) {
  const allowedBlocks = [
    { type: 'advantagesblock', label: 'Преимущества' },
    { type: 'tarifblock', label: 'Тарифы' },
    { type: 'stepsblock', label: 'Этапы работ' },
    { type: 'team', label: 'Команда' },
    { type: 'reviews', label: 'Отзывы' },
  ]

  return (
    <div className="hidden md:block fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] text-base font-inter">
      <div className="flex items-center gap-5 w-fit border border-black/20 bg-white/30 backdrop-blur-sm rounded-full text-black/40 py-2 px-6">
        <div className="w-24 h-auto">
          <Logo />
        </div>
        <div>|</div>
        <nav className="flex items-center gap-3">
          {blocks
            .filter((block) => allowedBlocks.some((b) => b.type === block.blockType))
            .map((block, i) => {
              const found = allowedBlocks.find((b) => b.type === block.blockType)
              return (
                <button
                  type="button"
                  key={i}
                  className="cursor-pointer hover:text-black whitespace-nowrap bg-transparent border-none p-0"
                  onClick={() => {
                    const el = document.getElementById(block.blockType)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {found?.label}
                </button>
              )
            })}
        </nav>
        <motion.div
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="cursor-pointer relative group"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <IoArrowUpOutline className="text-xl" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            Наверх
          </span>
        </motion.div>

        <ThemeSwitch />
        <CustomButton label="Заказать" noDefault to="#form" />
      </div>
    </div>
  )
}
