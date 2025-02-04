const Footer = () => {
  return (
    <>
    <footer className="bg-blue-500 text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
        {/* Logo */}
        <div className="text-xl font-bold">APPLAP</div>

        {/* Product Menu */}
        <div>
          <h3 className="font-semibold mb-2">Product</h3>
          <ul>
            <li><a href="#">Laptop</a></li>
            <li><a href="#">Smartphone</a></li>
            <li><a href="#">Tablet</a></li>
          </ul>
        </div>

        {/* Support Menu */}
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Company Menu */}
        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>

      {/* Hairline */}
      <div className="border-t border-white mt-6 pt-4 flex justify-between text-sm opacity-70">
        <span>APPLAP Inc. 2025</span>
        <div className="space-x-4">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer;