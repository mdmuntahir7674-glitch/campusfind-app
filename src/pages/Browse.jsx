import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  ArrowUpDown,
  SearchX,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'
import ItemCard from '../components/items/ItemCard'
import FilterBar from '../components/items/FilterBar'
import Button from '../components/common/Button'
import { useItems } from '../context/ItemsContext'

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { items } = useItems()

  // Initialize filter state from URL params if present
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All Locations')
  const [sortBy, setSortBy] = useState('newest')

  // Keep state synced if URL parameters change externally
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    const urlCategory = searchParams.get('category')
    const urlType = searchParams.get('type')

    if (urlSearch !== null) setSearchQuery(urlSearch)
    if (urlCategory !== null) setSelectedCategory(urlCategory)
    if (urlType !== null) setSelectedType(urlType)
  }, [searchParams])

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedType('all')
    setSelectedCategory('All')
    setSelectedLocation('All Locations')
    setSearchParams({})
  }

  // Filter and sort item calculations
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Type matching (all | lost | found)
        if (selectedType !== 'all' && item.type !== selectedType) {
          return false
        }

        // Category matching
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false
        }

        // Location matching
        if (selectedLocation !== 'All Locations') {
          if (!item.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
            return false
          }
        }

        // Keyword query matching
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim()
          const inTitle = item.title.toLowerCase().includes(query)
          const inDesc = item.description?.toLowerCase().includes(query)
          const inLocation = item.location?.toLowerCase().includes(query)
          const inCategory = item.category?.toLowerCase().includes(query)

          if (!inTitle && !inDesc && !inLocation && !inCategory) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  }, [items, searchQuery, selectedType, selectedCategory, selectedLocation, sortBy])

  return (
    <PageWrapper>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header Block */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141418] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#C6F36B]">
              <Compass size={13} />
              <span>Campus Index</span>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#F4F4F5] sm:text-4xl">
              Browse Listings<span className="text-[#C6F36B]">.</span>
            </h1>
            <p className="mt-1 text-xs text-[#92929D]">
              Filter active reports by category, campus zone, or keywords.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-[#92929D]" />
            <span className="text-xs text-[#92929D]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#141418] px-3 py-1.5 text-xs font-medium text-[#F4F4F5] outline-none focus:border-[#C6F36B]"
            >
              <option value="newest" className="bg-[#141418]">Newest First</option>
              <option value="oldest" className="bg-[#141418]">Oldest First</option>
              <option value="title" className="bg-[#141418]">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Controller */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          onResetFilters={handleResetFilters}
          totalResults={filteredItems.length}
        />

        {/* Items Grid & Empty State */}
        <div className="mt-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredItems.map((item, index) => (
                  <ItemCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#141418]/60 px-6 py-20 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] text-[#92929D]">
                  <SearchX size={32} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-[#F4F4F5]">
                  No matching listings found
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#92929D]">
                  We couldn't find any reports matching your active filters. Try searching with different keywords or clearing your active filters.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={RotateCcw}
                    iconPosition="left"
                    onClick={handleResetFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  )
}