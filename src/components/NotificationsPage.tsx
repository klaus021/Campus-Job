import { Bell, MessageSquare, Star, Package, FileText, DollarSign, CheckCheck } from 'lucide-react';
import { useStore } from '../store';

const typeIcons = {
  order: <Package className="w-5 h-5 text-blue-600" />,
  message: <MessageSquare className="w-5 h-5 text-emerald-600" />,
  review: <Star className="w-5 h-5 text-amber-500" />,
  application: <FileText className="w-5 h-5 text-purple-600" />,
  payment: <DollarSign className="w-5 h-5 text-green-600" />,
};

const typeBg = {
  order: 'bg-blue-50',
  message: 'bg-emerald-50',
  review: 'bg-amber-50',
  application: 'bg-purple-50',
  payment: 'bg-green-50',
};

export function NotificationsPage() {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useStore();

  if (!currentUser) return null;

  const myNotifs = notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadCount = myNotifs.filter(n => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">{unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {myNotifs.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications yet</h3>
          <p className="text-gray-500 text-sm">You'll see notifications here when something happens.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {myNotifs.map(notif => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                notif.read ? 'bg-white hover:bg-gray-50' : 'bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              <div className={`w-10 h-10 ${typeBg[notif.type]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {typeIcons[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{notif.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notif.timestamp).toLocaleString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
