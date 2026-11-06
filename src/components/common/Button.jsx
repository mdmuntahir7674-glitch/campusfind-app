import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  }

  const variantClasses = {
    primary: 'bg-[#C6F36B] text-[#09090B] hover:bg-[#d8ff85] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(198,243,107,0.18)]',
    secondary: 'bg-[#1C1C22] text-[#F4F4F5] border border-white/10 hover:border-[#C6F36B]/40 hover:bg-white/[0.05] active:scale-[0.98]',
    outline: 'border border-white/15 text-[#F4F4F5] hover:border-[#C6F36B]/50 hover:bg-white/[0.03] active:scale-[0.98]',
    ghost: 'text-[#92929D] hover:text-[#F4F4F5] hover:bg-white/[0.04]',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </motion.button>
  )
}