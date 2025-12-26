"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRequest, postRequest } from "../service/ApiService";
import { config } from "../config";

const CareerDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    github_url: "",
    location: "",
    message: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [jobError, setJobError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setJobError("");
        const response = await getRequest(config.ENDPOINTS.CAREERS);
        const foundJob = response.data.find((j) => String(j.id) === id);

        if (!foundJob) {
          setJobError(
            "Job not found. This position may no longer be available."
          );
          setJob(null);
        } else {
          setJob(foundJob);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJobError("Failed to load job details. Please try again later.");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Form Validation (same as before)
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (form.linkedin_url.trim() && !linkedinRegex.test(form.linkedin_url)) {
      newErrors.linkedin_url = "Invalid LinkedIn URL";
    }
    if (form.github_url.trim() && !githubRegex.test(form.github_url)) {
      newErrors.github_url = "Invalid GitHub URL";
    }
    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!form.resume) {
      newErrors.resume = "Resume is required";
    } else if (form.resume.type !== "application/pdf") {
      newErrors.resume = "Only PDF files are accepted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm((f) => ({ ...f, resume: files[0] }));
      if (files[0] && files[0].type !== "application/pdf") {
        setErrors((e) => ({ ...e, resume: "Only PDF files are accepted" }));
      } else {
        setErrors((e) => ({ ...e, resume: "" }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
      if (errors[name]) {
        setErrors((e) => ({ ...e, [name]: "" }));
      }
    }
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) {
      setSubmitMessage("Job not found. Please try again.");
      return;
    }

    if (!validateForm()) {
      setSubmitMessage("Please correct the errors in the form.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage("");

    try {
      const formData = new FormData();
      formData.append("career", job.id);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("linkedin_url", form.linkedin_url);
      formData.append("github_url", form.github_url);
      formData.append("location", form.location);
      formData.append("message", form.message);
      formData.append("resume", form.resume);

      await postRequest(config.ENDPOINTS.CAREER_APPLY, formData, true);

      setSubmitMessage("Application submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        linkedin_url: "",
        github_url: "",
        location: "",
        message: "",
        resume: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage(
        `Error: ${error.message || "Failed to submit application"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-300 rounded-full animate-ping mx-auto"></div>
          </div>
          <p className="text-cyan-300 font-semibold text-lg animate-pulse">
            Loading job details...
          </p>
          <p className="text-cyan-400 text-sm mt-2">
            Please wait while we fetch the information
          </p>
        </div>
      </div>
    );
  }

  if (!job || jobError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-500/20 border border-red-500/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-red-400 font-semibold mb-6">
            {jobError || "Job not found."}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="block text-cyan-300 hover:text-white hover:underline font-medium transition-colors"
            >
              ← Back to Careers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-cyan-300 hover:text-white font-semibold transition-all duration-200 hover:translate-x-1 group"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Careers
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-8 border-b border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-cyan-300 font-medium">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
                {job.type}
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Job Description
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg
                className="w-7 h-7 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Apply for this role
            </h2>
          </div>

          <div className="p-8">
            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  submitMessage.startsWith("Error")
                    ? "bg-red-500/20 border-red-500/30 text-red-300"
                    : "bg-green-500/20 border-green-500/30 text-green-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  {submitMessage.startsWith("Error") ? (
                    <svg
                      className="w-5 h-5 text-red-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  <span className="font-medium">{submitMessage}</span>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-white"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-white"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium text-white"
                  >
                    Phone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 font-medium text-white"
                  >
                    Location *
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.location
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                    placeholder="City, State/Country"
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="linkedin_url"
                    className="block mb-2 font-medium text-white"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    value={form.linkedin_url}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.linkedin_url
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                  />
                  {errors.linkedin_url && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.linkedin_url}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="github_url"
                    className="block mb-2 font-medium text-white"
                  >
                    GitHub URL
                  </label>
                  <input
                    id="github_url"
                    name="github_url"
                    type="url"
                    placeholder="https://www.github.com/yourusername"
                    value={form.github_url}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.github_url
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
                  />
                  {errors.github_url && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.github_url}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="resume"
                  className="block mb-2 font-medium text-white"
                >
                  Resume (PDF only) *
                </label>
                <div className="relative">
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    required
                    accept=".pdf"
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.resume
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-600 focus:ring-cyan-500"
                    } rounded-lg px-4 py-3 bg-white/5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:font-medium hover:file:bg-cyan-700 focus:outline-none focus:ring-2 transition-all duration-200`}
                  />
                </div>
                {errors.resume && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {errors.resume}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium text-white"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write a message or cover letter (optional)"
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full md:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-105 hover:shadow-xl"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
