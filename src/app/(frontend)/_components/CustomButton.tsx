'use client'

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

  const baseStyle = noDefault
    ? ''
    : 'w-auto mt-16 md:min-w-fit px-16 py-4 bg-primary font-unbounded text-black rounded-custom cursor-pointer hover:bg-hover transition'

  return (
    <button onClick={handleClick} className={`${baseStyle} ${className || ''}`}>
      {label}
    </button>
  )
}
