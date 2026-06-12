import { createFileRoute } from '@tanstack/react-router'
import { Target, Eye, Heart, Award, Users } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    desc: 'Every piece we offer is carefully selected for its craftsmanship, durability, and comfort.',
  },
  {
    icon: Users,
    title: 'Inclusive Fashion',
    desc: 'We celebrate diversity with designs that flatter every body type and personal style.',
  },
  {
    icon: Award,
    title: 'Affordability',
    desc: 'Great fashion should never break the bank. We keep prices fair without compromising quality.',
  },
]

function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="tw-page-header">
        <div className="container">
          <p className="tw-page-eyebrow">Who We Are</p>
          <h1 className="tw-page-title">About TrendWear Fashion</h1>
          <p className="tw-page-desc">
            Our story, mission, and the values that drive everything we create.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="tw-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="tw-about-img-wrap">
                <img
                  src="https://picsum.photos/seed/aboutfashion/600/700"
                  alt="TrendWear Fashion team"
                  className="tw-about-img"
                />
                <div className="tw-about-badge">
                  <span className="tw-about-badge-year">Est.</span>
                  <span className="tw-about-badge-num">2020</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <p className="tw-section-eyebrow">Our Foundation</p>
              <h2 className="tw-section-title text-start mb-4">
                Fashion for Every Story
              </h2>
              <p className="tw-about-text mb-4">
                TrendWear Fashion was born from a simple belief: everyone deserves
                to look and feel their best, regardless of budget. Founded in Kuala
                Lumpur, we set out to bridge the gap between runway trends and
                everyday affordability.
              </p>
              <p className="tw-about-text mb-5">
                Today, we serve thousands of fashion-forward Malaysians who trust
                us to deliver quality pieces that fit their lives — from morning
                commutes to weekend adventures.
              </p>

              {/* Mission */}
              <div className="tw-mission-card mb-3">
                <div className="d-flex align-items-start gap-3">
                  <div className="tw-mission-icon-wrap">
                    <Target size={22} />
                  </div>
                  <div>
                    <h5 className="tw-mission-label">Our Mission</h5>
                    <p className="tw-mission-text">
                      To provide affordable and trendy fashion for everyone — celebrating
                      individuality through clothing that empowers confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="tw-mission-card">
                <div className="d-flex align-items-start gap-3">
                  <div className="tw-vision-icon-wrap">
                    <Eye size={22} />
                  </div>
                  <div>
                    <h5 className="tw-mission-label">Our Vision</h5>
                    <p className="tw-mission-text">
                      To become a trusted online clothing brand delivering quality and style —
                      recognised across Malaysia and Southeast Asia for making fashion
                      accessible to all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="tw-values-section">
        <div className="container">
          <div className="tw-section-header">
            <p className="tw-section-eyebrow">What Drives Us</p>
            <h2 className="tw-section-title">Our Core Values</h2>
          </div>

          <div className="row g-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="col-md-4">
                <div className="tw-value-card">
                  <div className="tw-value-icon-wrap mb-3">
                    <Icon size={28} />
                  </div>
                  <h4 className="tw-value-title">{title}</h4>
                  <p className="tw-value-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="tw-stats-section">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { num: '8+', label: 'Collections' },
              { num: '4', label: 'Categories' },
              { num: '5,000+', label: 'Happy Customers' },
              { num: '4.8★', label: 'Average Rating' },
            ].map(({ num, label }) => (
              <div key={label} className="col-6 col-md-3">
                <div className="tw-stat-item">
                  <div className="tw-stat-num">{num}</div>
                  <div className="tw-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
