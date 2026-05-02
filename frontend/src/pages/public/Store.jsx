import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Heart, SlidersHorizontal, X, Eye } from 'lucide-react';
import { productsAPI, categoriesAPI } from '@/services/api';
import { useCart } from '@/components/products/Cart';
import { useAuth } from '@/contexts/AuthContext';

const Store = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 16;

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
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = product.stock > 0;
    return matchesCategory && matchesSearch && matchesStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-surface-container-high border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black font-headline text-white tracking-widest">ALIEN</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/plans" className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider">Plans</Link>
              <Link to="/#gym" className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider">Visual</Link>
              <Link to="/store" className="text-sm font-headline text-primary-fixed transition-colors uppercase tracking-wider">Store</Link>
              {isAuthenticated ? (
                isAdmin() ? (
                  <Link to="/admin" className="text-sm font-headline text-primary-fixed transition-colors uppercase tracking-wider">Admin</Link>
                ) : (
                  <Link to="/profile" className="text-sm font-headline text-primary-fixed transition-colors uppercase tracking-wider">Profile</Link>
                )
              ) : (
                <Link to="/login" className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider">Login</Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              {isAuthenticated ? (
                <Link to="/profile" className="px-5 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform">
                  Profile
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-headline hover:bg-white/10 transition-colors">Login</Link>
                  <Link to="/register" className="px-5 py-2 bg-primary-fixed text-on-primary-fixed rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform">Sign In</Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black font-headline">
                <span className="text-white">GEAR </span>
                <span className="text-primary-fixed">STORE</span>
              </h1>
              <p className="text-gray-400 mt-1">Elevate your performance with pro-grade equipment.</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-surface-container-high border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-fixed/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`hidden lg:block w-64 flex-shrink-0 ${showFilters ? 'block' : ''}`}>
            <div className="sticky top-28 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-headline font-bold uppercase tracking-wider mb-4 text-primary-fixed">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-primary-fixed/10 text-primary-fixed'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>All Products</span>
                        <span className="text-xs text-gray-500">{products.length}</span>
                      </div>
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-primary-fixed/10 text-primary-fixed'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-500">
                            {products.filter(p => p.category_id === cat.id).length}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group bg-surface-container-high border border-white/5 rounded-xl overflow-hidden hover:border-primary-fixed/30 transition-all"
                  >
                    <div className="relative aspect-square overflow-hidden bg-surface-container-highest">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                      <Link
                        to={`/products/${product.id}`}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-8 h-8 text-white" />
                      </Link>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                        {getCategoryName(product.category_id)}
                      </p>
                      <h3 className="font-headline font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black font-headline text-primary-fixed">${product.price}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                          className="p-2 bg-primary-fixed/10 text-primary-fixed rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                      {product.stock <= 0 && (
                        <p className="text-xs text-error mt-2">Out of Stock</p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No products found</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-surface-container-high border border-white/10 rounded-lg disabled:opacity-50 hover:border-primary-fixed/50 transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-headline font-bold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-high text-gray-400 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-surface-container-high border border-white/10 rounded-lg disabled:opacity-50 hover:border-primary-fixed/50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Store;
