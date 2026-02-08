import { Package, Star } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';

export function OrdersPage() {
  const { currentUser, orders, gigs, jobs, getUserById, updateOrderStatus, addReview } = useStore();
  const [reviewModal, setReviewModal] = useState<{ orderId: string; revieweeId: string; gigId?: string } | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [tab, setTab] = useState<'buying' | 'selling'>('buying');

  if (!currentUser) return null;

  const buyingOrders = orders.filter(o => o.buyerId === currentUser.id);
  const sellingOrders = orders.filter(o => o.sellerId === currentUser.id);
  const displayOrders = tab === 'buying' ? buyingOrders : sellingOrders;

  const handleReview = async () => {
    if (!reviewModal || !reviewComment.trim()) return;
    await addReview(reviewModal.orderId, reviewModal.revieweeId, reviewModal.gigId, reviewRating, reviewComment);
    setReviewModal(null);
    setReviewRating(5);
    setReviewComment('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
      <p className="text-gray-500 mb-6">Manage your buying and selling orders</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        <button
          onClick={() => setTab('buying')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'buying' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Buying ({buyingOrders.length})
        </button>
        <button
          onClick={() => setTab('selling')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'selling' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Selling ({sellingOrders.length})
        </button>
      </div>

      {displayOrders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders yet</h3>
          <p className="text-gray-500 text-sm">
            {tab === 'buying' ? 'Start by ordering a gig!' : 'Orders will appear here when someone orders your gig.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayOrders.map(order => {
            const gig = order.gigId ? gigs.find(g => g.id === order.gigId) : null;
            const job = order.jobId ? jobs.find(j => j.id === order.jobId) : null;
            const otherUser = getUserById(tab === 'buying' ? order.sellerId : order.buyerId);

            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {gig && <img src={gig.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
                    <div>
                      <h3 className="font-semibold text-gray-900">{gig?.title || job?.title || `Order #${order.id}`}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-semibold">
                          {otherUser?.name.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {tab === 'buying' ? 'Seller' : 'Buyer'}: {otherUser?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span>৳{order.amount.toLocaleString()}</span>
                        <span>•</span>
                        <span>Due: {order.deliveryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'active' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'delivered' ? 'bg-amber-100 text-amber-700' :
                      order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {tab === 'selling' && order.status === 'active' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {tab === 'buying' && order.status === 'delivered' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                        >
                          Accept & Complete
                        </button>
                      )}
                      {tab === 'buying' && order.status === 'completed' && (
                        <button
                          onClick={() => setReviewModal({ orderId: order.id, revieweeId: order.sellerId, gigId: order.gigId })}
                          className="px-4 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Star className="w-3 h-3" /> Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => setReviewRating(star)}>
                    <Star className={`w-8 h-8 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Share your experience..."
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleReview} className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700">
                Submit Review
              </button>
              <button onClick={() => setReviewModal(null)} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
