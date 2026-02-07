import { DollarSign, ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { useStore } from '../store';

export function PaymentsPage() {
  const { currentUser, transactions, getUserById } = useStore();

  if (!currentUser) return null;

  const myTransactions = transactions
    .filter(t => t.fromId === currentUser.id || t.toId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalEarned = myTransactions
    .filter(t => t.toId === currentUser.id && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = myTransactions
    .filter(t => t.fromId === currentUser.id && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = myTransactions
    .filter(t => t.toId === currentUser.id && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
      <p className="text-gray-500 mb-8">Track your earnings and spending</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">৳{currentUser.balance.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Available Balance</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-3">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">৳{totalEarned.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Earned</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-3">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">৳{totalSpent.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-gray-900">৳{pendingAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h2>
        {myTransactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No transactions yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myTransactions.map(tx => {
              const isIncoming = tx.toId === currentUser.id;
              const otherUser = getUserById(isIncoming ? tx.fromId : tx.toId);
              return (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isIncoming ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {isIncoming ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{tx.description}</p>
                      <p className="text-xs text-gray-500">
                        {isIncoming ? 'From' : 'To'}: {otherUser?.name} • {tx.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isIncoming ? 'text-green-600' : 'text-red-600'}`}>
                      {isIncoming ? '+' : '-'}৳{tx.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' :
                      tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>{tx.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
