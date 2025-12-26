import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const canvasRef = useRef();
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade-in animation on scroll using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let nodes = [];
    const maxNodes = 150;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createNode = (x, y) => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: 2 + Math.random() * 2,
    });

    const addNodes = (count = 5) => {
      for (let i = 0; i < count; i++) {
        nodes.push(
          createNode(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
        if (nodes.length > maxNodes) nodes.shift();
      }
    };

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.strokeStyle = "#10b981";

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(node.x - nodes[j].x, node.y - nodes[j].y);
          if (dist < 100) {
            ctx.globalAlpha = 1 - dist / 100;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      requestAnimationFrame(drawNetwork);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointerdown", () => addNodes(10));
    addNodes(30);
    drawNetwork();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-24 overflow-hidden transition-all duration-700 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white`}
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      {/* Left Content */}
      <div className="md:w-1/2 w-full text-center md:text-left space-y-8 z-10">
        <h1 className="text-sm font-semibold text-green-400 tracking-widest uppercase">
          About Us
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold leading-snug">
          Connecting Ideas. Empowering Businesses.
        </h2>

        <p className="text-lg text-gray-300 leading-relaxed">
          At <span className="text-green-400 font-semibold">Scifyx</span>, we
          believe innovation isn’t just about technology — it’s about making
          business simpler, faster, and smarter. Our{" "}
          <span className="text-green-400 font-semibold">
            config-driven approach
          </span>{" "}
          allows organizations to adapt quickly, minimize development cycles,
          and deliver customized solutions that truly scale with business goals.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          From digital transformation to intelligent automation, we help
          enterprises connect the dots between people, process, and performance.
        </p>

        <button
          onClick={() =>
            document
              .getElementById("contact")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="mt-4 px-8 py-3 bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform duration-300 text-white font-semibold rounded-md shadow-lg"
        >
          Get in Touch
        </button>
      </div>

      {/* Right Visual Canvas */}
      <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] mt-12 md:mt-0 flex justify-center items-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      {/* 
      Bottom Indicator
      <a
        href="#portfolio"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-green-400 hover:text-green-500 transition"
      >
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a> */}
    </section>
  );
};

export default About;
