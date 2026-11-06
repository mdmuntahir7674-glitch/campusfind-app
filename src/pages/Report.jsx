import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  FilePlus2,
  Upload,
  X,
  CheckCircle2,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Button from '../components/common/Button'
import { useItems } from '../context/ItemsContext'
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/seedData'

export default function Report() {
  const navigate = useNavigate()
  const { addItem } = useItems()

  // Form State
  const [reportType, setReportType] = useState('lost') // 'lost' | 'found'
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[1] || 'Central Library')
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [imagePreview, setImagePreview] = useState(null)

  // Reporter contact state
  const [reporterName, setReporterName] = useState('')
  const [reporterEmail, setReporterEmail] = useState('')
  const [reporterRole, setReporterRole] = useState('')

  // Validation & Submission States
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdItem, setCreatedItem] = useState(null)

  // Handle local image file upload & convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be under 2MB' }))
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setErrors((prev) => ({ ...prev, image: null }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Please provide an item title'
    if (!description.trim() || description.length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing the item'
    }
    if (!location) newErrors.location = 'Please select a campus location'
    if (!reporterName.trim()) newErrors.reporterName = 'Your name is required'
    if (!reporterEmail.trim() || !reporterEmail.includes('@')) {
      newErrors.reporterEmail = 'A valid university email is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const newItemData = {
      title: title.trim(),
      type: reportType,
      category,
      description: description.trim(),
      location,
      date,
      image:
        imagePreview ||
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80',
      reportedBy: {
        name: reporterName.trim(),
        email: reporterEmail.trim(),
        role: reporterRole.trim() || 'Campus Member',
      },
    }

    setTimeout(() => {
      const generated = addItem(newItemData)
      setIsSubmitting(false)
      setCreatedItem(generated)
    }, 400)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
        {/* Header Title */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141418] px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C6F36B]">
            <FilePlus2 size={13} />
            <span>Campus Incident Submission</span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
            Publish a Campus Report<span className="text-[#C6F36B]">.</span>
          </h1>
          <p className="mt-2 text-xs text-[#92929D]">
            Provide accurate item details to speed up identification and safe return.
          </p>
        </div>

        {/* Report Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-white/[0.08] bg-[#141418] p-6 sm:p-10">
          {/* 1. Report Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#92929D] mb-3">
              1. What are you reporting?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setReportType('lost')}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-5 text-center transition-all ${
                  reportType === 'lost'
                    ? 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                    : 'border-white/10 bg-[#1C1C22] text-[#92929D] hover:border-white/20'
                }`}
              >
                <span className="text-base font-bold font-heading">I Lost an Item</span>
                <span className="text-[11px] opacity-80">I'm looking for a misplaced belonging</span>
              </button>

              <button
                type="button"
                onClick={() => setReportType('found')}
                className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-5 text-center transition-all ${
                  reportType === 'found'
                    ? 'border-[#C6F36B]/60 bg-[#C6F36B]/10 text-[#C6F36B] shadow-[0_0_20px_rgba(198,243,107,0.12)]'
                    : 'border-white/10 bg-[#1C1C22] text-[#92929D] hover:border-white/20'
                }`}
              >
                <span className="text-base font-bold font-heading">I Found an Item</span>
                <span className="text-[11px] opacity-80">I picked up or spotted someone's item</span>
              </button>
            </div>
          </div>

          {/* 2. Item Basics */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#92929D]">
              2. Item Specifications
            </label>

            <div>
              <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                Listing Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Space Gray MacBook Air 13-inch with stickers"
                className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
              />
              {errors.title && (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
                  <AlertCircle size={12} /> {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat} className="bg-[#141418]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                  Campus Zone / Facility *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
                >
                  {CAMPUS_LOCATIONS.filter((l) => l !== 'All Locations').map((loc) => (
                    <option key={loc} value={loc} className="bg-[#141418]">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                Incident Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                Detailed Description & Distinguishing Marks *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include scratches, stickers, color variants, approximate time, or exact table number..."
                className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
              />
              {errors.description && (
                <p className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
                  <AlertCircle size={12} /> {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* 3. Image Upload Section */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#92929D]">
              3. Photograph / Reference Media
            </label>

            {imagePreview ? (
              <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C22]">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#09090B]/80 text-[#F4F4F5] backdrop-blur-md hover:bg-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/10 bg-[#1C1C22]/50 p-8 text-center cursor-pointer transition hover:border-[#C6F36B]/40 hover:bg-[#1C1C22]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-[#92929D]">
                  <Upload size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F4F4F5]">
                    Click to upload photo or drag and drop
                  </p>
                  <p className="mt-1 text-[11px] text-[#92929D]">
                    PNG, JPG, or WEBP up to 2MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
            {errors.image && (
              <p className="text-[11px] text-red-400">{errors.image}</p>
            )}
          </div>

          {/* 4. Reporter Identity */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#92929D]">
              4. Reporter Contact Information
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
                />
                {errors.reporterName && (
                  <p className="mt-1.5 text-[11px] text-red-400">{errors.reporterName}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                  Campus Email *
                </label>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="alex.m@campus.edu"
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
                />
                {errors.reporterEmail && (
                  <p className="mt-1.5 text-[11px] text-red-400">{errors.reporterEmail}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1.5">
                Campus Affiliation / Department (Optional)
              </label>
              <input
                type="text"
                value={reporterRole}
                onChange={(e) => setReporterRole(e.target.value)}
                placeholder="e.g. Sophomore (Computer Science) or Library Desk Staff"
                className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-4 py-3 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.06]">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/browse')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing Report...' : 'Publish Report to Campus'}
            </Button>
          </div>
        </form>
      </div>

      {/* Submission Success Confirmation Modal */}
      <AnimatePresence>
        {createdItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-[#C6F36B]/30 bg-[#141418] p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6F36B]/10 text-[#C6F36B]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-[#F4F4F5]">
                Report Published Successfully!
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#92929D]">
                Your {createdItem.type} report for <strong className="text-[#F4F4F5]">"{createdItem.title}"</strong> is now live on the campus directory and synced to your student dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  onClick={() => navigate(`/items/${createdItem.id}`)}
                >
                  View Listing Page
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Student Dashboard
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}