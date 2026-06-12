import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ShoppingCart, Heart } from 'lucide-react'
import { useShop } from '@/context/ShopContext'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount, wishlistCount, notification, clearNotification } = useShop()

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(clearNotification, 2800)
    return () => clearTimeout(timer)
  }, [notification, clearNotification])

  return (
    <>
      <nav className="navbar navbar-expand-lg tw-navbar sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand tw-brand d-flex align-items-center gap-2">
            <ShoppingBag size={22} className="tw-brand-icon" />
            <div>
              <span className="tw-brand-name">TrendWear</span>
              <span className="tw-brand-tag">Fashion</span>
            </div>
          </Link>

          <div className="d-flex align-items-center gap-2 d-lg-none">
            <Link to="/cart" className="tw-nav-icon-btn position-relative" aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="tw-nav-badge">{cartCount}</span>}
            </Link>
            <button
              className="navbar-toggler border-0"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={label} className="nav-item">
                  <Link
                    to={to}
                    className="nav-link tw-nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="nav-item d-none d-lg-flex align-items-center ms-lg-2 gap-2">
                <Link
                  to="/cart"
                  className="tw-nav-icon-btn position-relative"
                  aria-label={`Wishlist (${wishlistCount})`}
                  title="Wishlist"
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && <span className="tw-nav-badge">{wishlistCount}</span>}
                </Link>
                <Link
                  to="/cart"
                  className="tw-nav-icon-btn position-relative"
                  aria-label={`Cart (${cartCount})`}
                  title="Shopping Cart"
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && <span className="tw-nav-badge">{cartCount}</span>}
                </Link>
              </li>
              <li className="nav-item ms-lg-2">
                <Link
                  to="/products"
                  className="btn tw-btn-gold btn-sm px-3"
                  onClick={() => setIsOpen(false)}
                >
                  Shop Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {notification && (
        <div className="tw-toast-notification">
          {notification}
        </div>
      )}
    </>
  )
}
