import { Heart, ShoppingCart } from 'lucide-react'
import { Product } from '@/data/products'
import { useShop } from '@/context/ShopContext'

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useShop()
  const inWishlist = isInWishlist(product.id)

  function handleQuickCart(e: React.MouseEvent) {
    e.stopPropagation()
    addToCart({
      product,
      quantity: 1,
      selectedSize: product.sizes[1] ?? product.sizes[0],
      selectedColor: product.colors[0],
    })
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="tw-product-card h-100">
      <div className="tw-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="tw-card-img"
          loading="lazy"
        />
        <span className="tw-category-badge">{product.category}</span>
        <div className="tw-card-actions">
          <button
            className={`tw-card-action-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          <button
            className="tw-card-action-btn"
            onClick={handleQuickCart}
            aria-label="Quick add to cart"
            title="Quick add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
      <div className="tw-card-body">
        <h5 className="tw-card-title">{product.name}</h5>
        <p className="tw-card-desc">{product.description.split('.')[0]}.</p>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span className="tw-price">RM {product.price.toFixed(2)}</span>
          <button
            className="btn tw-btn-outline-dark btn-sm"
            onClick={() => onViewDetails(product)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
