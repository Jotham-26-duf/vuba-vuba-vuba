import { Link } from "react-router-dom"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const customerLinks = [
    { name: "Home", path: "/" },
    { name: "Shop Chicken", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Sellers", path: "/sellers" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/contact#faq" },
  ]

  const sellerLinks = [
    { name: "Seller Login", path: "/login" },
    { name: "Register as Seller", path: "/register" },
    { name: "Seller Dashboard", path: "/seller/dashboard" },
    { name: "Add Chicken", path: "/seller/add-chicken" },
  ]

  const supportLinks = [
    { name: "Help Center", path: "/contact" },
    { name: "Delivery Info", path: "/how-it-works" },
    { name: "Safety", path: "/about" },
    { name: "Terms", path: "/" },
    { name: "Privacy", path: "/" },
  ]

  return (
    <footer className="bg-text pt-10 text-surface-alt">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="text-3xl">🐔</span>
              <span>Vuba Vuba Chicken</span>
            </Link>
            <p className="mt-3 text-sm text-gray-300">
              Fresh chicken delivered fast across Rwanda. Order from trusted
              local sellers and get premium poultry delivered to your door.
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Demo Payment System. No real transactions processed.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-200">
              Customer
            </h3>
            <ul className="space-y-2">
              {customerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-200">
              Sellers
            </h3>
            <ul className="space-y-2">
              {sellerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-200">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-300">📞 +250 788 000 111</span>
              </li>
              <li>
                <span className="text-sm text-gray-300">✉️ info@vubavubachicken.rw</span>
              </li>
              <li>
                <span className="text-sm text-gray-300">📍 Kigali, Rwanda</span>
              </li>
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-200">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700 text-gray-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700 text-gray-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-700 text-gray-300 hover:bg-primary hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
          <p>
            &copy; {currentYear} Vuba Vuba Chicken. All rights reserved.
          </p>
          <p className="mt-1">
            This is a demo prototype. No real money transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
