import { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '@/services/api';
import { Plus, Edit, Trash2, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);
    } catch (error) {
      console.error('Failed to fetch:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      alert('Failed to delete product: ' + (error.response?.data?.message || error.message));
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black font-headline text-white uppercase italic">
            PRODUCT <span className="text-primary-fixed">MANAGEMENT</span>
          </h2>
          <p className="text-on-surface-variant mt-1">Manage gym products and inventory</p>
        </div>
        <Link to="/admin/products/add">
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface-container-high border border-white/10 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
        />
      </div>

      {/* Products Table */}
      <div className="bg-surface-container-low border border-white/5 overflow-hidden rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-container-highest/30">
              <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Product</th>
              <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Category</th>
              <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Price</th>
              <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Stock</th>
              <th className="px-6 py-4 text-left text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-headline uppercase tracking-[0.2em] text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-highest rounded overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">No img</div>
                        )}
                      </div>
                      <span className="font-headline text-on-surface">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {getCategoryName(product.category_id)}
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-fixed font-bold">${product.price}</td>
                  <td className="px-6 py-4 text-sm text-on-surface">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                      product.status === 'active' 
                        ? 'bg-primary-fixed/10 text-primary-fixed' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <button className="p-2 hover:bg-surface-container-highest rounded text-on-surface-variant">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => setDeleteConfirm(product)}
                        className="p-2 hover:bg-error/10 rounded text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No products found</p>
                  <Link to="/admin/products/add" className="text-primary-fixed hover:underline mt-2 inline-block">
                    Add your first product
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-headline font-bold text-white mb-4">Delete Product?</h3>
            <p className="text-on-surface-variant mb-6">
              Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-surface-container-highest text-white font-headline font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 px-4 py-3 bg-error text-white font-headline font-bold text-sm uppercase tracking-wider rounded hover:bg-error/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
