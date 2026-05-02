import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '@/services/api';
import { Upload, X, Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    status: 'active',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
      };

      await productsAPI.create(submitData);
      setMessage({ type: 'success', text: 'Product created successfully!' });
      
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to create product' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black font-headline text-white uppercase italic">
            ADD <span className="text-primary-fixed">PRODUCT</span>
          </h1>
          <p className="text-gray-400 mt-1">Create new inventory item with complete specifications.</p>
        </div>
        <button
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded border ${
          message.type === 'success' 
            ? 'bg-primary-fixed/10 border-primary-fixed/20 text-primary-fixed' 
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-fixed font-bold text-sm">01</span>
              </div>
              <h3 className="text-lg font-headline font-bold text-white">BASIC INFORMATION</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  PRODUCT NAME *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. XENON PRE-WORKOUT"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  CATEGORY *
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  DESCRIPTION
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description and specifications..."
                  rows={4}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing */}
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-fixed font-bold text-sm">02</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">PRICING</h3>
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  PRICE (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-fixed font-bold text-sm">03</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">INVENTORY</h3>
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  STOCK QUANTITY *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="100"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-fixed font-bold text-sm">04</span>
              </div>
              <h3 className="text-lg font-headline font-bold text-white">STATUS</h3>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 accent-primary-fixed"
                />
                <span className="text-sm font-headline text-white">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 accent-primary-fixed"
                />
                <span className="text-sm font-headline text-white">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
