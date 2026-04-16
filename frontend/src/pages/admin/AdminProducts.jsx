import { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '@/services/api';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black font-headline text-white uppercase italic">
            Product Management
          </h2>
          <p className="text-on-surface-variant mt-1">Manage gym products and inventory</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </header>

      {/* Products Table */}
      <div className="bg-surface-container-low border border-white/5 overflow-hidden">
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.02]">
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
                  {categories.find(c => c.id === product.category_id)?.name || 'N/A'}
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
                    <button className="p-2 hover:bg-surface-container-highest rounded text-on-surface-variant">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-error/10 rounded text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
