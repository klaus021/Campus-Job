import { Star, MapPin, Calendar, Award, Edit, Briefcase } from 'lucide-react';
import { useStore } from '../store';

export function ProfilePage() {
  const { currentUser, gigs, reviews, getUserById, setPage, setSelectedGig } = useStore();

  if (!currentUser) return null;

  const myGigs = gigs.filter(g => g.sellerId === currentUser.id);
  const myReviews = reviews.filter(r => r.revieweeId === currentUser.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        <div className="px-6 pb-6 relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white -mt-12 relative z-10">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-emerald-600 font-medium">{currentUser.department} • {currentUser.university}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentUser.university}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined {currentUser.joinedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentUser.rating} ({currentUser.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{currentUser.completedJobs} jobs completed</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setPage('edit-profile')}
              className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{currentUser.bio || 'No bio added yet.'}</p>
          </div>

          {/* Skills */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.length === 0 ? (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              ) : (
                currentUser.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium">{skill}</span>
                ))
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-3">Wallet Balance</h2>
            <div className="text-3xl font-bold text-emerald-600">৳{currentUser.balance.toLocaleString()}</div>
            <button onClick={() => setPage('payments')} className="mt-3 text-sm text-emerald-600 font-medium hover:underline">
              View Payment History →
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Gigs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">My Gigs ({myGigs.length})</h2>
              <button onClick={() => setPage('create-gig')} className="text-sm text-emerald-600 font-medium hover:underline">+ Create New</button>
            </div>
            {myGigs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No gigs yet. Start offering your services!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myGigs.map(gig => (
                  <div
                    key={gig.id}
                    onClick={() => setSelectedGig(gig.id)}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                  >
                    <img src={gig.image} alt="" className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{gig.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-gray-600">{gig.rating} ({gig.reviewCount})</span>
                        </div>
                        <span className="font-bold text-sm text-gray-900">৳{gig.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Reviews ({myReviews.length})</h2>
            {myReviews.length === 0 ? (
              <p className="text-gray-400 text-sm">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {myReviews.map(review => {
                  const reviewer = getUserById(review.reviewerId);
                  return (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                          {reviewer?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{reviewer?.name}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                            ))}
                            <span className="text-xs text-gray-400 ml-1">{review.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
