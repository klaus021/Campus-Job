import { Search, ArrowRight, Star, Users, Briefcase, Shield, BookOpen, Cpu, Zap, Building2, Wrench, Lock } from 'lucide-react';
import { useStore, Department } from '../store';

const departmentInfo: { dept: Department; icon: React.ReactNode; color: string; bg: string }[] = [
  { dept: 'CSE', icon: <Cpu className="w-7 h-7" />, color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100' },
  { dept: 'EEE', icon: <Zap className="w-7 h-7" />, color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100' },
  { dept: 'Civil', icon: <Building2 className="w-7 h-7" />, color: 'text-orange-600', bg: 'bg-orange-50 hover:bg-orange-100' },
  { dept: 'Mechanical', icon: <Wrench className="w-7 h-7" />, color: 'text-red-600', bg: 'bg-red-50 hover:bg-red-100' },
  { dept: 'Cyber Security', icon: <Lock className="w-7 h-7" />, color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100' },
  { dept: 'Other', icon: <BookOpen className="w-7 h-7" />, color: 'text-gray-600', bg: 'bg-gray-50 hover:bg-gray-100' },
];

export function HomePage() {
  const { setPage, setDepartmentFilter, gigs, users, searchQuery, setSearchQuery, getUserById } = useStore();

  const featuredGigs = gigs.slice(0, 6);
  const topFreelancers = users.filter(u => u.reviewCount > 0).sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-emerald-100 text-sm font-medium">University Freelance Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find & Hire Talented
              <br />
              <span className="text-emerald-200">University Students</span>
            </h1>
            <p className="text-lg text-emerald-100 mb-8 max-w-xl">
              A friendly marketplace where university students can showcase their skills, find projects, and grow professionally — all within the campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg"
                />
              </div>
              <button
                onClick={() => setPage('gigs')}
                className="px-8 py-3.5 bg-emerald-800 text-white font-semibold rounded-xl hover:bg-emerald-900 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Web Development', 'UI/UX Design', 'AutoCAD', 'MATLAB', 'Python'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSearchQuery(tag); setPage('gigs'); }}
                  className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-sm rounded-full hover:bg-white/25 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-6 h-6 text-emerald-600" />, value: `${users.length}+`, label: 'Active Students' },
              { icon: <Briefcase className="w-6 h-6 text-blue-600" />, value: `${gigs.length}+`, label: 'Services Available' },
              { icon: <Star className="w-6 h-6 text-amber-500" />, value: '4.8', label: 'Average Rating' },
              { icon: <Shield className="w-6 h-6 text-purple-600" />, value: '100%', label: 'Verified Students' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Department</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Find skilled students from your department or explore talent across all disciplines</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {departmentInfo.map(({ dept, icon, color, bg }) => (
              <button
                key={dept}
                onClick={() => { setDepartmentFilter(dept); setPage('gigs'); }}
                className={`${bg} rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1 group`}
              >
                <div className={`${color} flex justify-center mb-3 transition-transform group-hover:scale-110`}>{icon}</div>
                <div className="font-semibold text-gray-800 text-sm">{dept}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {gigs.filter(g => g.department === dept).length} gigs
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Services</h2>
              <p className="text-gray-500">Discover top-rated gigs from talented students</p>
            </div>
            <button
              onClick={() => setPage('gigs')}
              className="hidden sm:flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGigs.map(gig => {
              const seller = getUserById(gig.sellerId);
              return (
                <div
                  key={gig.id}
                  onClick={() => { useStore.getState().setSelectedGig(gig.id); }}
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
                      <span className="text-sm text-gray-600 font-medium">{seller?.name}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {gig.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-800">{gig.rating}</span>
                      <span className="text-sm text-gray-400">({gig.reviewCount})</span>
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
          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => setPage('gigs')}
              className="inline-flex items-center gap-2 text-emerald-600 font-medium"
            >
              View All Gigs <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Rated Students</h2>
            <p className="text-gray-500">Meet the highest-rated freelancers on campus</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFreelancers.map(user => (
              <div key={user.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-2">{user.department}</p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-sm">{user.rating}</span>
                  <span className="text-gray-400 text-sm">({user.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {user.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{skill}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{user.completedJobs} jobs completed</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Create Your Profile', desc: 'Sign up with your university email, add your skills, and tell the community about your expertise.' },
              { step: '2', title: 'Post or Browse', desc: 'Create a gig to offer your services or browse available jobs and gigs from fellow students.' },
              { step: '3', title: 'Collaborate & Earn', desc: 'Work together, deliver quality results, and build your reputation within the university community.' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-emerald-100 text-lg mb-8">Join your fellow students and start your freelancing journey today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setPage('register')} className="px-8 py-3.5 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
              Join as a Freelancer
            </button>
            <button onClick={() => setPage('jobs')} className="px-8 py-3.5 bg-emerald-800 text-white font-semibold rounded-xl hover:bg-emerald-900 transition-colors shadow-lg">
              Hire a Student
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="text-lg font-bold text-white">UGV<span className="text-emerald-400">Market</span></span>
              </div>
              <p className="text-sm">The university marketplace for students, by students.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">For Students</h4>
              <div className="space-y-2 text-sm">
                <p className="cursor-pointer hover:text-white" onClick={() => setPage('gigs')}>Browse Gigs</p>
                <p className="cursor-pointer hover:text-white" onClick={() => setPage('jobs')}>Find Jobs</p>
                <p className="cursor-pointer hover:text-white" onClick={() => setPage('register')}>Create Account</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Categories</h4>
              <div className="space-y-2 text-sm">
                {['CSE', 'EEE', 'Civil', 'Mechanical'].map(dept => (
                  <p key={dept} className="cursor-pointer hover:text-white" onClick={() => { setDepartmentFilter(dept as Department); setPage('gigs'); }}>{dept}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <div className="space-y-2 text-sm">
                <p>Help Center</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Contact Us</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 UGV Marketplace. All rights reserved. Made with ❤️ by University students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
