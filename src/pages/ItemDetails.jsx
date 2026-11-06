import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Mail,
  Phone,
  User,
  Shield,
  MessageCircle,
  Share2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import ItemCard from '../components/items/ItemCard'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import ContactModal from '../components/items/ContactModal'
import { useItems } from '../context/ItemsContext'

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById, items, setItemStatus } = useItems()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [copyNotice, setCopyNotice] = useState(false)

  const item = getItemById(id)

  if (!item) {
    return (
      <PageWrapper>
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 py-28 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-[#92929D]">
            <AlertTriangle size={30} />
          </div>
          <h2 className="mt-5 font-heading text-2xl font-bold text-[#F4F4F5]">
            Item Listing Not Found
          </h2>
          <p className="mt-2 text-xs text-[#92929D]">
            The requested listing might have been removed, archived, or resolved by its owner.
          </p>
          <div className="mt-6">
            <Link to="/browse">
              <Button variant="primary" size="sm" icon={ArrowLeft} iconPosition="left">
                Return to Directory
              </Button>
            </Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const isLost = item.type === 'lost'

  // Filter 3 related items with the same category, excluding the current one
  const relatedItems = items
    .filter((i) => i.id !== item.id && (i.category === item.category || i.type === item.type))
    .slice(0, 3)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyNotice(true)
    setTimeout(() => setCopyNotice(false), 2500)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#92929D] hover:text-[#C6F36B] transition"
          >
            <ArrowLeft size={14} /> Back to Listings
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#141418] px-3.5 py-1.5 text-xs text-[#92929D] hover:text-[#F4F4F5] hover:border-white/20 transition"
          >
            <Share2 size={13} />
            <span>{copyNotice ? 'Link Copied!' : 'Share Listing'}</span>
          </button>
        </div>

        {/* Primary Item Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Media Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#1C1C22] shadow-2xl">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[#92929D]">
                  No image photograph provided
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <Badge variant={isLost ? 'lost' : 'found'} size="md">
                  {item.type}
                </Badge>
                <Badge
                  variant={
                    item.status === 'open'
                      ? 'open'
                      : item.status === 'resolved'
                      ? 'resolved'
                      : 'claimed'
                  }
                  size="md"
                >
                  Status: {item.status}
                </Badge>
              </div>
            </div>

            {/* Description & Narrative */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#141418] p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-[#F4F4F5]">
                Item Description & Distinguishing Marks
              </h3>
              <p className="mt-4 whitespace-pre-line text-xs sm:text-sm leading-relaxed text-[#92929D]">
                {item.description}
              </p>

              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#92929D] mb-4">
                  Campus Location & Time Log
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#1C1C22]/60 p-3.5">
                    <MapPin size={18} className="text-[#C6F36B] shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-[#92929D]">Reported Zone</p>
                      <p className="font-semibold text-[#F4F4F5] mt-0.5">{item.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#1C1C22]/60 p-3.5">
                    <Calendar size={18} className="text-[#C6F36B] shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase text-[#92929D]">Timestamp</p>
                      <p className="font-semibold text-[#F4F4F5] mt-0.5">{item.date} • {item.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/[0.08] bg-[#141418] p-6 sm:p-8 shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#92929D]">
                Category: {item.category}
              </span>
              <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-[#F4F4F5] sm:text-3xl">
                {item.title}
              </h1>

              {/* Action Triggers */}
              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={MessageCircle}
                  onClick={() => setIsContactOpen(true)}
                >
                  {isLost ? 'I Have Found This Item' : 'Claim This Item'}
                </Button>

                {item.isUserReport && (
                  <div className="rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-4 text-xs">
                    <p className="font-semibold text-[#F4F4F5] mb-2">Manage Your Listing:</p>
                    <div className="flex gap-2">
                      <Button
                        variant={item.status === 'resolved' ? 'primary' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          setItemStatus(item.id, item.status === 'resolved' ? 'open' : 'resolved')
                        }
                      >
                        {item.status === 'resolved' ? 'Mark as Open' : 'Mark as Resolved'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Reporter Credentials */}
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#92929D] mb-4">
                  Reported By
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-[#C6F36B]">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#F4F4F5]">
                        {item.reportedBy?.name || 'Campus Student'}
                      </p>
                      <p className="text-[11px] text-[#92929D]">
                        {item.reportedBy?.role || 'University Member'}
                      </p>
                    </div>
                  </div>

                  {item.reportedBy?.email && (
                    <div className="flex items-center gap-2 text-xs text-[#92929D] pl-1">
                      <Mail size={13} className="text-[#C6F36B]" />
                      <span>{item.reportedBy.email}</span>
                    </div>
                  )}

                  {item.reportedBy?.phone && (
                    <div className="flex items-center gap-2 text-xs text-[#92929D] pl-1">
                      <Phone size={13} className="text-[#C6F36B]" />
                      <span>{item.reportedBy.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Integrity Notice */}
              <div className="mt-8 rounded-2xl border border-[#C6F36B]/20 bg-[#C6F36B]/[0.04] p-4 text-xs leading-relaxed text-[#92929D]">
                <div className="flex items-center gap-2 font-semibold text-[#C6F36B] mb-1">
                  <Shield size={14} /> Campus Safety Verified
                </div>
                Verify the serial number or unique traits with the reporter before finalizing return. In-person exchanges are recommended at university helpdesks.
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div className="mt-20 border-t border-white/[0.08] pt-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-heading text-xl font-semibold text-[#F4F4F5]">
                  Related Campus Listings
                </h3>
                <p className="text-xs text-[#92929D]">
                  Other items logged in {item.category} or matching status.
                </p>
              </div>
              <Link
                to="/browse"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6F36B] hover:gap-2.5 transition-all"
              >
                <span>View all</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((relItem, idx) => (
                <ItemCard key={relItem.id} item={relItem} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Claim / Contact Modal */}
      <ContactModal
        item={item}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </PageWrapper>
  )
}