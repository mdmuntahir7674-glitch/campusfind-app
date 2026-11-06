import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react'
import Badge from '../common/Badge'

export default function ItemCard({ item, index = 0 }) {
  const isLost = item.type === 'lost'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141418] transition-all duration-300 hover:border-[#C6F36B]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      <Link to={`/items/${item.id}`} className="flex flex-col h-full">
        {/* Media Preview Box */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1C1C22]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-[#92929D]">
              No photograph provided
            </div>
          )}

          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <Badge variant={isLost ? 'lost' : 'found'}>
              {item.type}
            </Badge>

            {item.status !== 'open' && (
              <Badge variant={item.status === 'resolved' ? 'resolved' : 'claimed'}>
                {item.status}
              </Badge>
            )}
          </div>

          {/* Corner Quick Link Arrow */}
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#09090B]/70 text-[#92929D] backdrop-blur-md transition-all duration-300 group-hover:bg-[#C6F36B] group-hover:text-[#09090B] group-hover:scale-110">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#92929D]">
              {item.category}
            </span>
            {item.isUserReport && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#C6F36B]">
                <ShieldCheck size={12} /> My Report
              </span>
            )}
          </div>

          <h3 className="mt-2 font-heading text-base font-semibold leading-snug text-[#F4F4F5] line-clamp-1 group-hover:text-[#C6F36B] transition-colors">
            {item.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-[#92929D] line-clamp-2 flex-1">
            {item.description}
          </p>

          {/* Footer Metadata */}
          <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3 text-[11px] text-[#92929D]">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="shrink-0 text-[#C6F36B]" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="shrink-0 text-[#92929D]" />
              <span>{item.date} • {item.time}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}