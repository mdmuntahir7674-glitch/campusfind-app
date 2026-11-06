import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  Clock,
  RotateCcw,
  Package,
  AlertCircle,
  MessageSquare
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import { useItems } from '../context/ItemsContext'

export default function Dashboard() {
  const { items, messages, deleteItem, setItemStatus, resetToSeed } = useItems()
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'lost' | 'found'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  // Filter user reports (both user-flagged items and demo defaults)
  const myReports = items.filter((item) => {
    if (activeTab === 'lost') return item.type === 'lost'
    if (activeTab === 'found') return item.type === 'found'
    return true
  })

  const myLostCount = items.filter((i) => i.type === 'lost').length
  const myFoundCount = items.filter((i) => i.type === 'found').length
  const resolvedCount = items.filter((i) => i.status === 'resolved').length

  const handleDelete = (id) => {
    deleteItem(id)
    setDeleteConfirmId(null)
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header Block */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141418] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C6F36B]">
              <LayoutDashboard size={13} />
              <span>Student Account Portal</span>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Activity Dashboard<span className="text-[#C6F36B]">.</span>
            </h1>
            <p className="mt-1 text-xs text-[#92929D]">
              Track, update status, and manage your campus reports and contact claims.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/report">
              <Button variant="primary" size="md" icon={Plus} iconPosition="left">
                New Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Active Campus Listings', value: items.length, highlight: false },
            { label: 'Lost Items Logged', value: myLostCount, highlight: false },
            { label: 'Found Items Logged', value: myFoundCount, highlight: false },
            { label: 'Resolved Returns', value: resolvedCount, highlight: true },
          ].map((metric, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-5 ${
                metric.highlight
                  ? 'border-[#C6F36B]/30 bg-[#C6F36B]/[0.04]'
                  : 'border-white/[0.08] bg-[#141418]'
              }`}
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#92929D]">
                {metric.label}
              </p>
              <p className={`mt-2 font-heading text-3xl font-bold tracking-tight ${metric.highlight ? 'text-[#C6F36B]' : 'text-[#F4F4F5]'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Reports Management Table */}
        <div className="mt-10 rounded-3xl border border-white/[0.08] bg-[#141418] overflow-hidden">
          {/* Table Toolbar */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-lg font-semibold text-[#F4F4F5]">
                Managed Campus Listings
              </h2>
              <p className="text-xs text-[#92929D]">
                Showing {myReports.length} listings registered in local storage
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl bg-[#1C1C22] p-1 border border-white/[0.06]">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'lost', label: `Lost (${myLostCount})` },
                { id: 'found', label: `Found (${myFoundCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#C6F36B] text-[#09090B]'
                      : 'text-[#92929D] hover:text-[#F4F4F5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listings List / Table */}
          {myReports.length > 0 ? (
            <div className="divide-y divide-white/[0.06]">
              {myReports.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-white/[0.02] transition"
                >
                  {/* Item Image and Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-14 w-14 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.type === 'lost' ? 'lost' : 'found'} size="xs">
                          {item.type}
                        </Badge>
                        <span className="text-[10px] text-[#92929D] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <Link
                        to={`/items/${item.id}`}
                        className="mt-1 block font-heading text-sm font-semibold text-[#F4F4F5] hover:text-[#C6F36B] truncate transition"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[11px] text-[#92929D] truncate">
                        {item.location} • {item.date}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    {/* Status Toggle Selector */}
                    <select
                      value={item.status}
                      onChange={(e) => setItemStatus(item.id, e.target.value)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none transition ${
                        item.status === 'resolved'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : item.status === 'claimed'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                          : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      <option value="open" className="bg-[#141418] text-white">Status: Open</option>
                      <option value="claimed" className="bg-[#141418] text-white">Status: Claimed</option>
                      <option value="resolved" className="bg-[#141418] text-white">Status: Resolved</option>
                    </select>

                    <Link
                      to={`/items/${item.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#1C1C22] text-[#92929D] hover:text-[#F4F4F5] hover:border-white/20 transition"
                      title="View Public Listing"
                    >
                      <ExternalLink size={14} />
                    </Link>

                    {/* Delete Trigger */}
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                      title="Delete Report"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-14 text-center">
              <Package size={36} className="mx-auto text-[#92929D]" />
              <p className="mt-4 font-heading text-base font-semibold text-[#F4F4F5]">
                No reports found under this tab
              </p>
              <p className="mt-1 text-xs text-[#92929D]">
                Get started by reporting a new lost or found item.
              </p>
            </div>
          )}
        </div>

        {/* Demo Message Inquiries Log */}
        {messages.length > 0 && (
          <div className="mt-10 rounded-3xl border border-white/[0.08] bg-[#141418] p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-[#C6F36B]" />
              <h3 className="font-heading text-base font-semibold text-[#F4F4F5]">
                Dispatch & Claim Communications Log ({messages.length})
              </h3>
            </div>

            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-2xl border border-white/[0.06] bg-[#1C1C22] p-4 text-xs"
                >
                  <div className="flex items-center justify-between text-[#92929D] mb-1.5">
                    <span className="font-semibold text-[#F4F4F5]">{msg.senderName} ({msg.senderContact})</span>
                    <span className="text-[10px]">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-[#C6F36B] font-medium text-[11px] mb-1">Regarding: {msg.itemTitle}</p>
                  <p className="text-[#92929D] italic">"{msg.message}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset Database Trigger */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#141418] p-6 sm:flex-row">
          <div>
            <p className="font-heading text-xs font-semibold text-[#F4F4F5]">
              Developer & Demo Environment Controls
            </p>
            <p className="text-[11px] text-[#92929D]">
              Reset all modifications and restore original campus seed listings.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            iconPosition="left"
            onClick={resetToSeed}
          >
            Reset Seed Data
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#141418] p-6 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <AlertCircle size={24} />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-[#F4F4F5]">
                Delete This Report?
              </h3>
              <p className="mt-1.5 text-xs text-[#92929D]">
                This will permanently remove the item listing from the campus directory and local storage.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirmId(null)}>
                  Cancel
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(deleteConfirmId)}>
                  Confirm Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}