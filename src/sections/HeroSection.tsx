import React from "react";

import cmuOnly from "../assets/images/cmu-2.jpeg";
import LogoOnly from "../assets/images/logo_only.png";

function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 88;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 bg-gray-200"
        style={{
          backgroundImage: `url(${cmuOnly})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/80 to-white/70 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex justify-center mb-4 animate-fade-in">
          <img
            src={LogoOnly}
            alt="The Blazer Logo"
            className="h-32 w-auto sm:h-40 md:h-48 drop-shadow-[0_10px_20px_rgba(2,67,52,0.3)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="text-[#024334] text-sm sm:text-lg md:text-xl tracking-widest mb-6 font-libre-baskerville uppercase animate-fade-in-up opacity-80">
          Creativity. Craft. Character
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-libre-baskerville font-bold text-[#024334] mb-6 tracking-tight drop-shadow-[0_4px_8px_rgba(2,67,52,0.25)] animate-fade-in-up leading-tight">
          THE BLAZER
        </h1>

        <p className="text-[#024334] text-sm sm:text-base md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed font-libre-baskerville animate-fade-in-up">
          The Official Yearbook Publication of Central Mindanao University
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <button
            onClick={() => scrollToSection("services")}
            className="group bg-[#024334] hover:bg-[#08795F] text-white px-8 py-4 rounded-full font-poppins font-semibold text-sm tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#024334]/30 min-w-[160px]"
            aria-label="Get started with The Blazer"
          >
            <span className="flex items-center justify-center gap-2">
              GET STARTED
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </span>
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="group bg-white/90 backdrop-blur-sm hover:bg-white text-[#024334] px-8 py-4 rounded-full font-poppins font-semibold text-sm tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50 border border-[#024334]/20 min-w-[160px]"
            aria-label="Explore more about The Blazer"
          >
            <span className="flex items-center justify-center gap-2">
              EXPLORE MORE
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#024334]/20 to-transparent z-5"></div>
    </section>
  );
}

export default HeroSection;
