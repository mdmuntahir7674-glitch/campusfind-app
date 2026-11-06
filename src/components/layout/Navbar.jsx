import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PackageSearch,
  ArrowUpRight,
  Menu,
  X,
  Compass,
  FilePlus2,
  LayoutDashboard,
  Info
} from 'lucide-react'
import { useItems } from '../../context/ItemsContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { userReports } = useItems()

  const navLinks = [
    { label: 'Browse', path: '/browse', icon: Compass },
    { label: 'Report Item', path: '/report', icon: FilePlus2 },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: userReports.length },
    { label: 'About', path: '/about', icon: Info },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090B]/85 border-b border-white/[0.07] transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C6F36B] text-[#09090B] transition-transform group-hover:scale-105 duration-300">
            <PackageSearch size={22} strokeWidth={2.4} />
          </div>
          <div>
            <p className="font-heading text-lg font-bold tracking-tight text-[#F4F4F5]">
              campus<span className="text-[#C6F36B]">find.</span>
            </p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#92929D] -mt-0.5">
              Recovery Network
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex bg-[#141418] border border-white/[0.06] rounded-full px-2 py-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors flex items-center gap-2 ${
                  active ? 'text-[#09090B]' : 'text-[#92929D] hover:text-[#F4F4F5]'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="navbar-pill"
                    className="absolute inset-0 bg-[#C6F36B] rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? 'bg-[#09090B] text-[#C6F36B]' : 'bg-[#C6F36B]/20 text-[#C6F36B]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Desktop Primary CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/report"
            className="group flex items-center gap-2 rounded-full bg-[#C6F36B] px-5 py-2.5 text-xs font-bold text-[#09090B] transition duration-200 hover:bg-[#d5ff80] hover:scale-[1.03] shadow-[0_0_20px_rgba(198,243,107,0.15)]"
          >
            <span>Post a Report</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl border border-white/10 bg-[#141418] p-2.5 text-[#F4F4F5] md:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-white/[0.08] bg-[#141418]/95 backdrop-blur-2xl px-6 py-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-[#C6F36B] text-[#09090B]'
                        : 'text-[#92929D] hover:bg-white/[0.04] hover:text-[#F4F4F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          active ? 'bg-[#09090B] text-[#C6F36B]' : 'bg-[#C6F36B]/20 text-[#C6F36B]'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}

              <div className="pt-4 mt-2 border-t border-white/[0.08]">
                <Link
                  to="/report"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#C6F36B] py-3 text-sm font-bold text-[#09090B]"
                >
                  <span>Post a Report</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}