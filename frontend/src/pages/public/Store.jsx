import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Eye } from 'lucide-react';
import { productsAPI, categoriesAPI } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartDrawer from '@/components/common/CartDrawer';

const Store = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 12;

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      // FIX: Handle Laravel pagination wrappers
      setProducts(productsRes.data.data || productsRes.data);
      setCategories(categoriesRes.data.categories || categoriesRes.data);
    } catch (error) {
      console.error('Failed to fetch store data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product);
    setIsCartOpen(true);
  };

  // REAL FILTERING LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category_id?.toString() === selectedCategory.toString();
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed" /></div>;

  return (
    <>
      <CartDrawer />
      <div className="min-h-screen bg-black text-white pt-16">
        <div className="bg-surface-container-high border-b border-white/5">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-black font-headline">GEAR <span className="text-primary-fixed">STORE</span></h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search gear..." value={searchQuery} onChange={e => {setSearchQuery(e.target.value); setCurrentPage(1);}} className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-primary-fixed outline-none" />
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
          {/* LEFT SIDEBAR FILTER */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Categories</h3>
                <div className="space-y-2">
                  <button onClick={() => {setSelectedCategory('all'); setCurrentPage(1);}} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'all' ? 'bg-primary-fixed text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                    All Gear
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => {setSelectedCategory(cat.id); setCurrentPage(1);}} className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.id ? 'bg-primary-fixed text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <motion.div key={product.id} className="bg-surface-container-high border border-white/5 rounded-2xl overflow-hidden group">
                  <div className="relative aspect-square bg-white/5 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Link to={`/store/${product.id}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-primary-fixed font-bold uppercase tracking-tighter">{product.category?.name || 'General'}</span>
                    <h3 className="font-bold text-white truncate mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-white">${product.price}</span>
                      <button onClick={() => handleAddToCart(product)} disabled={product.stock <= 0} className="p-2 bg-primary-fixed text-black rounded-lg hover:scale-110 transition-transform disabled:opacity-50">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Store;
