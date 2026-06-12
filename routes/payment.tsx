import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { CreditCard, MapPin, CheckCircle, ArrowLeft, Lock } from 'lucide-react'
import { useShop } from '@/context/ShopContext'

export const Route = createFileRoute('/payment')({
  component: PaymentPage,
})

type PaymentMethod = 'card' | 'online_banking' | 'ewallet'

interface ShippingForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postcode: string
}

const MY_STATES = [
  'Kuala Lumpur', 'Selangor', 'Johor', 'Perak', 'Pahang',
  'Kelantan', 'Terengganu', 'Kedah', 'Perlis', 'Penang',
  'Negeri Sembilan', 'Melaka', 'Sabah', 'Sarawak', 'Putrajaya', 'Labuan',
]

function PaymentPage() {
  const { cart, cartTotal, clearCart } = useShop()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Partial<ShippingForm & { payment: string }>>({})
  const [form, setForm] = useState<ShippingForm>({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', postcode: '',
  })
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const shipping = cartTotal >= 150 ? 0 : 10
  const grandTotal = cartTotal + shipping

  function set(field: keyof ShippingForm, val: string) {
    setForm((f) => ({ ...f, [field]: val }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<ShippingForm & { payment: string }> = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.state) e.state = 'State is required'
    if (!form.postcode.trim()) e.postcode = 'Postcode is required'
    if (paymentMethod === 'card') {
      if (!cardForm.number.replace(/\s/g, '') || cardForm.number.replace(/\s/g, '').length < 16) {
        e.payment = 'Valid card number is required'
      } else if (!cardForm.name.trim()) {
        e.payment = 'Name on card is required'
      } else if (!cardForm.expiry || !/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
        e.payment = 'Valid expiry (MM/YY) is required'
      } else if (!cardForm.cvv || cardForm.cvv.length < 3) {
        e.payment = 'Valid CVV is required'
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    if (cart.length === 0) return
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsProcessing(false)
    clearCart()
    setOrderPlaced(true)
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <>
        <div className="tw-page-header">
          <div className="container">
            <p className="tw-page-eyebrow">Checkout</p>
            <h1 className="tw-page-title">Payment</h1>
          </div>
        </div>
        <section className="tw-section">
          <div className="container text-center py-5">
            <p className="tw-empty-title">Your cart is empty</p>
            <p className="tw-empty-desc mb-4">Add some items before proceeding to payment.</p>
            <Link to="/products" className="btn tw-btn-gold px-5">Shop Now</Link>
          </div>
        </section>
      </>
    )
  }

  if (orderPlaced) {
    return (
      <>
        <div className="tw-page-header">
          <div className="container">
            <p className="tw-page-eyebrow">Order Confirmed</p>
            <h1 className="tw-page-title">Thank You!</h1>
          </div>
        </div>
        <section className="tw-section">
          <div className="container">
            <div className="tw-order-success mx-auto text-center">
              <CheckCircle size={64} className="tw-success-check mb-4" />
              <h2 className="tw-success-heading">Order Placed Successfully!</h2>
              <p className="tw-success-body">
                Thank you for shopping with TrendWear Fashion. Your order has been received and will
                be processed within 1–2 business days. A confirmation will be sent to <strong>{form.email}</strong>.
              </p>
              <div className="tw-order-ref mt-4 mb-5">
                <span className="tw-ref-label">Order Reference</span>
                <span className="tw-ref-num">TW-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/products" className="btn tw-btn-gold px-5 py-2">Continue Shopping</Link>
                <Link to="/" className="btn tw-btn-outline-dark px-5 py-2">Back to Home</Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <div className="tw-page-header">
        <div className="container">
          <p className="tw-page-eyebrow">Checkout</p>
          <h1 className="tw-page-title">Payment</h1>
          <p className="tw-page-desc">Complete your order securely.</p>
        </div>
      </div>

      <section className="tw-section">
        <div className="container">
          <Link to="/cart" className="tw-back-link mb-4 d-inline-flex align-items-center gap-2">
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="row g-5">
              {/* LEFT: Forms */}
              <div className="col-lg-7">

                {/* Shipping */}
                <div className="tw-checkout-card mb-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <MapPin size={20} className="tw-section-icon" />
                    <h3 className="tw-checkout-card-title mb-0">Shipping Details</h3>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="tw-form-label">Full Name <span className="tw-required">*</span></label>
                      <input
                        type="text"
                        className={`form-control tw-form-input ${errors.fullName ? 'is-invalid' : ''}`}
                        placeholder="e.g. Ahmad bin Abdullah"
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="tw-form-label">Email <span className="tw-required">*</span></label>
                      <input
                        type="email"
                        className={`form-control tw-form-input ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="tw-form-label">Phone <span className="tw-required">*</span></label>
                      <input
                        type="tel"
                        className={`form-control tw-form-input ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="+60 12-345 6789"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-12">
                      <label className="tw-form-label">Street Address <span className="tw-required">*</span></label>
                      <input
                        type="text"
                        className={`form-control tw-form-input ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="e.g. No. 12, Jalan Bukit Bintang"
                        value={form.address}
                        onChange={(e) => set('address', e.target.value)}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="col-md-5">
                      <label className="tw-form-label">City <span className="tw-required">*</span></label>
                      <input
                        type="text"
                        className={`form-control tw-form-input ${errors.city ? 'is-invalid' : ''}`}
                        placeholder="e.g. Kuala Lumpur"
                        value={form.city}
                        onChange={(e) => set('city', e.target.value)}
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="tw-form-label">State <span className="tw-required">*</span></label>
                      <select
                        className={`form-select tw-form-input ${errors.state ? 'is-invalid' : ''}`}
                        value={form.state}
                        onChange={(e) => set('state', e.target.value)}
                      >
                        <option value="">Select state</option>
                        {MY_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                    <div className="col-md-3">
                      <label className="tw-form-label">Postcode <span className="tw-required">*</span></label>
                      <input
                        type="text"
                        className={`form-control tw-form-input ${errors.postcode ? 'is-invalid' : ''}`}
                        placeholder="50000"
                        maxLength={5}
                        value={form.postcode}
                        onChange={(e) => set('postcode', e.target.value.replace(/\D/g, ''))}
                      />
                      {errors.postcode && <div className="invalid-feedback">{errors.postcode}</div>}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="tw-checkout-card">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <CreditCard size={20} className="tw-section-icon" />
                    <h3 className="tw-checkout-card-title mb-0">Payment Method</h3>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {(
                      [
                        { id: 'card', label: 'Credit / Debit Card' },
                        { id: 'online_banking', label: 'Online Banking' },
                        { id: 'ewallet', label: 'e-Wallet' },
                      ] as { id: PaymentMethod; label: string }[]
                    ).map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        className={`btn tw-payment-method-btn ${paymentMethod === id ? 'active' : ''}`}
                        onClick={() => { setPaymentMethod(id); setErrors((e) => ({ ...e, payment: undefined })) }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="tw-card-form">
                      <div className="mb-3">
                        <label className="tw-form-label">Card Number <span className="tw-required">*</span></label>
                        <input
                          type="text"
                          className={`form-control tw-form-input tw-card-input ${errors.payment && errors.payment.includes('card') ? 'is-invalid' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          value={cardForm.number}
                          onChange={(e) => setCardForm((f) => ({ ...f, number: formatCardNumber(e.target.value) }))}
                          maxLength={19}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="tw-form-label">Name on Card <span className="tw-required">*</span></label>
                        <input
                          type="text"
                          className="form-control tw-form-input"
                          placeholder="e.g. AHMAD BIN ABDULLAH"
                          value={cardForm.name}
                          onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <label className="tw-form-label">Expiry Date <span className="tw-required">*</span></label>
                          <input
                            type="text"
                            className="form-control tw-form-input"
                            placeholder="MM/YY"
                            value={cardForm.expiry}
                            onChange={(e) => setCardForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                            maxLength={5}
                          />
                        </div>
                        <div className="col-6">
                          <label className="tw-form-label">CVV <span className="tw-required">*</span></label>
                          <input
                            type="password"
                            className="form-control tw-form-input"
                            placeholder="•••"
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      {errors.payment && (
                        <p className="tw-cart-error-msg mt-2">{errors.payment}</p>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'online_banking' && (
                    <div className="tw-alt-payment-info">
                      <p className="tw-alt-payment-text">
                        You will be redirected to your bank's secure portal to complete the payment after placing the order.
                      </p>
                      <div className="d-flex flex-wrap gap-2 mt-3">
                        {['Maybank2u', 'CIMB Clicks', 'Public Bank', 'RHB Now', 'Hong Leong Connect'].map((bank) => (
                          <span key={bank} className="tw-bank-chip">{bank}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'ewallet' && (
                    <div className="tw-alt-payment-info">
                      <p className="tw-alt-payment-text">
                        Select your preferred e-wallet to complete the payment after placing the order.
                      </p>
                      <div className="d-flex flex-wrap gap-2 mt-3">
                        {['Touch \'n Go eWallet', 'GrabPay', 'Boost', 'ShopeePay', 'BigPay'].map((w) => (
                          <span key={w} className="tw-bank-chip">{w}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Order Summary */}
              <div className="col-lg-5">
                <div className="tw-order-summary sticky-top" style={{ top: '80px' }}>
                  <h3 className="tw-summary-title">Order Summary</h3>

                  <div className="tw-payment-items">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="tw-payment-item">
                        <div className="tw-payment-item-img-wrap">
                          <img src={item.product.image} alt={item.product.name} className="tw-payment-item-img" />
                          <span className="tw-payment-item-qty">{item.quantity}</span>
                        </div>
                        <div className="tw-payment-item-info">
                          <p className="tw-payment-item-name">{item.product.name}</p>
                          <p className="tw-payment-item-meta">{item.selectedSize} · {item.selectedColor}</p>
                        </div>
                        <span className="tw-payment-item-price">RM {(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="tw-summary-rows mt-3">
                    <div className="tw-summary-row">
                      <span>Subtotal</span>
                      <span>RM {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="tw-summary-row">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'tw-free-shipping' : ''}>
                        {shipping === 0 ? 'FREE' : `RM ${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="tw-summary-divider" />
                    <div className="tw-summary-total">
                      <span>Total</span>
                      <span>RM {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn tw-btn-gold w-100 py-3 mt-4 d-flex align-items-center justify-content-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        Place Order · RM {grandTotal.toFixed(2)}
                      </>
                    )}
                  </button>

                  <div className="tw-summary-trust mt-3">
                    <p className="tw-trust-item">🔒 256-bit SSL encryption</p>
                    <p className="tw-trust-item">🔄 30-day hassle-free returns</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
