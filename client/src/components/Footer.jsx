const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">Need Assistance?</h2>
          <p className="mb-4 text-gray-200">
            Feel free to reach out to us anytime.
          </p>
          <a
            href="tel:+639123456789"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-bold py-3 px-8 rounded shadow-md hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>

        {/* Right Column */}
        <div className="text-center md:text-right text-gray-300 text-sm">
          <p className="mb-2">Barangay Services</p>
          <p className="mb-2">Barangay 91 Abucay, Tacloban City, Philippines</p>
          <p className="mb-2">Email: barangay91abucay@gmail.com </p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
