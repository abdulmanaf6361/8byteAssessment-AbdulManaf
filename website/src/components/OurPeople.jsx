"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { config } from "../config";
import { getRequest } from "../service/ApiService";

export const PeopleButton = () => (
  <a
    href="#people"
    className="inline-block px-6 py-3 bg-gradient-to-r from-[#a4ccd9] to-[#6ca0b8] text-[#2c3e50] font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm"
  >
    Meet the Team
  </a>
);

const PersonSkeleton = () => (
  <div className="group flex flex-col items-center animate-pulse">
    <div className="relative rounded-full w-36 h-36 bg-gradient-to-br from-[#a4ccd9]/30 to-[#6ca0b8]/30 border-4 border-[#a4ccd9]/50 backdrop-blur-sm">
      <div className="absolute inset-4 rounded-full bg-[#a4ccd9]/20"></div>
    </div>
    <div className="mt-4 h-5 w-24 bg-[#a4ccd9]/30 rounded-full"></div>
    <div className="mt-2 h-4 w-20 bg-[#51768e]/20 rounded-full"></div>
  </div>
);

// const LoadingSpinner = () => (
//   <div className="flex flex-col items-center justify-center py-20">
//     <div className="relative">
//       <div className="w-16 h-16 border-4 border-[#a4ccd9]/30 rounded-full animate-spin border-t-[#6ca0b8]"></div>
//       <div className="absolute inset-2 w-12 h-12 border-4 border-[#6ca0b8]/20 rounded-full animate-spin border-t-[#a4ccd9] animate-reverse"></div>
//     </div>
//     <p className="mt-6 text-[#51768e] font-medium animate-pulse">
//       Loading our amazing team...
//     </p>
//   </div>
// );

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
      We couldn't load right now. Please check your connection
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

const OurPeopleBlue = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setError(null);
      const json = await getRequest(config.ENDPOINTS.PEOPLE);

      const people = Array.isArray(json?.data) ? json.data : [];
      if (!people.length) {
        console.warn("Unexpected API format, 'data' is not an array:", json);
      }

      setPeople(people);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleRetry = () => {
    fetchPeople();
  };

return (
  <section
    id="people"
    className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white px-6 py-24 relative overflow-hidden"
  >
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
    </div>

    {/* Heading */}
    <div className="relative max-w-6xl mx-auto text-center mb-20">
      <h2 className="text-sm uppercase tracking-[0.25em] mb-3 font-bold animate-fade-in">
        Meet Our Team
      </h2>
      <h3 className="text-5xl font-extrabold mb-5 animate-fade-in-up">
        Our People
      </h3>
      <div className="w-24 h-1 bg-gradient-to-r from-[#a4ccd9] to-[#6ca0b8] mx-auto mb-6 rounded-full"></div>
      <p className="text-lg max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delayed">
        The passionate innovators, creators, and leaders driving{" "}
        <span className="font-semibold bg-white/10 px-2 py-1 rounded-lg">
          Scifyx  
        </span>{" "}
        forward.
      </p>
    </div>

    {/* Content */}
    <div className="relative">
      {loading && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto mt-8">
            {[...Array(5)].map((_, idx) => (
              <PersonSkeleton key={idx} />
            ))}
          </div>
        </div>
      )}

      {error && <ErrorState error={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 max-w-6xl mx-auto text-white">
          {people.map(
            ({ id, name, profile_picture, role, linkedin_url }, idx) => (
              <div
                key={id}
                className="group flex flex-col items-center cursor-pointer transform hover:-translate-y-3 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative rounded-full overflow-hidden w-36 h-36 shadow-xl border-4 border-[#a4ccd9] transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:border-[#6ca0b8]">
                  <img
                    src={profile_picture || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <a
                      href={linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-transform hover:scale-110 p-3 rounded-full bg-white/10 border border-white/30"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h4 className="font-bold text-lg">{name}</h4>
                  <p className="text-sm px-3 py-1 rounded-full bg-white/10 mt-2 border border-white/20">
                    {role}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>

    {!loading && !error && (
      <a
        href="#careers"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 p-3 rounded-full bg-white/10 border border-white/20 animate-bounce-gentle"
        aria-label="Scroll down to Careers section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    )}

    <style>{`
      html { scroll-behavior: smooth; }

      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
      @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes bounce-gentle { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }

      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-fade-in { animation: fade-in 1s ease-out; }
      .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
      .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }

      /* FORCE TEXT WHITE DEFAULT */
      #people * { color: white !important; }
    `}</style>
  </section>
);

};

export default OurPeopleBlue;
