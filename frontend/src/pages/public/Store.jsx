import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, Zap, Sparkles, ArrowRight 
} from 'lucide-react';

// ✅ FIXED IMPORTS: Matching your project structure (src/services/api.js)
import { productsAPI, categoriesAPI } from '@/services/api'; 
import { useAuth } from '@/contexts/AuthContext'; 
import { useCart } from '@/contexts/CartContext'; 
import CartDrawer from '@/components/common/CartDrawer';

// ✅ FIXED NAMING: Components MUST start with a Capital Letter
const Store = () => {
  const navigate = useNavigate();
  
  // --- AUTH & CART HOOKS ---
  const { isAuthenticated } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      
      // Laravel pagination puts data inside .data.data
      const productsData = productsRes.data.data || productsRes.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
      
      const catsData = categoriesRes.data.categories || categoriesRes.data || [];
      setCategories(Array.isArray(catsData) ? catsData : []);
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

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || 
                           product.category_id?.toString() === selectedCategory.toString();
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedProducts = filteredProducts.slice(0, visibleCount);

  // --- SKELETON COMPONENT ---
  const ProductSkeleton = () => (
    <div className="bg-surface-container-high rounded-3xl p-4 animate-pulse border border-white/5">
      <div className="aspect-square bg-white/5 rounded-2xl mb-4" />
      <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
      <div className="h-4 bg-white/5 rounded w-1/2" />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <>
      <CartDrawer />
      <div className="min-h-screen bg-black text-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/20 via-black to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80" 
            className="absolute inset-0 w-full h-full object-cover opacity-40" 
            alt="Store Hero" 
          />
          <div className="relative z-20 text-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              <Sparkles className="w-3 h-3" />
              Elite Performance Gear
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black font-headline text-white uppercase italic leading-none tracking-tighter"
            >
              EQUIP YOUR <br /> <span className="text-primary-fixed">EVOLUTION</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-gray-400 mt-6 max-w-xl mx-auto text-lg font-light leading-relaxed"
            >
              Precision-engineered supplements and gear designed for those who refuse to settle for average.
            </motion.p>
          </div>
        </section>

        {/* --- CONTROL CENTER --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Category Sidebar */}
            <aside className="w-full lg:w-64 space-y-6 sticky top-24">
              <div className="bg-surface-container-high border border-white/5 rounded-3xl p-6 backdrop-blur-md">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary-fixed" /> Categories
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => {setSelectedCategory('all'); setVisibleCount(12);}} 
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all ${selectedCategory === 'all' ? 'bg-primary-fixed text-black font-bold shadow-lg shadow-primary-fixed/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    All Inventory
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => {setSelectedCategory(cat.id); setVisibleCount(12);}} 
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all ${selectedCategory === cat.id ? 'bg-primary-fixed text-black font-bold shadow-lg shadow-primary-fixed/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right: Product Stream */}
            <main className="flex-1 w-full space-y-8">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-fixed transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH ELITE GEAR..." 
                  value={searchQuery} 
                  onChange={e => {setSearchQuery(e.target.value); setVisibleCount(12);}} 
                  className="w-full bg-surface-container-high border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm uppercase font-headline tracking-widest focus:outline-none focus:border-primary-fixed/50 transition-all placeholder:text-gray-600" 
                />
              </div>

              {/* BENTO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product, index) => {
                  const isFeatured = index % 4 === 0;
                  
                  return (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group relative rounded-3xl overflow-hidden border border-white/5 bg-surface-container-high transition-all hover:border-primary-fixed/40 ${isFeatured ? 'sm:col-span-2 lg:col-span-2 h-[450px]' : 'h-[380px]'}`}
                    >
                      <div className="h-full w-full relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          loading="lazy" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                          <div className="flex justify-between items-end">
                            <div className="max-w-[70%]">
                              <span className="text-primary-fixed text-[10px] font-black uppercase tracking-widest">
                                {product.category?.name || 'General'}
                              </span>
                              <h3 className="text-2xl font-black font-headline text-white uppercase italic leading-none">
                                {product.name}
                              </h3>
                            </div>
                            <span className="text-2xl font-black font-headline text-white">${product.price}</span>
                          </div>
                          
                          <div className="flex gap-3">
                            <Link 
                              to={`/store/${product.id}`} 
                              className="flex-1 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                            >
                              Details
                            </Link>
                            <button 
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock <= 0}
                              className="px-6 py-3 bg-primary-fixed text-black rounded-xl hover:scale-105 transition-transform disabled:opacity-30"
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* LOAD MORE */}
              {filteredProducts.length > visibleCount && (
                <div className="flex justify-center pt-12">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="group flex items-center gap-3 px-12 py-4 bg-surface-container-high border border-white/10 rounded-full text-sm font-black uppercase tracking-widest hover:border-primary-fixed transition-all"
                  >
                    Load More Inventory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
