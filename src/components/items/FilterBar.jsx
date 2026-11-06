import { Search, X, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES, CAMPUS_LOCATIONS } from '../../data/seedData'

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  onResetFilters,
  totalResults = 0
}) {
  const isFiltered = searchQuery || selectedType !== 'all' || selectedCategory !== 'All' || selectedLocation !== 'All Locations'

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141418] p-5">
      {/* Top Row: Search and Type Toggle */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92929D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, items, tags, descriptions..."
            className="w-full rounded-xl border border-white/10 bg-[#1C1C22] py-3 pl-11 pr-10 text-xs text-[#F4F4F5] outline-none transition placeholder:text-[#92929D] focus:border-[#C6F36B]/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#92929D] hover:text-[#F4F4F5]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Type Toggle Buttons (All, Lost, Found) */}
        <div className="inline-flex rounded-xl bg-[#1C1C22] p-1 border border-white/[0.06]">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'lost', label: 'Lost Only' },
            { id: 'found', label: 'Found Only' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                selectedType === type.id
                  ? 'bg-[#C6F36B] text-[#09090B] shadow-sm'
                  : 'text-[#92929D] hover:text-[#F4F4F5]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Middle Row: Location and Clear Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        {/* Campus Location Select */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#92929D]">
            Zone:
          </span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#1C1C22] px-3 py-1.5 text-xs text-[#F4F4F5] outline-none transition focus:border-[#C6F36B]"
          >
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-[#141418] text-white">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#92929D]">
            Showing <strong className="text-[#F4F4F5]">{totalResults}</strong> listings
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#C6F36B] hover:underline"
            >
              <X size={13} /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Category Pills (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <SlidersHorizontal size={14} className="shrink-0 text-[#92929D]" />
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-[#F4F4F5] text-[#09090B] font-bold'
                  : 'bg-[#1C1C22] text-[#92929D] border border-white/[0.06] hover:text-[#F4F4F5] hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}