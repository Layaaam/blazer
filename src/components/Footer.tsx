function Footer() {
  return (
    <footer className="bg-[#024334] text-white">
      <div className="relative">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-gray-50"
        >
          <path d="M0,120V0H1200V120C1200,120,1080,60,600,60C120,60,0,120,0,120Z"></path>
        </svg>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-8 font-poppins">
            © 2026 The Blazer. All rights reserved.
          </p>

          <div className="flex justify-center space-x-8 text-sm">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors font-poppins"
            >
              Terms of Service
            </a>
            <span className="text-gray-400">|</span>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors font-poppins"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
