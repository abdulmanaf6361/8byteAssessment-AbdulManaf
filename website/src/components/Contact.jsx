"use client";

import { useState } from "react";
import { postRequest } from "../service/ApiService";
import {
  FiSend,
  FiMapPin,
  FiPhone,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { config } from "../config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validateForm()) {
      setSubmitMessage({
        type: "error",
        text: "Please fill all required fields correctly",
      });
      return;
    }

    setLoading(true);

    try {
      await postRequest(config.ENDPOINTS.CONTACT, formData);

      setSubmitMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.response?.data?.detail ||
          "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full px-6 py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden"
    >
      {/* Magical radial background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-6">
          <FiMail className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Get in Touch
        </h2>

        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Have questions or want to work with Scifyx? Drop us a message.
        </p>
      </div>

      {/* Animated Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* --- FORM CARD --- */}
        <div
          className="group bg-white/5 backdrop-blur-xl border border-emerald-300/20 rounded-3xl p-10 shadow-xl hover:bg-white/10 hover:border-emerald-300/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500"
          style={{
            animation: "fadeInUp 0.7s ease-out forwards",
            animationDelay: "150ms",
            opacity: 0,
          }}
        >
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl mt-1 border-2 bg-gray-900/40 text-white 
                    ${
                      errors.name
                        ? "border-red-400"
                        : "border-white/20 hover:border-emerald-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="flex items-center text-red-400 mt-1">
                    <FiAlertCircle className="mr-1" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl mt-1 border-2 bg-gray-900/40 text-white 
                    ${
                      errors.email
                        ? "border-red-400"
                        : "border-white/20 hover:border-emerald-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="flex items-center text-red-400 mt-1">
                    <FiAlertCircle className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-semibold">Subject *</label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl mt-1 border-2 bg-gray-900/40 text-white 
                    ${
                      errors.subject
                        ? "border-red-400"
                        : "border-white/20 hover:border-emerald-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="How can we help?"
              />
              {errors.subject && (
                <p className="flex items-center text-red-400 mt-1">
                  <FiAlertCircle className="mr-1" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl mt-1 border-2 bg-gray-900/40 text-white resize-none
                    ${
                      errors.message
                        ? "border-red-400"
                        : "border-white/20 hover:border-emerald-400/40"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Write your message..."
              ></textarea>

              {errors.message && (
                <p className="flex items-center text-red-400 mt-1">
                  <FiAlertCircle className="mr-1" /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 transform 
                ${
                  loading
                    ? "bg-emerald-500/40 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
                }
              `}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="mr-2" /> Send Message
                </>
              )}
            </button>
          </form>

          {/* API Response Message */}
          {submitMessage && (
            <div
              className={`mt-6 p-4 rounded-xl border-l-4 
              ${
                submitMessage.type === "success"
                  ? "bg-green-50/10 border-green-400 text-green-300"
                  : "bg-red-50/10 border-red-400 text-red-300"
              }`}
            >
              <div className="flex items-center">
                {submitMessage.type === "success" ? (
                  <FiCheck className="mr-2" />
                ) : (
                  <FiAlertCircle className="mr-2" />
                )}
                {submitMessage.text}
              </div>
            </div>
          )}
        </div>

        {/* --- CONTACT INFO CARD --- */}
        <div
          className="group bg-white/5 backdrop-blur-xl border border-emerald-300/20 rounded-3xl p-10 shadow-xl hover:bg-white/10 hover:border-emerald-300/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500"
          style={{
            animation: "fadeInUp 0.7s ease-out forwards",
            animationDelay: "300ms",
            opacity: 0,
          }}
        >
          <h3 className="text-2xl font-bold mb-8">Reach Us</h3>

          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-300">
                <FiMapPin className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-semibold">Our Address</h4>
                <p className="text-white/70">
                  Scifyx Tech Private Limited, Chickakammanahalli,
                  <br />
                  Gottigere PO, BG Road, Bengaluru - 560083
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-300">
                <FiPhone className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <a
                  href="tel:+917022253057"
                  className="text-emerald-300 font-medium hover:text-emerald-200"
                >
                  +91 7022253057
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-300">
                <FiMail className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <a
                  href="mailto:support@scifyx.com"
                  className="text-emerald-300 font-medium hover:text-emerald-200"
                >
                  support@scifyx.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>

            <div className="flex space-x-4">
              {[
                {
                  icon: <FiLinkedin className="w-5 h-5" />,
                  link: "https://www.linkedin.com/company/scifyx/",
                },
                {
                  icon: <FiTwitter className="w-5 h-5" />,
                  link: "https://twitter.com",
                },
                {
                  icon: <FiFacebook className="w-5 h-5" />,
                  link: "https://facebook.com",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  className="bg-white/10 hover:bg-emerald-500 hover:text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25"
                  rel="noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for fade animation */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
