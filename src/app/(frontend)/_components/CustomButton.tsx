'use client'

import clsx from 'clsx'

type ButtonProps = {
  label: string
  to?: string
  className?: string
  noDefault?: boolean
  onClick?: () => void
}

export default function CustomButton({
  label,
  to,
  className,
  onClick,
  noDefault = false,
}: ButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (to?.startsWith('#')) {
      document.querySelector(to)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const buttonClass = clsx(
    'font-unbounded cursor-pointer rounded-custom',
    noDefault
      ? 'text-sm text-primary bg-black hover:text-white px-3 py-2'
      : 'w-auto mt-16 md:min-w-fit px-16 py-4 bg-primary text-black hover:bg-hover transition',
    className,
  )

  return (
    <button onClick={handleClick} className={`${buttonClass} ${className || ''}`}>
      {label}
    </button>
  )
}
