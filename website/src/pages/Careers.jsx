"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { getRequest } from "../service/ApiService";

const truncate = (text, maxLength) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-emerald-200/30 border-t-emerald-400 rounded-full animate-spin"></div>
      <div
        className="w-12 h-12 border-4 border-transparent border-t-emerald-300 rounded-full animate-spin absolute top-2 left-2"
        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
      ></div>
    </div>
    <p className="text-emerald-300 mt-6 text-lg font-medium animate-pulse">
      Loading amazing opportunities...
    </p>
    <div className="flex space-x-1 mt-2">
      <div
        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
      <span className="material-icons" style={{ color: "red", fontSize: 40 }}>
        warning_amber
      </span>
    </div>
    <h3 className="text-xl font-semibold text-red-400 mb-2">
      Oops! Something went wrong
    </h3>
    <p className="text-red-300 text-center mb-6 max-w-md">
      We couldn't load the job openings right now. Please check your connection
      and try again.
    </p>
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
      <svg
        className="w-12 h-12 text-emerald-400"
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
    </div>
    <h3 className="text-xl font-semibold text-emerald-300 mb-2">
      No Openings Right Now
    </h3>
    <p className="text-emerald-200 text-center max-w-md">
      We don't have any job openings at the moment, but great opportunities are
      coming soon! Check back later.
    </p>
  </div>
);

const Careers = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const json = await getRequest(config.ENDPOINTS.CAREERS);
      console.log(json);

      if (Array.isArray(json.data)) {
        setJobOpenings(json.data.slice(0, 3)); // only top 3 jobs
      } else {
        setJobOpenings([]);
        console.warn("Unexpected API format, 'data' is not an array:", json);
      }
    } catch (error) {
      console.error("Error loading jobs:", error.message);
      setError(error.message);
      setJobOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section
      id="careers"
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white px-6 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-sm text-emerald-300 uppercase tracking-widest font-medium">
          Join Us
        </h2>
        <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mt-2 mb-4">
          Careers
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 mx-auto mb-6 rounded-full"></div>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Explore exciting opportunities to grow with us and shape the future of
          innovation.
        </p>
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        {loading && <LoadingSpinner />}
        {error && <ErrorState onRetry={fetchJobs} />}
        {!loading && !error && jobOpenings.length === 0 && <EmptyState />}

        {!loading && !error && jobOpenings.length > 0 && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className="group bg-white/5 backdrop-blur-xl border border-emerald-300/20 rounded-2xl p-8 hover:bg-white/10 hover:border-emerald-300/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-icons">school</span>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-medium">
                    {job.type}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {job.title}
                </h4>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-emerald-200">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    <span className="text-sm font-medium">{job.location}</span>
                  </div>
                </div>

                <p className="text-emerald-100 mb-8 leading-relaxed flex-grow">
                  {job.description.length > 120 ? (
                    <>
                      {job.description.slice(0, 120)}...
                      <Link
                        to={`/careers/${job.id}`}
                        className="text-emerald-400 hover:text-emerald-300 ml-1 underline font-medium transition-colors duration-200"
                      >
                        Read More
                      </Link>
                    </>
                  ) : (
                    job.description
                  )}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/careers/${job.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 group"
                  >
                    Apply Now
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg
          className="w-full h-24 text-emerald-900"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,160L1440,288L1440,320L0,320Z" />
        </svg>
      </div>

      {/* Arrow to Contact Section */}
      <div className="absolute bottom-0 left-0 w-full">
        <a href="#contact">
          <svg
            className="w-full h-16 text-emerald-50 hover:opacity-80 transition"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path d="M0,160L1440,32L1440,320L0,320Z"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Careers;
