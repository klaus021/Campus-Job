import { Star, Clock, RefreshCcw, ArrowLeft, MessageSquare, Heart, Share2, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export function GigDetailPage() {
  const { selectedGigId, getGigById, getUserById, setSelectedGig, currentUser, placeOrder, setPage, setSelectedChatUser, reviews } = useStore();

  const gig = selectedGigId ? getGigById(selectedGigId) : null;
  if (!gig) return <div className="text-center py-20 text-gray-500">Gig not found</div>;

  const seller = getUserById(gig.sellerId);
  const gigReviews = reviews.filter(r => r.gigId === gig.id);

  const handleOrder = async () => {
    if (!currentUser) {
      setPage('login');
      return;
    }
    if (currentUser.id === gig.sellerId) {
      alert('You cannot order your own gig!');
      return;
    }
    await placeOrder(gig.id);
  };

  const handleMessage = () => {
    if (!currentUser) {
      setPage('login');
      return;
    }
    setSelectedChatUser(gig.sellerId);
    setPage('messages');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => setSelectedGig(null)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Gigs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">{gig.department}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                  {seller?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{seller?.name}</p>
                  <p className="text-sm text-gray-500">{seller?.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{gig.rating}</span>
                <span className="text-gray-400">({gig.reviewCount} reviews)</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{gig.orders} orders in queue</span>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <img src={gig.image} alt={gig.title} className="w-full h-64 md:h-80 object-cover" />
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Gig</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">{gig.description}</div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Skills & Tags</h3>
            <div className="flex flex-wrap gap-2">
              {gig.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Seller</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {seller?.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{seller?.name}</h3>
                <p className="text-emerald-600 font-medium text-sm mb-2">{seller?.department} • {seller?.university}</p>
                <p className="text-gray-600 text-sm mb-3">{seller?.bio}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-gray-50 rounded-xl p-4">
                  <div>
                    <div className="font-bold text-gray-900">{seller?.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{seller?.reviewCount}</div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{seller?.completedJobs}</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{seller?.joinedDate?.split('-')[0]}</div>
                    <div className="text-xs text-gray-500">Joined</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {seller?.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews ({gigReviews.length})</h2>
            {gigReviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet for this gig.</p>
            ) : (
              <div className="space-y-4">
                {gigReviews.map(review => {
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

        {/* Sidebar - Order Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Standard Package</h3>
                  <span className="text-2xl font-bold text-gray-900">৳{gig.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Full service as described in the gig listing.</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{gig.deliveryDays}-day delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCcw className="w-4 h-4" />
                    <span>3 revisions</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {['Source file delivery', 'Detailed documentation', 'Direct communication'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 space-y-3">
                <button
                  onClick={handleOrder}
                  className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Order Now (৳{gig.price.toLocaleString()})
                </button>
                <button
                  onClick={handleMessage}
                  className="w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Contact Seller
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <button className="flex items-center gap-1 hover:text-gray-600">
                <Heart className="w-4 h-4" /> Save
              </button>
              <button className="flex items-center gap-1 hover:text-gray-600">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
