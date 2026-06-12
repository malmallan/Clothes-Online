import { useState } from 'react'
import { X, Tag, Ruler, Palette, Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/data/products'
import { useShop } from '@/context/ShopContext'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [cartError, setCartError] = useState(false)
  const { addToCart, toggleWishlist, isInWishlist } = useShop()

  if (!product) return null

  const inWishlist = isInWishlist(product.id)

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) {
      setCartError(true)
      return
    }
    setCartError(false)
    addToCart({ product, quantity: 1, selectedSize, selectedColor })
    onClose()
  }

  function handleClose() {
    setSelectedSize('')
    setSelectedColor('')
    setCartError(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop show tw-modal-backdrop"
        onClick={handleClose}
        style={{ cursor: 'pointer' }}
      />

      {/* Modal */}
      <div
        className="modal d-block show"
        tabIndex={-1}
        role="dialog"
        aria-label={product.name}
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content tw-modal-content">
            <button
              className="btn tw-modal-close"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="modal-body p-0">
              <div className="row g-0">
                {/* Image */}
                <div className="col-md-5">
                  <div className="tw-modal-img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="tw-modal-img"
                    />
                    <span className="tw-category-badge">{product.category}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="col-md-7">
                  <div className="p-4 p-lg-5">
                    <h2 className="tw-modal-title mb-1">{product.name}</h2>
                    <p className="tw-modal-price mb-4">RM {product.price.toFixed(2)}</p>

                    <p className="tw-modal-desc mb-4">{product.description}</p>

                    {/* Sizes */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Ruler size={16} className="tw-detail-icon" />
                        <span className="tw-detail-label">Select Size</span>
                        {cartError && !selectedSize && (
                          <span className="tw-select-error">Required</span>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className={`btn tw-size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Palette size={16} className="tw-detail-icon" />
                        <span className="tw-detail-label">Select Color</span>
                        {cartError && !selectedColor && (
                          <span className="tw-select-error">Required</span>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            className={`btn tw-color-btn ${selectedColor === color ? 'active' : ''}`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="tw-specs-box mb-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Tag size={16} className="tw-detail-icon" />
                        <span className="tw-detail-label">Product Specs</span>
                      </div>
                      <div className="row g-2">
                        <div className="col-6">
                          <span className="tw-spec-label">Category</span>
                          <span className="tw-spec-value">{product.category}</span>
                        </div>
                        <div className="col-6">
                          <span className="tw-spec-label">Price</span>
                          <span className="tw-spec-value">RM {product.price.toFixed(2)}</span>
                        </div>
                        <div className="col-6">
                          <span className="tw-spec-label">SKU</span>
                          <span className="tw-spec-value">TW-{String(product.id).padStart(4, '0')}</span>
                        </div>
                        <div className="col-6">
                          <span className="tw-spec-label">Availability</span>
                          <span className="tw-spec-value tw-instock">In Stock</span>
                        </div>
                      </div>
                    </div>

                    {cartError && (!selectedSize || !selectedColor) && (
                      <p className="tw-cart-error-msg mb-3">Please select a size and color before adding to cart.</p>
                    )}

                    <div className="d-flex gap-2">
                      <button
                        className="btn tw-btn-gold flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        className={`btn tw-btn-wishlist-modal py-2 px-3 d-flex align-items-center gap-2 ${inWishlist ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product)}
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
                        {inWishlist ? 'Saved' : 'Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
