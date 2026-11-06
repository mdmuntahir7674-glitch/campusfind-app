import { Link } from 'react-router-dom'
import { PackageSearch, Heart, Shield, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#09090B] text-[#92929D]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C6F36B] text-[#09090B]">
                <PackageSearch size={20} strokeWidth={2.4} />
              </div>
              <p className="font-heading text-lg font-bold tracking-tight text-[#F4F4F5]">
                campus<span className="text-[#C6F36B]">find.</span>
              </p>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-6 text-[#92929D]">
              A decentralized, student-powered lost and found ecosystem engineered to reconnect campus members with their essential belongings safely and transparently.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[11px] text-[#92929D]">
              <Shield size={14} className="text-[#C6F36B]" />
              <span>Campus Security & Student Life Verified Initiative</span>
            </div>
          </div>

          {/* Directory Links */}
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#F4F4F5]">
              Directory
            </p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/browse" className="transition hover:text-[#C6F36B]">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/report" className="transition hover:text-[#C6F36B]">
                  Report Lost Belonging
                </Link>
              </li>
              <li>
                <Link to="/report" className="transition hover:text-[#C6F36B]">
                  Report Found Belonging
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition hover:text-[#C6F36B]">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Support */}
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#F4F4F5]">
              Community
            </p>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="transition hover:text-[#C6F36B]">
                  Safety & Ethics Guidelines
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-[#C6F36B]">
                  How Claim Verification Works
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-[#C6F36B]"
                >
                  Source Repository <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[11px] sm:flex-row">
          <p>© 2026 CampusFind. University Lost & Found Protocal.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart size={12} className="text-red-400 fill-red-400" /> for campus communities
          </p>
        </div>
      </div>
    </footer>
  )
}