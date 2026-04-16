import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus, Image as ImageIcon, CheckCircle } from 'lucide-react';

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    stockQuantity: '',
    stockCapacity: '',
    weight: '',
    dimensions: '',
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
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
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-surface-container-high border border-white/10 rounded-lg text-sm font-headline hover:bg-white/5 transition-colors">
            SAVE DRAFT
          </button>
          <button className="px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg text-sm font-headline font-bold hover:scale-105 transition-transform">
            PUBLISH PRODUCT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                />
              </div>

              <div>
                <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                  SKU ID
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g. KNT-S-001"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
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

          {/* Media Gallery */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-fixed font-bold text-sm">02</span>
              </div>
              <h3 className="text-lg font-headline font-bold text-white">MEDIA GALLERY</h3>
              <span className="text-xs text-gray-500 ml-auto">2 / 10 MAX</span>
            </div>

            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-fixed/30 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-sm text-gray-400 mb-2">DRAG & DROP PRODUCT VISUALS</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP MAX 5MB</p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-headline font-bold uppercase rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
                {images.length < 10 && (
                  <label
                    htmlFor="image-upload-2"
                    className="aspect-square rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center hover:border-primary-fixed/30 transition-colors cursor-pointer"
                  >
                    <input type="file" multiple accept="image/*" id="image-upload-2" className="hidden" onChange={handleImageUpload} />
                    <Plus className="w-8 h-8 text-gray-500" />
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Pricing & Inventory */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing */}
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-fixed font-bold text-sm">03</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">PRICING</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    SALE PRICE (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      DISCOUNT
                    </label>
                    <input
                      type="text"
                      placeholder="0%"
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                      TAX RATE
                    </label>
                    <input
                      type="text"
                      placeholder="10%"
                      className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-fixed font-bold text-sm">04</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-white">INVENTORY</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-headline text-gray-500 uppercase tracking-wider">
                    IN STOCK AVAILABILITY
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-fixed"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    STOCK QUANTITY
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    placeholder="1000"
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-headline text-gray-500 uppercase tracking-wider mb-2">
                    WEIGHT / DIMS
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="0.5kg | 15x10x20cm"
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary-fixed/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-surface-container-high border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary-fixed/20 rounded-lg flex items-center justify-center">
                <span className="text-primary-fixed font-bold text-sm">05</span>
              </div>
              <h3 className="text-lg font-headline font-bold text-white">PRODUCT CATEGORIES</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {['SUPPLEMENTS', 'PERFORMANCE', 'GEAR', 'RECOVERY', 'CLOTHING'].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-xs font-headline font-bold uppercase transition-colors ${
                    formData.category === cat.toLowerCase()
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-surface-container-highest text-gray-400 hover:bg-white/5'
                  }`}
                  onClick={() => setFormData({ ...formData, category: cat.toLowerCase() })}
                >
                  {cat}
                </button>
              ))}
              <button className="px-4 py-2 rounded-full text-xs font-headline font-bold uppercase bg-surface-container-highest text-gray-400 hover:bg-white/5 flex items-center gap-2">
                <Plus className="w-3 h-3" />
                CREATE NEW
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-headline font-bold text-white">LIVE PREVIEW</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-surface-container-high border border-white/5 rounded-xl overflow-hidden">
              <div className="aspect-square bg-surface-container-highest relative">
                {images.length > 0 ? (
                  <img
                    src={URL.createObjectURL(images[0])}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <ImageIcon className="w-16 h-16" />
                  </div>
                )}
                {formData.name && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-headline font-bold uppercase rounded-full">
                    NEW ARRIVAL
                  </div>
                )}
              </div>

              <div className="p-6">
                <h4 className="text-lg font-headline font-bold text-white mb-2">
                  {formData.name || 'XENON PRE-WORKOUT'}
                </h4>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {formData.description || 'Advanced formula for explosive energy and focus. Zero crash, maximum performance.'}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black font-headline text-primary-fixed">
                    ${formData.price || '89.00'}
                  </span>
                  {formData.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${formData.originalPrice}</span>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">STOCK AVAILABILITY</span>
                    <span className="text-xs text-primary-fixed flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      IN STOCK
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">PROJECTED SALES</span>
                    <span className="text-xs text-white font-headline">$2.8K</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">STOCK STATUS</span>
                    <span className="text-xs text-primary-fixed font-headline">READY</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-primary-fixed text-on-primary-fixed font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">
              PUBLISH PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
