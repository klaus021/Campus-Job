import { Briefcase, DollarSign, Star, TrendingUp, Package, FileText, Plus } from 'lucide-react';
import { useStore } from '../store';

export function DashboardPage() {
  const { currentUser, gigs, jobs, orders, setPage, setSelectedGig, setSelectedJob } = useStore();

  if (!currentUser) return null;

  const myGigs = gigs.filter(g => g.sellerId === currentUser.id);
  const myJobs = jobs.filter(j => j.clientId === currentUser.id);
  const mySellingOrders = orders.filter(o => o.sellerId === currentUser.id);
  const myBuyingOrders = orders.filter(o => o.buyerId === currentUser.id);
  const activeOrders = [...mySellingOrders, ...myBuyingOrders].filter(o => o.status === 'active' || o.status === 'delivered');
  const totalEarnings = mySellingOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);
  const totalSpent = myBuyingOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {currentUser.name}!</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPage('create-gig')} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Plus className="w-4 h-4" /> New Gig
          </button>
          <button onClick={() => setPage('create-job')} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
            <Plus className="w-4 h-4" /> New Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <DollarSign className="w-5 h-5" />, label: 'Total Earnings', value: `৳${totalEarnings.toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: <TrendingUp className="w-5 h-5" />, label: 'Total Spent', value: `৳${totalSpent.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: <Package className="w-5 h-5" />, label: 'Active Orders', value: activeOrders.length.toString(), color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: <Star className="w-5 h-5" />, label: 'Rating', value: currentUser.rating > 0 ? currentUser.rating.toString() : 'N/A', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Gigs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Gigs ({myGigs.length})</h2>
            <button onClick={() => setPage('create-gig')} className="text-sm text-emerald-600 font-medium hover:underline">+ Add New</button>
          </div>
          {myGigs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">You haven't created any gigs yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myGigs.map(gig => (
                <div
                  key={gig.id}
                  onClick={() => setSelectedGig(gig.id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                >
                  <img src={gig.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{gig.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{gig.rating}</span>
                      <span>•</span>
                      <span>{gig.orders} orders</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">৳{gig.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Jobs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">My Jobs ({myJobs.length})</h2>
            <button onClick={() => setPage('create-job')} className="text-sm text-emerald-600 font-medium hover:underline">+ Add New</button>
          </div>
          {myJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">You haven't posted any jobs yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job.id)}
                  className="p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 text-sm truncate flex-1 mr-2">{job.title}</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex-shrink-0 ${
                      job.status === 'open' ? 'bg-green-100 text-green-700' :
                      job.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>{job.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>৳{job.budget.toLocaleString()}</span>
                    <span>•</span>
                    <span>{job.applicants.length} proposals</span>
                    <span>•</span>
                    <span>{job.department}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button onClick={() => setPage('orders')} className="text-sm text-emerald-600 font-medium hover:underline">View All</button>
          </div>
          {[...mySellingOrders, ...myBuyingOrders].length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[...mySellingOrders, ...myBuyingOrders].slice(0, 5).map(order => {
                    const gig = order.gigId ? gigs.find(g => g.id === order.gigId) : null;
                    const job = order.jobId ? jobs.find(j => j.id === order.jobId) : null;
                    const isSeller = order.sellerId === currentUser.id;
                    return (
                      <tr key={order.id} className="border-b border-gray-50">
                        <td className="py-3 font-medium text-gray-900 max-w-xs truncate">
                          {gig?.title || job?.title || `Order #${order.id}`}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            isSeller ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isSeller ? 'Seller' : 'Buyer'}
                          </span>
                        </td>
                        <td className="py-3 font-medium">৳{order.amount.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            order.status === 'active' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'delivered' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>{order.status}</span>
                        </td>
                        <td className="py-3 text-gray-500">{order.createdAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
