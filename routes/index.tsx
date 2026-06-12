import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, Star, Truck, RotateCcw, Shield } from 'lucide-react'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ProductModal } from '@/components/ProductModal'
import type { Product } from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    desc: 'Free shipping on orders above RM150',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day hassle-free return policy',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    desc: '100% secure transaction guarantee',
  },
  {
    icon: Star,
    title: 'Quality Assured',
    desc: 'Premium materials, lasting comfort',
  },
]

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="tw-hero">
        <div className="tw-hero-bg" />
        <div className="container position-relative">
          <div className="row align-items-center min-vh-hero">
            <div className="col-lg-7 col-xl-6">
              <p className="tw-hero-eyebrow">New Collection 2024</p>
              <h1 className="tw-hero-title">
                Discover Your Style with{' '}
                <em className="tw-hero-brand">TrendWear Fashion</em>
              </h1>
              <p className="tw-hero-sub">
                Affordable, trendy clothing for every occasion. From casual
                everyday wear to statement pieces that turn heads — curated
                with care from Kuala Lumpur.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/products" className="btn tw-btn-gold btn-lg px-4 py-3">
                  Shop Collection
                  <ArrowRight size={18} className="ms-2" />
                </Link>
                <Link
                  to="/about"
                  className="btn tw-btn-outline-cream btn-lg px-4 py-3"
                >
                  Our Story
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-end">
              <div className="tw-hero-img-wrap">
                <img
                  src="https://picsum.photos/seed/fashion-hero-model/520/640"
                  alt="Fashion showcase"
                  className="tw-hero-img"
                />
                <div className="tw-hero-badge">
                  <span className="tw-hero-badge-num">8+</span>
                  <span className="tw-hero-badge-txt">Collections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-hero-scroll-indicator">
          <div className="tw-scroll-dot" />
        </div>
      </section>

      {/* Features Strip */}
      <section className="tw-features-strip">
        <div className="container">
          <div className="row g-0">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="col-6 col-md-3">
                <div className="tw-feature-item">
                  <Icon size={24} className="tw-feature-icon" />
                  <div>
                    <div className="tw-feature-title">{title}</div>
                    <div className="tw-feature-desc">{desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="tw-section">
        <div className="container">
          <div className="tw-section-header">
            <p className="tw-section-eyebrow">Handpicked For You</p>
            <h2 className="tw-section-title">Featured Collection</h2>
            <p className="tw-section-desc">
              Discover our most-loved pieces — thoughtfully selected to elevate
              your everyday wardrobe.
            </p>
          </div>

          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-lg-3">
                <ProductCard
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/products" className="btn tw-btn-outline-dark btn-lg px-5">
              View All Products
              <ArrowRight size={18} className="ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="tw-categories-section">
        <div className="container">
          <div className="tw-section-header">
            <p className="tw-section-eyebrow">Shop By Category</p>
            <h2 className="tw-section-title">Browse Collections</h2>
          </div>

          <div className="row g-3">
            {[
              { label: 'Men', img: 'https://picsum.photos/seed/fashion-men-category/600/400', count: '3 items' },
              { label: 'Women', img: 'https://picsum.photos/seed/fashion-women-category/600/400', count: '2 items' },
              { label: 'Unisex', img: 'https://picsum.photos/seed/fashion-unisex-street/600/400', count: '2 items' },
              { label: 'Activewear', img: 'https://picsum.photos/seed/fashion-activewear-gym/600/400', count: '1 item' },
            ].map(({ label, img, count }) => (
              <div key={label} className="col-6 col-md-3">
                <Link to="/products" className="text-decoration-none">
                  <div className="tw-category-card">
                    <img src={img} alt={label} className="tw-category-img" />
                    <div className="tw-category-overlay">
                      <h6 className="tw-category-name">{label}</h6>
                      <span className="tw-category-count">{count}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="tw-cta-section">
        <div className="container">
          <div className="tw-cta-inner text-center">
            <p className="tw-cta-eyebrow">Limited Time Offer</p>
            <h2 className="tw-cta-title">Style That Speaks For You</h2>
            <p className="tw-cta-desc">
              New arrivals every week. Be the first to discover our latest drops.
            </p>
            <Link to="/products" className="btn tw-btn-gold btn-lg px-5 py-3">
              Shop Collection Now
            </Link>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
