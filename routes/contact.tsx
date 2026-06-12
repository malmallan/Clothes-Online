import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof fields>>({})

  const validate = () => {
    const e: Partial<typeof fields> = {}
    if (!fields.name.trim()) e.name = 'Name is required.'
    if (!fields.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = 'Please enter a valid email.'
    if (!fields.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setLoading(false)
  }

  return (
    <>
      {/* Page Header */}
      <div className="tw-page-header">
        <div className="container">
          <p className="tw-page-eyebrow">Get In Touch</p>
          <h1 className="tw-page-title">Contact Us</h1>
          <p className="tw-page-desc">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      <section className="tw-section">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-5">
              <h3 className="tw-contact-subtitle mb-4">Reach Us Directly</h3>

              <div className="tw-contact-info-card mb-3">
                <div className="d-flex align-items-start gap-3">
                  <div className="tw-contact-icon-wrap">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="tw-contact-info-label">Email</div>
                    <a
                      href="mailto:info@trendwearfashion.com"
                      className="tw-contact-info-value"
                    >
                      info@trendwearfashion.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="tw-contact-info-card mb-3">
                <div className="d-flex align-items-start gap-3">
                  <div className="tw-contact-icon-wrap">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="tw-contact-info-label">Phone</div>
                    <a href="tel:+60123456789" className="tw-contact-info-value">
                      +60 12-345 6789
                    </a>
                  </div>
                </div>
              </div>

              <div className="tw-contact-info-card mb-5">
                <div className="d-flex align-items-start gap-3">
                  <div className="tw-contact-icon-wrap">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="tw-contact-info-label">Address</div>
                    <div className="tw-contact-info-value">Kuala Lumpur, Malaysia</div>
                  </div>
                </div>
              </div>

              <div className="tw-contact-hours">
                <h6 className="tw-contact-hours-title mb-2">Business Hours</h6>
                <div className="tw-contact-hours-row">
                  <span>Monday — Friday</span>
                  <span>9:00 AM — 6:00 PM</span>
                </div>
                <div className="tw-contact-hours-row">
                  <span>Saturday</span>
                  <span>10:00 AM — 4:00 PM</span>
                </div>
                <div className="tw-contact-hours-row">
                  <span>Sunday</span>
                  <span className="tw-closed">Closed</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="tw-contact-form-card">
                {submitted ? (
                  <div className="tw-success-state text-center py-5">
                    <CheckCircle size={56} className="tw-success-icon mb-3" />
                    <h4 className="tw-success-title">Message Sent!</h4>
                    <p className="tw-success-desc">
                      Thank you for reaching out. Our team will get back to you
                      within 1–2 business days.
                    </p>
                    <button
                      className="btn tw-btn-outline-dark mt-3"
                      onClick={() => {
                        setSubmitted(false)
                        setFields({ name: '', email: '', message: '' })
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <input type="hidden" name="form-name" value="contact" />
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="bot-field"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <h3 className="tw-form-title mb-4">Send Us a Message</h3>

                    <div className="mb-3">
                      <label htmlFor="name" className="tw-form-label">
                        Your Name <span className="tw-required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control tw-form-input ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Ahmad bin Abdullah"
                        value={fields.name}
                        onChange={handleChange}
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="tw-form-label">
                        Email Address <span className="tw-required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control tw-form-input ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="message" className="tw-form-label">
                        Message <span className="tw-required">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className={`form-control tw-form-input ${errors.message ? 'is-invalid' : ''}`}
                        placeholder="Tell us how we can help you..."
                        value={fields.message}
                        onChange={handleChange}
                        required
                      />
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn tw-btn-gold w-100 py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
