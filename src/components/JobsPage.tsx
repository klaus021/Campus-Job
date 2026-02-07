import { Calendar, DollarSign, Clock, MapPin, X } from 'lucide-react';
import { useStore, Department } from '../store';

const departments: (Department | 'All')[] = ['All', 'CSE', 'EEE', 'Civil', 'Mechanical', 'Cyber Security', 'Other'];

export function JobsPage() {
  const { jobs, getUserById, searchQuery, departmentFilter, setDepartmentFilter, setSearchQuery, setSelectedJob, sortBy, setSortBy } = useStore();

  const filtered = jobs.filter(job => {
    const matchDept = departmentFilter === 'All' || job.department === departmentFilter;
    const matchSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-high': return b.budget - a.budget;
      case 'price-low': return a.budget - b.budget;
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
        <p className="text-gray-500">Browse and apply to jobs posted by fellow students</p>
      </div>

      {/* Filters */}
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
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="ml-auto px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        >
          <option value="newest">Newest First</option>
          <option value="price-high">Budget: High to Low</option>
          <option value="price-low">Budget: Low to High</option>
        </select>
      </div>

      {(searchQuery || departmentFilter !== 'All') && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">Active Filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
              "{searchQuery}" <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {departmentFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
              {departmentFilter} <button onClick={() => setDepartmentFilter('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4">{filtered.length} jobs available</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button onClick={() => { setSearchQuery(''); setDepartmentFilter('All'); }} className="text-emerald-600 font-medium hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(job => {
            const client = getUserById(job.clientId);
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        job.status === 'open' ? 'bg-green-100 text-green-700' :
                        job.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        job.status === 'completed' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                          {client?.name.charAt(0)}
                        </div>
                        <span>{client?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Due: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Posted {job.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.applicants.length} proposals</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                      <DollarSign className="w-3.5 h-3.5" /> Budget
                    </div>
                    <div className="text-2xl font-bold text-gray-900">৳{job.budget.toLocaleString()}</div>
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
