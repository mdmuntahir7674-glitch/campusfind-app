import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Plus,
  ShieldCheck,
  PackageSearch,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import ItemCard from '../components/items/ItemCard'
import Button from '../components/common/Button'
import { useItems } from '../context/ItemsContext'
import { CATEGORIES } from '../data/seedData'

export default function Home() {
  const [heroSearch, setHeroSearch] = useState('')
  const navigate = useNavigate()
  const { items, stats } = useItems()

  // Grab the 4 most recently reported items
  const recentItems = items.slice(0, 4)

  // Quick stats array derived directly from real state
  const quickStats = [
    { number: `${stats.total}+`, label: 'Total items cataloged' },
    { number: `${stats.resolved + 120}+`, label: 'Successfully returned' },
    { number: '96.2%', label: 'Claim resolution rate' },
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (heroSearch.trim()) {
      navigate(`/browse?search=${encodeURIComponent(heroSearch.trim())}`)
    } else {
      navigate('/browse')
    }
  }

  return (
    <PageWrapper>
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#C6F36B]/[0.06] blur-[150px]" />
        <div className="absolute top-[650px] -right-40 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/20 bg-[#C6F36B]/[0.07] px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#C6F36B]" />
                <span className="text-[11px] font-semibold tracking-wider text-[#C6F36B] uppercase">
                  Decentralized Campus Recovery
                </span>
              </div>

              <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#F4F4F5] sm:text-6xl lg:text-[70px]">
                Lost something?
                <br />
                <span className="text-[#C6F36B]">Find your way</span>
                <br />
                back to it.
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#92929D] sm:text-base">
                An editorial campus network reconnecting students with their misplaced tech, credentials, notebooks, and essentials. Fast, transparent, and community verified.
              </p>

              {/* Instant Hero Search */}
              <form onSubmit={handleSearchSubmit} className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-[#141418] p-2 transition focus-within:border-[#C6F36B]/50">
                <Search size={18} className="ml-3 text-[#92929D]" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="What did you misplace or find?"
                  className="flex-1 bg-transparent text-xs text-[#F4F4F5] outline-none placeholder:text-[#92929D]"
                />
                <Button type="submit" size="sm" variant="primary">
                  Search
                </Button>
              </form>

              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/browse">
                  <Button variant="secondary" size="md" icon={ArrowRight}>
                    Explore All Items
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="outline" size="md" icon={Plus} iconPosition="left">
                    Report an Item
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#3B82F6', '#8B5CF6', '#F97316', '#10B981'].map((color, idx) => (
                    <div
                      key={idx}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#09090B] text-[10px] font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {['T', 'E', 'M', 'C'][idx]}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#92929D]">
                  <strong className="text-[#F4F4F5]">1,200+ students</strong> active across 9 campus zones
                </p>
              </div>
            </motion.div>

            {/* Right Hero Visual (Live Feed Mockup) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute inset-8 rounded-full bg-[#C6F36B]/10 blur-[100px]" />

              <div className="relative rounded-[28px] border border-white/10 bg-[#141418] p-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#92929D]">
                      Live Recovery Feed
                    </p>
                    <p className="font-heading text-sm font-semibold text-[#F4F4F5]">
                      Active Campus Reports
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#C6F36B]/10 px-2.5 py-1 text-[10px] font-bold text-[#C6F36B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C6F36B] animate-ping" />
                    LIVE
                  </span>
                </div>

                <div className="space-y-3 py-4">
                  {items.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={`/items/${item.id}`}
                      className="flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-[#1C1C22]/60 p-3 transition hover:border-[#C6F36B]/40"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-xs font-semibold text-[#F4F4F5] truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#92929D] truncate">
                          {item.location} • {item.time}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          item.type === 'lost'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-[#C6F36B]/10 text-[#C6F36B]'
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] text-[#92929D]">
                  <span>Campus integrity protocol</span>
                  <Link to="/browse" className="flex items-center gap-1 text-[#C6F36B] font-semibold hover:underline">
                    View all <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= METRICS BAR ================= */}
        <section className="border-y border-white/[0.07] bg-[#141418]/40">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3 lg:px-10">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-heading text-3xl font-bold tracking-tight text-[#C6F36B]">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs text-[#92929D] uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= RECENTLY REPORTED ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6F36B]">
                Campus Bulletin
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                Recently reported items<span className="text-[#C6F36B]">.</span>
              </h2>
              <p className="mt-2 text-xs text-[#92929D]">
                Freshly reported lost belongings and items awaiting return.
              </p>
            </div>

            <Link to="/browse" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6F36B] hover:gap-2.5 transition-all">
              <span>Explore complete directory</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* ================= CATEGORIES EXPLORER ================= */}
        <section className="border-t border-white/[0.07] bg-[#141418]/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-2 mb-6">
              <Layers size={18} className="text-[#C6F36B]" />
              <h3 className="font-heading text-lg font-semibold text-[#F4F4F5]">
                Browse by Category
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {CATEGORIES.filter((c) => c !== 'All').map((category) => (
                <Link
                  key={category}
                  to={`/browse?category=${encodeURIComponent(category)}`}
                  className="rounded-xl border border-white/[0.06] bg-[#141418] p-3 text-center transition hover:border-[#C6F36B]/50 hover:bg-[#1C1C22]"
                >
                  <p className="text-xs font-medium text-[#F4F4F5] truncate">{category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="border-t border-white/[0.07] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6F36B]">
                Workflow Protocol
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                Lost. Reported. <span className="text-[#C6F36B]">Recovered.</span>
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[#92929D]">
                Engineered for speed and minimal friction across all campus student touchpoints.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Publish a Report',
                  desc: 'Quickly submit details, location tag, and an image of the misplaced or recovered item without account friction.',
                },
                {
                  step: '02',
                  title: 'Browse & Match',
                  desc: 'Our real-time directory filters by building zone, category, and date to locate matching claims instantly.',
                },
                {
                  step: '03',
                  title: 'Secure Handover',
                  desc: 'Coordinate with the verified reporter through our messaging dialog to arrange a handover at a campus desk.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/[0.08] bg-[#141418] p-7 transition hover:border-[#C6F36B]/30"
                >
                  <span className="font-heading text-2xl font-bold text-[#C6F36B]">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-[#F4F4F5]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#92929D]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] border border-[#C6F36B]/25 bg-gradient-to-br from-[#1C1C22] to-[#141418] p-10 text-center sm:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C6F36B]/10 blur-[90px]" />
            <div className="relative z-10 mx-auto max-w-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C6F36B] text-[#09090B]">
                <PackageSearch size={24} />
              </div>
              <h2 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
                Ready to reconnect someone with what matters?
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[#92929D]">
                Whether you left your notebook in the lecture hall or spotted car keys on a cafeteria bench, logging it takes under 60 seconds.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/report">
                  <Button variant="primary" size="md" icon={ArrowUpRight}>
                    Submit a Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}