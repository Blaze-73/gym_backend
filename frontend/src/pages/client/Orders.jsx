import { useState, useEffect } from 'react';
import { ordersAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import Modal from '@/components/common/Modal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusIcons = {
    pending: Clock,
    processing: Package,
    completed: CheckCircle,
    cancelled: XCircle,
  };

  const statusColors = {
    pending: 'text-tertiary-container',
    processing: 'text-primary-fixed',
    completed: 'text-secondary',
    cancelled: 'text-error',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-black font-headline text-white uppercase italic">
          My Orders
        </h2>
        <p className="text-on-surface-variant mt-1">Track your purchase history</p>
      </header>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-high border border-white/5 p-12 text-center"
        >
          <Package className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
          <h3 className="text-xl font-headline font-bold text-on-surface mb-2">No orders yet</h3>
          <p className="text-on-surface-variant mb-6">Start shopping to see your orders here</p>
          <a
            href="/store"
            className="inline-block px-6 py-3 btn-primary"
          >
            Browse Store
          </a>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order, index) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface-container-high border border-white/5 p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusColors[order.status]}/10`}>
                      <StatusIcon className={`w-6 h-6 ${statusColors[order.status]}`} />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface">Order #{order.id}</p>
                      <p className="text-on-surface-variant text-sm">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-on-surface-variant text-xs uppercase tracking-wider">Total</p>
                      <p className="text-xl font-black font-headline text-primary-fixed">${order.total?.toFixed(2)}</p>
                    </div>
                    <span className={`px-4 py-2 text-[10px] font-bold rounded-full uppercase ${
                      order.status === 'pending' ? 'bg-tertiary-container/10 text-tertiary-container' :
                      order.status === 'processing' ? 'bg-primary-fixed/10 text-primary-fixed' :
                      order.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                      'bg-error/10 text-error'
                    }`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="p-2 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-white"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedOrder(null);
        }}
        title={`Order #${selectedOrder?.id}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-on-surface font-headline">{formatDate(selectedOrder.created_at)}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Status</p>
                <p className="text-on-surface font-headline capitalize">{selectedOrder.status}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-3">Items</p>
              <div className="space-y-2">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/5">
                    <div>
                      <p className="text-on-surface font-headline">{item.product?.name}</p>
                      <p className="text-on-surface-variant text-sm">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <p className="text-primary-fixed font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <p className="text-on-surface-variant">Total</p>
              <p className="text-2xl font-black font-headline text-primary-fixed">${selectedOrder.total?.toFixed(2)}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
