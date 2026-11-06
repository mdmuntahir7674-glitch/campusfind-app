import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react'
import Button from '../common/Button'
import { useItems } from '../../context/ItemsContext'

export default function ContactModal({ item, isOpen, onClose }) {
  const { sendInquiry } = useItems()
  const [senderName, setSenderName] = useState('')
  const [senderContact, setSenderContact] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !item) return null

  const isLost = item.type === 'lost'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!senderName.trim() || !senderContact.trim() || !message.trim()) {
      setError('Please fill out all required fields.')
      return
    }

    sendInquiry(item.id, {
      senderName: senderName.trim(),
      senderContact: senderContact.trim(),
      message: message.trim(),
      itemTitle: item.title,
    })

    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setSenderName('')
    setSenderContact('')
    setMessage('')
    setError('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#141418] p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={handleReset}
          className="absolute right-5 top-5 text-[#92929D] hover:text-[#F4F4F5] transition"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C6F36B]">
              <MessageSquare size={14} />
              <span>Campus Contact Dispatch</span>
            </div>

            <h3 className="mt-2 font-heading text-xl font-semibold text-[#F4F4F5]">
              {isLost ? 'Notify Owner: Found Belonging' : 'Initiate Item Claim Request'}
            </h3>

            <p className="mt-1.5 text-xs text-[#92929D]">
              Connecting regarding: <strong className="text-[#F4F4F5]">"{item.title}"</strong> reported by {item.reportedBy?.name || 'Campus Member'}.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-3.5 py-2.5 text-xs text-[#F4F4F5] outline-none focus:border-[#C6F36B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1">
                  Your Campus Email or Phone *
                </label>
                <input
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="e.g. m.lin@campus.edu or +1 (555) 000-1122"
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-3.5 py-2.5 text-xs text-[#F4F4F5] outline-none focus:border-[#C6F36B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#F4F4F5] mb-1">
                  {isLost ? 'Message / Handover Availability *' : 'Proof of Ownership Details *'}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isLost
                      ? "I believe I have spotted or hold your item. I can meet you at the Student Union desk..."
                      : "Provide unique identifying marks (e.g., serial number fragment, wallpaper picture, contents) to verify ownership..."
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#1C1C22] px-3.5 py-2.5 text-xs text-[#F4F4F5] outline-none focus:border-[#C6F36B]"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-3 text-[11px] text-[#92929D]">
                <ShieldCheck size={16} className="shrink-0 text-[#C6F36B]" />
                <span>Handover protocol: Always arrange meetings in public campus areas or security desks.</span>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={Send}>
                  Send Communication
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C6F36B]/10 text-[#C6F36B]">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-[#F4F4F5]">
              Inquiry Dispatched!
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#92929D]">
              Your claim note for <strong className="text-[#F4F4F5]">"{item.title}"</strong> has been logged and sent to {item.reportedBy?.name || 'the reporter'}. You will receive a copy via email.
            </p>
            <div className="mt-6">
              <Button variant="primary" size="sm" onClick={handleReset}>
                Done
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}