import React, { useEffect, useState, useRef } from "react";
import { getRequest } from "../service/ApiService";
import { config } from "../config";

const Portfolio = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  // Prevent double API call in StrictMode
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const fetchProducts = async () => {
      try {
        const data = await getRequest(config.ENDPOINTS.PRODUCTS);
        if (data?.status === "success" && data?.data) {
          setProducts(data.data);
        } else {
          console.warn("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white px-6 py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mt-2 mb-4">
        Our Products
      </h2>

      <p className="max-w-xl text-center text-gray-200 mb-12 px-4">
        Discover the innovative solutions we offer, designed to elevate
        businesses with efficiency and scalability.
      </p>

      {/* Products */}
      {products.length === 0 ? (
        <p className="text-gray-400 text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center group">
              {/* 👇 Uniform image box */}
              <div className="w-56 h-56 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden backdrop-blur-sm transition transform group-hover:scale-105">
                <img
                  src={product.logo}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={() => openModal(product)}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden relative flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-20">
              <h3 className="text-xl font-bold text-black">
                {selectedProduct.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-black text-2xl font-bold hover:scale-110 transition"
              >
                ✖
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6">
              <img
                src={selectedProduct.logo}
                alt={selectedProduct.name}
                className="w-full h-64 object-contain mb-6"
              />

              <p className="text-gray-700 whitespace-pre-wrap mb-6">
                {selectedProduct.description}
              </p>

              {selectedProduct.link && (
                <a
                  href={selectedProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition-all"
                >
                  Visit Product
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
