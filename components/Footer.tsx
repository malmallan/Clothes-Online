import { Link } from '@tanstack/react-router'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="tw-footer">
      <div className="container">
        <div className="row g-4 py-5">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h5 className="tw-footer-brand mb-3">TrendWear Fashion</h5>
            <p className="tw-footer-text mb-4">
              Your destination for affordable, trendy fashion that celebrates personal style.
              Quality clothing delivered with care, from Kuala Lumpur to your doorstep.
            </p>
            <div className="d-flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="tw-social-icon" aria-label="Social media">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h6 className="tw-footer-heading mb-3">Quick Links</h6>
            <ul className="list-unstyled tw-footer-links">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="tw-footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 col-sm-6">
            <h6 className="tw-footer-heading mb-3">Categories</h6>
            <ul className="list-unstyled tw-footer-links">
              {['Men', 'Women', 'Unisex', 'Activewear'].map((cat) => (
                <li key={cat}>
                  <Link to="/products" className="tw-footer-link">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h6 className="tw-footer-heading mb-3">Contact Us</h6>
            <ul className="list-unstyled tw-footer-contact">
              <li className="d-flex align-items-start gap-2 mb-2">
                <Mail size={16} className="tw-footer-icon mt-1 flex-shrink-0" />
                <span>info@trendwearfashion.com</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-2">
                <Phone size={16} className="tw-footer-icon mt-1 flex-shrink-0" />
                <span>+60 12-345 6789</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={16} className="tw-footer-icon mt-1 flex-shrink-0" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="tw-footer-bottom py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <small className="tw-footer-copy">
                &copy; {new Date().getFullYear()} TrendWear Fashion. All rights reserved.
              </small>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <small className="tw-footer-copy">
                Made with care in Malaysia
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
