export const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <span className="text-5xl mb-4 block">🐔</span>
        <h1 className="text-3xl font-bold text-text">About Vuba Vuba Chicken</h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          Vuba Vuba Chicken connects customers with trusted local chicken sellers
          across Rwanda, delivering fresh poultry directly to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            We exist to make high-quality, fresh chicken accessible to every
            household in Rwanda. By connecting customers directly with local
            farmers, butcheries, and poultry businesses, we eliminate
            middlemen, reduce prices, and ensure quality.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We believe that everyone deserves access to fresh, responsibly-sourced
            chicken. Our platform supports local businesses while making it
            convenient for families to get the protein they need.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text mb-4">Our Vision</h2>
          <p className="text-text-secondary leading-relaxed">
            A Rwanda where every family enjoys fresh, affordable chicken,
            delivered fast from trusted local sources.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            We envision a future where ordering chicken online is as simple as
            ordering a meal — with transparent pricing, reliable delivery, and
            verified sellers you can trust.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-text mb-6 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-3xl">🐔</div>
            <h3 className="text-lg font-semibold text-text mb-2">
              Fresh Chicken
            </h3>
            <p className="text-sm text-text-secondary">
              Whole chickens, live chickens, and processed cuts from trusted
              local sellers.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-3xl">🚚</div>
            <h3 className="text-lg font-semibold text-text mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-text-secondary">
              Fresh chicken delivered to your door across Kigali and major cities
              in Rwanda.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 text-3xl">✓</div>
            <h3 className="text-lg font-semibold text-text mb-2">
              Trusted Sellers
            </h3>
            <p className="text-sm text-text-secondary">
              All sellers are demo-verified. Real verification requires backend
              infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-text mb-4">
          Important: This is a Prototype
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          This website is a frontend-only prototype built as a demonstration.
          It does not process real payments, store real data, or perform real
          deliveries. All functionality is simulated using mock data and browser
          storage (localStorage).
        </p>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          To convert this into a production platform, a backend with secure
          authentication, a real database, official payment processing, and
          integration with delivery services would be required.
        </p>
      </div>
    </div>
  )
}

export default About
