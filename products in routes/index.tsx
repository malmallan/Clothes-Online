import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Filter } from 'lucide-react'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ProductModal } from '@/components/ProductModal'
import type { Product } from '@/data/products'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

type Category = 'All' | 'Men' | 'Women' | 'Unisex' | 'Activewear'

const categories: Category[] = ['All', 'Men', 'Women', 'Unisex', 'Activewear']

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Page Header */}
      <div className="tw-page-header">
        <div className="container">
          <p className="tw-page-eyebrow">Our Collection</p>
          <h1 className="tw-page-title">All Products</h1>
          <p className="tw-page-desc">
            Explore our full range of fashion-forward clothing, curated for every style and occasion.
          </p>
        </div>
      </div>

      <section className="tw-section">
        <div className="container">
          {/* Category Filter */}
          <div className="tw-filter-bar mb-5">
            <div className="d-flex align-items-center gap-2 me-3">
              <Filter size={16} className="tw-filter-icon" />
              <span className="tw-filter-label">Filter:</span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn tw-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="tw-filter-count ms-1">
                    (
                    {cat === 'All'
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                    )
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="tw-results-count mb-4">
            Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && ` in "${activeCategory}"`}
          </p>

          {/* Products Grid */}
          <div className="row g-4">
            {filtered.map((product) => (
              <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
                <ProductCard product={product} onViewDetails={setSelectedProduct} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="tw-empty-state text-center py-5">
              <p className="tw-empty-title">No products found</p>
              <p className="tw-empty-desc">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
