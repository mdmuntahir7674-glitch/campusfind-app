export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium uppercase tracking-wider rounded-full transition-colors'
  
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[9px] font-bold tracking-widest',
    sm: 'px-2.5 py-1 text-[10px] font-bold tracking-wide',
    md: 'px-3.5 py-1.5 text-xs font-semibold',
  }

  const variantClasses = {
    // Report Types
    lost: 'bg-red-500/10 text-red-400 border border-red-500/20',
    found: 'bg-[#C6F36B]/10 text-[#C6F36B] border border-[#C6F36B]/25',
    
    // Status Types
    open: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    claimed: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    resolved: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    
    // Neutrals
    default: 'bg-white/[0.06] text-zinc-300 border border-white/10',
    lime: 'bg-[#C6F36B] text-[#09090B] font-bold',
  }

  return (
    <span className={`${baseClasses} ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.default} ${className}`}>
      {children}
    </span>
  )
}