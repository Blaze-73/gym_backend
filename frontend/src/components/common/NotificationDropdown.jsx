import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck, Dumbbell, ShoppingBag, Users, AlertCircle, Info } from 'lucide-react';

/* ─── Context ─── */
const NotificationContext = createContext(null);

const INITIAL = [
  { id: 1, type: 'workout',  title: 'Workout Reminder',         body: "Don't forget today's session — Chest & Triceps at 18:00.", read: false, time: '2m ago'   },
  { id: 2, type: 'info',     title: 'Membership Active',        body: 'Your Elite membership is active. Enjoy full access.',      read: false, time: '1h ago'   },
  { id: 3, type: 'order',    title: 'Order Shipped',            body: 'Your order #AL-2047 has been dispatched.',                 read: true,  time: '3h ago'   },
  { id: 4, type: 'alert',    title: 'Membership Expiring Soon', body: 'Your plan expires in 7 days. Renew to keep access.',       read: true,  time: '1d ago'   },
];

const ADMIN_INITIAL = [
  { id: 1, type: 'user',    title: 'New Member Joined',    body: 'Alex Johnson just registered as a new client.',        read: false, time: '5m ago'  },
  { id: 2, type: 'order',   title: 'New Order Received',   body: 'Order #AL-2049 placed for $129.00.',                   read: false, time: '22m ago' },
  { id: 3, type: 'alert',   title: '3 Memberships Expiring', body: '3 members expire within 48h. Consider reaching out.', read: true,  time: '2h ago'  },
  { id: 4, type: 'info',    title: 'System Update',        body: 'Scheduled maintenance tonight 02:00–03:00.',           read: true,  time: '5h ago'  },
];

export const NotificationProvider = ({ children, isAdmin = false }) => {
  const [notifications, setNotifications] = useState(isAdmin ? ADMIN_INITIAL : INITIAL);

  const markRead = (id) =>
    setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const markAllRead = () =>
    setNotifications(n => n.map(x => ({ ...x, read: true })));

  const dismiss = (id) =>
    setNotifications(n => n.filter(x => x.id !== id));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, markRead, markAllRead, dismiss, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be inside NotificationProvider');
  return ctx;
};

/* ─── Icon per type ─── */
const TypeIcon = ({ type }) => {
  const map = {
    workout: { icon: Dumbbell,      bg: 'bg-primary-fixed/15', color: 'text-primary-fixed' },
    order:   { icon: ShoppingBag,   bg: 'bg-blue-500/15',      color: 'text-blue-400'      },
    user:    { icon: Users,         bg: 'bg-purple-500/15',    color: 'text-purple-400'    },
    alert:   { icon: AlertCircle,   bg: 'bg-error/15',         color: 'text-error'         },
    info:    { icon: Info,          bg: 'bg-gray-500/15',      color: 'text-gray-400'      },
  };
  const { icon: Icon, bg, color } = map[type] || map.info;
  return (
    <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
  );
};

/* ─── Bell button + dropdown ─── */
const NotificationBell = ({ className = '' }) => {
  const { notifications, markRead, markAllRead, dismiss, unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors touch-manipulation"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                         bg-primary-fixed text-black text-[10px] font-black rounded-full
                         flex items-center justify-center leading-none"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 w-[340px] max-w-[90vw]
                       bg-[#161616] border border-white/10 rounded-2xl shadow-2xl z-[90]
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-headline font-black uppercase tracking-wider text-white text-sm">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-xs text-primary-fixed
                             hover:text-white transition-colors font-headline font-bold uppercase"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-white/5">
              {notifications.length === 0 ? (
                <div className="py-10 text-center text-gray-600 text-sm font-headline uppercase">
                  All caught up!
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => markRead(n.id)}
                    className={`flex items-start gap-3 px-5 py-4 cursor-pointer
                                transition-colors hover:bg-white/[0.03]
                                ${!n.read ? 'bg-white/[0.02]' : ''}`}
                  >
                    <TypeIcon type={n.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-headline font-bold leading-tight
                                       ${n.read ? 'text-gray-300' : 'text-white'}`}>
                          {n.title}
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                          className="text-gray-700 hover:text-gray-400 transition-colors flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-gray-700 mt-1.5 font-headline uppercase">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-primary-fixed flex-shrink-0 mt-1.5
                                       shadow-[0_0_6px_#daf900]" />
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/5 text-center">
              <p className="text-xs text-gray-700 font-headline uppercase">
                {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { NotificationBell };
export default NotificationProvider;