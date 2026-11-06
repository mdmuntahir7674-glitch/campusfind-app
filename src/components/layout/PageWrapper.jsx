import { motion } from 'framer-motion'

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`min-h-[calc(100vh-80px)] ${className}`}
    >
      {children}
    </motion.div>
  )
}