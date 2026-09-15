  import { useState } from "react";

  //TODO replace actualy previous years
  const yearbook2022 = "/api/placeholder/200/280";
  const yearbook2023 = "/api/placeholder/200/280";
  const yearbook2024 = "/api/placeholder/200/280";
  const yearbook2025 = "/api/placeholder/200/280";

  interface YearbookData {
    year: string;
    coverImage: string;
    description: string;
    theme: string;
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
  }

  function YearbookSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const yearbooks: YearbookData[] = [
      {
        year: "2025",
        coverImage: yearbook2025,
        description: "Flourish, Wander, Become.",
        theme: "Viridescence",
        colorScheme: {
          primary: "#064e3b",
          secondary: "#059669",
          accent: "#10b981",
        },
      },
      {
        year: "2024",
        coverImage: yearbook2024,
        description: "Wala akong nahanap",
        theme: "bukidnon theme??",
        colorScheme: {
          primary: "#1e40af",
          secondary: "#3b82f6",
          accent: "#60a5fa",
        },
      },
      {
        year: "2023",
        coverImage: yearbook2023,
        description: "Unleash the Magic of Memories",
        theme: "Unsay theme Phoenix??",
        colorScheme: {
          primary: "#6e0202",
          secondary: "#b51112",
          accent: "#db221c",
        },
      },
      {
        year: "2022",
        coverImage: yearbook2022,
        description:
          "We are on our way, encapsulates our patience in waiting for our winning moment.",
        theme: "EN ROUTE",
        colorScheme: {
          primary: "#000000",
          secondary: "#2b2a2c",
          accent: "#2b2a2c",
        },
      },
    ];

    const currentYearbook = yearbooks[currentIndex];

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % yearbooks.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + yearbooks.length) % yearbooks.length);
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    return (
      <section id="services" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100"></div>

        <div className="bg-stone-100 pt-16 pb-10 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#024334] mb-2 font-libre-baskerville tracking-tight">
                YEARBOOK AND FRAMES
              </h2>
              <p className="text-[#024334] text-sm font-poppins">
                Throughout the years...
              </p>
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 z-20 transform translate-x-4 -translate-y-4">
                <div className="relative">
                  <img
                    src={currentYearbook.coverImage}
                    alt={`${currentYearbook.year} Yearbook Cover`}
                    className="w-16 h-20 sm:w-20 sm:h-28 md:w-28 md:h-36 object-cover rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-lg"></div>
                </div>
              </div>

              <div
                className="relative rounded-3xl p-6 sm:p-8 md:p-10 min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-between overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                  backgroundColor: currentYearbook.colorScheme.primary,
                  background: `linear-gradient(135deg, ${currentYearbook.colorScheme.primary} 0%, ${currentYearbook.colorScheme.secondary} 100%)`,
                }}
              >
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 2px, transparent 2px), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px, 40px 40px",
                    }}
                  ></div>
                </div>
                <div className="relative z-10">
                  <div className="inline-block mb-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold font-poppins tracking-[0.05em]">
                      {currentYearbook.theme}
                    </span>
                  </div>

                  <p className="text-white/90 text-sm sm:text-base font-poppins max-w-md">
                    {currentYearbook.description}
                  </p>
                </div>

                <div className="relative z-10 text-right">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-libre-baskerville tracking-tight opacity-90">
                    {currentYearbook.year}
                  </h3>
                </div>

                <div className="relative z-10 flex justify-between items-center mt-5">
                  <button className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 text-sm rounded-full font-poppins font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30">
                    More...
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className="w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                      aria-label="Previous yearbook"
                    >
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                      aria-label="Next yearbook"
                    >
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5 gap-2">
                {yearbooks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
                      index === currentIndex
                        ? "bg-gray-900 scale-125"
                        : "bg-gray-400 hover:bg-gray-600 hover:scale-110"
                    }`}
                    aria-label={`Go to ${yearbooks[index].year} yearbook`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 font-libre-baskerville">
                  Past Yearbooks
                </h3>
                <p className="text-gray-600 text-sm font-poppins">
                  Browse through our collection of previous yearbooks from past
                  years
                </p>
              </div>

              <div className="text-center">
                <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 font-libre-baskerville">
                  Previous Frames
                </h3>
                <p className="text-gray-600 text-sm font-poppins">
                  Discover timeless frames that capture moments from past years.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-16 bg-gradient-to-b from-stone-100 to-transparent overflow-hidden">
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 1000 128"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient
                  id="greenGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#024334" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#059669" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M0,64 C200,32 300,96 500,64 C700,32 800,96 1000,64 L1000,128 L0,128 Z"
                fill="url(#greenGradient)"
              />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  export default YearbookSection;