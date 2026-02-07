import { Star, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useStore, Department } from '../store';

const departments: (Department | 'All')[] = ['All', 'CSE', 'EEE', 'Civil', 'Mechanical', 'Cyber Security', 'Other'];

export function GigsPage() {
  const { gigs, getUserById, searchQuery, departmentFilter, setDepartmentFilter, setSearchQuery, setSelectedGig, sortBy, setSortBy } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const filtered = gigs.filter(gig => {
    const matchDept = departmentFilter === 'All' || gig.department === departmentFilter;
    const matchSearch = !searchQuery || 
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      gig.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = gig.price >= priceRange[0] && gig.price <= priceRange[1];
    return matchDept && matchSearch && matchPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.orders - a.orders;
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Gigs</h1>
        <p className="text-gray-500">Discover services offered by talented university students</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                departmentFilter === dept
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || departmentFilter !== 'All') && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Active Filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {departmentFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
              {departmentFilter}
              <button onClick={() => setDepartmentFilter('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Price Range (BDT)</h3>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Min"
            />
            <span className="text-gray-400">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      )}

      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} services available</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button onClick={() => { setSearchQuery(''); setDepartmentFilter('All'); }} className="text-emerald-600 font-medium hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(gig => {
            const seller = getUserById(gig.sellerId);
            return (
              <div
                key={gig.id}
                onClick={() => setSelectedGig(gig.id)}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img src={gig.image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-700">
                      {gig.department}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                      {seller?.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm text-gray-700 font-medium">{seller?.name}</span>
                      {seller && seller.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-gray-500">{seller.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors text-sm">
                    {gig.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-800">{gig.rating}</span>
                    <span className="text-sm text-gray-400">({gig.reviewCount})</span>
                    <span className="text-gray-300 mx-1">|</span>
                    <span className="text-sm text-gray-500">{gig.orders} orders</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {gig.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Starting at</span>
                    <span className="text-lg font-bold text-gray-900">৳{gig.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
