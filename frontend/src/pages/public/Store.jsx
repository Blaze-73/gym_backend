import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Filter, ShoppingCart, Star, ArrowLeft, ChevronLeft, 
  ChevronRight, Heart, SlidersHorizontal, X
} from 'lucide-react';
import { useCart } from '@/components/products/Cart';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Mock data matching the screenshot
      setProducts([
        { id: 1, name: 'ALIEN WHEY ISOLATE - 2KG', category: 'Supplements', price: 59.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80', badge: 'BEST SELLER' },
        { id: 2, name: 'SOFT RUBBER DUMBBELLS 10KG', category: 'Equipment', price: 120.00, image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&q=80' },
        { id: 3, name: 'PERFORMANCE TECH HOODIE', category: 'Apparel', price: 45.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
        { id: 4, name: 'GRAVITY MAX TRAINING SHOES', category: 'Apparel', price: 129.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
        { id: 5, name: 'ALIEN PRE-WORKOUT V2', category: 'Supplements', price: 34.99, image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&q=80' },
        { id: 6, name: 'HEAVY DUTY GYM DUFFEL', category: 'Accessories', price: 65.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
        { id: 7, name: 'ALIEN PULSE TRACKER PRO', category: 'Tech', price: 199.99, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80' },
        { id: 8, name: 'PRO-GRIP YOGA MAT', category: 'Equipment', price: 40.00, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80' },
        { id: 9, name: 'MICRONIZED CREATINE', category: 'Supplements', price: 24.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&q=80', badge: 'POPULAR' },
        { id: 10, name: 'ELITE POWER RACK', category: 'Equipment', price: 499.00, image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=80' },
        { id: 11, name: 'BUMPER PLATE SET 100KG', category: 'Equipment', price: 299.00, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80' },
        { id: 12, name: 'COTTON GYM JOGGERS', category: 'Apparel', price: 38.00, image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&q=80' },
        { id: 13, name: 'LEAK-PROOF SHAKER 700ML', category: 'Accessories', price: 12.00, image: 'https://images.unsplash.com/photo-1616683896063-0dbfc5e67e89?w=400&q=80' },
        { id: 14, name: 'ADJUSTABLE WEIGHT BENCH', category: 'Equipment', price: 185.00, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80' },
        { id: 15, name: 'VORTEX RUNNING SHOES', category: 'Apparel', price: 115.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
        { id: 16, name: 'COTTON LIFTING STRAPS', category: 'Accessories', price: 15.00, image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80' },
        { id: 17, name: 'CAST IRON KETTLEBELL 20KG', category: 'Equipment', price: 75.00, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80' },
      ]);

      setCategories([
        { id: 'all', name: 'All Products', count: 156 },
        { id: 'supplements', name: 'Supplements', count: 42 },
        { id: 'equipment', name: 'Equipment', count: 38 },
        { id: 'apparel', name: 'Apparel', count: 45 },
        { id: 'accessories', name: 'Accessories', count: 31 },
      ]);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const productsPerPage = 16;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

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
              <Link to="/login" className="text-sm font-headline text-gray-400 hover:text-primary-fixed transition-colors uppercase tracking-wider">Membership</Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-fixed text-on-primary-fixed text-xs rounded-full flex items-center justify-center">0</span>
              </button>
              <Link to="/login" className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-headline hover:bg-white/10 transition-colors">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-white text-black rounded-full text-sm font-headline font-bold hover:scale-105 transition-transform">Sign In</Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black font-headline">
                <span className="text-white">GEAR </span>
                <span className="text-primary-fixed">STORE</span>
              </h1>
              <p className="text-gray-400 mt-1">Elevate your performance with pro-grade equipment and supplements.</p>
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
          {/* Sidebar - Desktop */}
          <aside className={`hidden lg:block w-64 flex-shrink-0 ${showFilters ? 'block' : ''}`}>
            <div className="sticky top-28 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-headline font-bold uppercase tracking-wider mb-4 text-primary-fixed">Categories</h3>
                <ul className="space-y-2">
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
                          <span className="text-xs text-gray-500">{cat.count}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-headline font-bold uppercase tracking-wider mb-4 text-primary-fixed">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary-fixed"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Filter by Brand */}
              <div>
                <h3 className="text-sm font-headline font-bold uppercase tracking-wider mb-4 text-primary-fixed">Filter by Brand</h3>
                <ul className="space-y-2">
                  {['Alien Performance', 'Core Nutrition', 'The Gear'].map((brand) => (
                    <li key={brand}>
                      <label className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded bg-surface-container-high border-white/10 accent-primary-fixed" />
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
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
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                        {product.badge}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 z-10 p-2 bg-black/50 backdrop-blur rounded-full text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-headline font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black font-headline text-primary-fixed">${product.price}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 bg-primary-fixed/10 text-primary-fixed rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-surface-container-high border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-fixed/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
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
                  className="p-2 bg-surface-container-high border border-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary-fixed/50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
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
