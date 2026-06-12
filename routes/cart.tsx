import { createFileRoute, Link } from '@tanstack/react-router'
import { ShoppingCart, Heart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useShop } from '@/context/ShopContext'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const {
    cart,
    wishlist,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    addToCart,
    cartTotal,
    cartCount,
  } = useShop()

  function moveToCart(productId: number) {
    const product = wishlist.find((p) => p.id === productId)
    if (!product) return
    addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[1] ?? product.sizes[0],
      selectedColor: product.colors[0],
    })
    toggleWishlist(product)
  }

  const shipping = cartTotal >= 150 ? 0 : 10
  const grandTotal = cartTotal + shipping

  return (
    <>
      <div className="tw-page-header">
        <div className="container">
          <p className="tw-page-eyebrow">Your Selections</p>
          <h1 className="tw-page-title">Cart & Wishlist</h1>
          <p className="tw-page-desc">Review your chosen items and saved pieces before checkout.</p>
        </div>
      </div>

      <section className="tw-section">
        <div className="container">
          <div className="row g-5">
            {/* LEFT: Cart + Wishlist */}
            <div className="col-lg-8">

              {/* CART */}
              <div className="tw-cart-section mb-5">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <ShoppingCart size={20} className="tw-section-icon" />
                  <h2 className="tw-cart-section-title mb-0">Shopping Cart</h2>
                  {cartCount > 0 && (
                    <span className="tw-count-pill">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="tw-empty-cart">
                    <ShoppingBag size={48} className="tw-empty-icon" />
                    <p className="tw-empty-title">Your cart is empty</p>
                    <p className="tw-empty-desc">Browse our collection and add items you love.</p>
                    <Link to="/products" className="btn tw-btn-gold mt-2 px-4">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="tw-cart-items">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="tw-cart-item"
                      >
                        <div className="tw-cart-item-img-wrap">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="tw-cart-item-img"
                          />
                        </div>
                        <div className="tw-cart-item-details">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <h5 className="tw-cart-item-name">{item.product.name}</h5>
                              <p className="tw-cart-item-meta">
                                Size: <strong>{item.selectedSize}</strong> &nbsp;·&nbsp; Color: <strong>{item.selectedColor}</strong>
                              </p>
                              <span className="tw-category-pill">{item.product.category}</span>
                            </div>
                            <button
                              className="btn tw-remove-btn"
                              onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div className="tw-qty-control">
                              <button
                                className="tw-qty-btn"
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="tw-qty-num">{item.quantity}</span>
                              <button
                                className="tw-qty-btn"
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="tw-cart-item-price">
                              RM {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* WISHLIST */}
              <div className="tw-wishlist-section">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <Heart size={20} className="tw-section-icon tw-section-icon-wish" />
                  <h2 className="tw-cart-section-title mb-0">Wishlist</h2>
                  {wishlist.length > 0 && (
                    <span className="tw-count-pill tw-count-pill-wish">{wishlist.length} saved</span>
                  )}
                </div>

                {wishlist.length === 0 ? (
                  <div className="tw-empty-cart">
                    <Heart size={48} className="tw-empty-icon" />
                    <p className="tw-empty-title">No saved items yet</p>
                    <p className="tw-empty-desc">Click the heart icon on any product to save it for later.</p>
                    <Link to="/products" className="btn tw-btn-outline-dark mt-2 px-4">
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="row g-3">
                    {wishlist.map((product) => (
                      <div key={product.id} className="col-sm-6 col-md-4">
                        <div className="tw-wishlist-card">
                          <div className="tw-wishlist-img-wrap">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="tw-wishlist-img"
                            />
                            <span className="tw-category-badge">{product.category}</span>
                          </div>
                          <div className="tw-wishlist-body">
                            <h6 className="tw-wishlist-name">{product.name}</h6>
                            <p className="tw-wishlist-price">RM {product.price.toFixed(2)}</p>
                            <div className="d-flex gap-2 mt-auto">
                              <button
                                className="btn tw-btn-gold btn-sm flex-grow-1"
                                onClick={() => moveToCart(product.id)}
                              >
                                <ShoppingCart size={13} className="me-1" />
                                Move to Cart
                              </button>
                              <button
                                className="btn tw-remove-btn-wish"
                                onClick={() => toggleWishlist(product)}
                                aria-label="Remove from wishlist"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="col-lg-4">
              <div className="tw-order-summary sticky-top" style={{ top: '80px' }}>
                <h3 className="tw-summary-title">Order Summary</h3>

                <div className="tw-summary-rows">
                  <div className="tw-summary-row">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>RM {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="tw-summary-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'tw-free-shipping' : ''}>
                      {shipping === 0 ? 'FREE' : `RM ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {cartTotal > 0 && cartTotal < 150 && (
                    <p className="tw-free-shipping-hint">
                      Add RM {(150 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="tw-summary-divider" />
                  <div className="tw-summary-total">
                    <span>Total</span>
                    <span>RM {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {cart.length > 0 ? (
                  <Link
                    to="/payment"
                    className="btn tw-btn-gold w-100 py-3 mt-4 d-flex align-items-center justify-content-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <button className="btn tw-btn-gold w-100 py-3 mt-4" disabled>
                    Proceed to Payment
                  </button>
                )}

                <Link
                  to="/products"
                  className="btn tw-btn-outline-dark w-100 py-2 mt-2"
                >
                  Continue Shopping
                </Link>

                <div className="tw-summary-trust mt-4">
                  <p className="tw-trust-item">🔒 Secure SSL checkout</p>
                  <p className="tw-trust-item">🔄 30-day easy returns</p>
                  <p className="tw-trust-item">🚚 Ships within 1–3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
