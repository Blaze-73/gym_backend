import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Eye } from 'lucide-react';
import { productsAPI, categoriesAPI } from '@/services/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from '@/components/common/CartDrawer';

// ✅ Fixed: Removed the hardcoded internal navbar.
// Store lives inside PublicLayout which already renders UnifiedNavbar.
// The old duplicate navbar caused a double-nav on every screen size.

const Store = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStock = product.stock > 0;
    return matchesCategory && matchesSearch && matchesStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login before they can add items to the cart.
      navigate('/login');
      return;
    }
    addToCart(product);
    setIsCartOpen(true);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-fixed" />
      </div>
    );
  }

  return (
    /* pt-16 offsets the fixed UnifiedNavbar (h-16) */
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Page sub-header: title + search bar only */}
      <div className="bg-surface-container-high border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-headline">
                <span className="text-white">GEAR </span>
                <span className="text-primary-fixed">STORE</span>
              </h1>
              <p className="text-gray-400 mt-1 text-sm">
                Elevate your performance with pro-grade equipment.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64 bg-surface-container-highest border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile category pills */}
        <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
          {[{ id: 'all', name: 'All' }, ...categories].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-headline font-bold uppercase transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-surface-container-high text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Desktop category sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-xs font-headline font-bold uppercase tracking-wider mb-4 text-primary-fixed">
                Categories
              </h3>
              <ul className="space-y-1">
                {[{ id: 'all', name: 'All Products', count: products.length }, ...categories.map((c) => ({ ...c, count: products.filter((p) => p.category_id === c.id).length }))].map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                      className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary-fixed/10 text-primary-fixed'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{cat.name}</span>
                        <span className="text-xs text-gray-500">{cat.count}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products grid */}
          <main className="flex-1 min-w-0">
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map((product, index) => (
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
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
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
                    <div className="p-3 sm:p-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                        {getCategoryName(product.category_id)}
                      </p>
                      <h3 className="font-headline font-bold text-sm mb-2 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-black font-headline text-primary-fixed">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                          className="p-2 bg-primary-fixed/10 text-primary-fixed rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                      {product.stock <= 0 && (
                        <p className="text-xs text-error mt-1">Out of Stock</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-headline">No products found</p>
                <p className="text-gray-600 text-sm mt-1">
                  Try a different category or search term
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm disabled:opacity-50 hover:border-primary-fixed/50 transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-headline font-bold text-sm transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-high text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm disabled:opacity-50 hover:border-primary-fixed/50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      {/* Cart drawer attached to the page */}
      <CartDrawer />
    </div>
  );
};

export default Store;