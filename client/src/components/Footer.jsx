const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-lg font-semibold mb-2">Need Assistance?</h2>
        <p className="mb-2">Feel free to message us at any time.</p>
        <a
          href="tel:+639123456789"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Contact Us!
        </a>
        <p className="mt-4 text-sm text-gray-300">
          © {new Date().getFullYear()} Barangay Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
