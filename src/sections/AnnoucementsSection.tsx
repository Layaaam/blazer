// import blazer2025 from "../assets/images/blazer-2025.jpg";
// import blazerLogo from "../assets/images/blazer_logo_white.png";
// import React, { useState } from "react";

// // TypeScript interfaces
// interface Announcement {
//   id: number;
//   title: string;
//   date: string;
//   category: string;
//   excerpt: string;
//   content: string;
//   readTime: string;
// }

// function AnnouncementsSection() {
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);

//   const announcements: Announcement[] = [
//     {
//       id: 1,
//       title: "Blazer 2026 Theme Announcement",
//       date: "July 15, 2025",
//       category: "Theme",
//       excerpt: "We're excited to announce this year's yearbook theme: 'Eyyy'",
//       content:
//         "Lorem ipsum dolor sit amet consectetur. Vulputate enim nunc diam ultrices lorem faucibus nunc etiam consequat. Eget etiam egestas egestas dolor dictum molestie nunc. Diam odio aliquet magna ultrices ac. Sed ullamcorper nunc cursus a ac egestas cursus senectus sagittis.",
//       readTime: "2 min read",
//     },
//     {
//       id: 2,
//       title: "Graduation Pictorial Schedule",
//       date: "July 10, 2025",
//       category: "Schedule",
//       excerpt: "Extension? Heck nah",
//       content:
//         "Lorem ipsum dolor sit amet consectetur. Vulputate enim nunc diam ultrices lorem faucibus nunc etiam consequat. Eget etiam egestas egestas dolor dictum molestie nunc.",
//       readTime: "3 min read",
//     },
//     {
//       id: 3,
//       title: "Senior Quote Guidelines Updated",
//       date: "July 5, 2025",
//       category: "Guidelines",
//       excerpt:
//         "Please review the updated guidelines for senior quotes. Basa basa sad",
//       content:
//         "Lorem ipsum dolor sit amet consectetur. Vulputate enim nunc diam ultrices lorem faucibus nunc etiam consequat. Eget etiam egestas egestas dolor dictum molestie nunc. Diam odio aliquet magna ultrices ac.",
//       readTime: "1 min read",
//     },
//   ];

//   const toggleExpanded = (id: number) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   return (
//     <section
//       id="announcements"
//       className="bg-[#024334] py-20 px-4 sm:px-6 relative overflow-hidden"
//       aria-label="Announcements"
//     >
//       <div
//         className="absolute inset-0 transform scale-105"
//         style={{
//           backgroundImage: `url(${blazer2025})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-[#024334]/90 to-[#024334]/70 backdrop-blur-[2px]"></div>
//       </div>

//       <div
//         className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 opacity-90 hover:opacity-40 transition-opacity duration-300"
//         style={{
//           backgroundImage: `url(${blazerLogo})`,
//           backgroundSize: "contain",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//         }}
//         aria-hidden="true"
//       ></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <header className="text-center mb-16">
//           <div className="inline-block mb-4">
//             <div className="w-16 h-1 bg-white/40 mx-auto mb-6"></div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-libre-baskerville tracking-tight">
//               ANNOUNCEMENTS
//             </h2>
//             <div className="w-16 h-1 bg-white/40 mx-auto mb-6"></div>
//           </div>
//           <p className="text-white/90 text-lg sm:text-xl font-poppins max-w-2xl mx-auto leading-relaxed">
//             Stay updated with the latest news from The Blazer team
//           </p>
//         </header>

//         <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//           {announcements.map((announcement) => (
//             <article
//               key={announcement.id}
//               className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-white/20"
//             >
//               <div className="p-6 pb-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#024334]/10 text-[#024334]">
//                     {announcement.category}
//                   </span>
//                   <time
//                     className="text-sm text-gray-500 font-poppins"
//                     dateTime={announcement.date}
//                   >
//                     {announcement.date}
//                   </time>
//                 </div>

//                 <h3 className="text-xl sm:text-2xl font-bold text-[#024334] mb-3 font-libre-baskerville leading-tight group-hover:text-[#08795F] transition-colors line-clamp-2">
//                   {announcement.title}
//                 </h3>

//                 <p className="text-gray-700 leading-relaxed font-poppins text-sm sm:text-base mb-4 line-clamp-3">
//                   {announcement.excerpt}
//                 </p>
//               </div>

//               {expandedCard === announcement.id && (
//                 <div className="px-6 pb-4 border-t border-gray-100">
//                   <p className="text-gray-600 font-poppins text-sm leading-relaxed mt-4">
//                     {announcement.content}
//                   </p>
//                 </div>
//               )}

//               <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => toggleExpanded(announcement.id)}
//                     className="text-[#024334] font-semibold font-poppins hover:text-[#08795F] transition-colors duration-200 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#024334]/30 rounded-lg px-2 py-1"
//                     aria-expanded={expandedCard === announcement.id}
//                     aria-controls={`announcement-${announcement.id}-content`}
//                   >
//                     {expandedCard === announcement.id
//                       ? "Read Less"
//                       : "Read More"}
//                     <svg
//                       className={`w-4 h-4 transform transition-transform ${
//                         expandedCard === announcement.id
//                           ? "rotate-180"
//                           : "group-hover:translate-x-1"
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       {expandedCard === announcement.id ? (
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 15l7-7 7 7"
//                         />
//                       ) : (
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5l7 7-7 7"
//                         />
//                       )}
//                     </svg>
//                   </button>

//                   <div className="flex items-center gap-2 text-gray-400">
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//                     </svg>
//                     <span className="text-xs font-poppins">
//                       {announcement.readTime}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         <div className="text-center mt-16">
//           <button className="group bg-white hover:bg-[#f8f9fa] text-[#024334] px-8 sm:px-10 py-4 rounded-full font-poppins tracking-[0.05em] font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-transparent hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/30">
//             <span className="flex items-center gap-3">
//               View All Announcements
//               <svg
//                 className="w-5 h-5 transition-transform group-hover:translate-y-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AnnouncementsSection;

import blazer2025 from "../assets/images/blazer-2025.jpg";
import blazerLogo from "../assets/images/blazer_logo_white.png";
import { useState, useEffect } from "react";
import { useAnnouncementStore } from "../store/AnnouncementStore";

function AnnouncementsSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const { announcements, isLoading, error, fetchAnnouncements, clearError } =
    useAnnouncementStore();

  // Fetch announcements when component mounts
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hour(s) ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays === 1) return "1 day ago";
      return `${diffInDays} days ago`;
    }
  };

  const displayedAnnouncements = announcements.slice(0, 3);

  return (
    <section
      id="announcements"
      className="bg-[#024334] py-20 px-4 sm:px-6 relative overflow-hidden"
      aria-label="Announcements"
    >
      <div
        className="absolute inset-0 transform scale-105"
        style={{
          backgroundImage: `url(${blazer2025})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#024334]/90 to-[#024334]/70 backdrop-blur-[2px]"></div>
      </div>

      <div
        className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 opacity-90 hover:opacity-40 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${blazerLogo})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-white/40 mx-auto mb-6"></div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-libre-baskerville tracking-tight">
              ANNOUNCEMENTS
            </h2>
            <div className="w-16 h-1 bg-white/40 mx-auto mb-6"></div>
          </div>
          <p className="text-white/90 text-lg sm:text-xl font-poppins max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news from The Blazer team
          </p>
        </header>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="mt-4 text-white/90 font-poppins">
                Loading announcements...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white font-poppins">
                  Failed to load announcements
                </p>
                <p className="text-white/80 text-sm font-poppins">{error}</p>
              </div>
              <button
                onClick={() => {
                  clearError();
                  fetchAnnouncements();
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-poppins font-semibold transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {displayedAnnouncements.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                  No Announcements Yet
                </h3>
                <p className="text-white/80 font-poppins">
                  Check back later for updates from The Blazer team.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {displayedAnnouncements.map((announcement) => (
                  <article
                    key={announcement.id}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-white/20"
                  >
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#024334]/10 text-[#024334]">
                          {announcement.category}
                        </span>
                        <div className="text-right">
                          <time
                            className="text-sm text-gray-500 font-poppins block"
                            dateTime={announcement.created_at}
                          >
                            {formatDate(announcement.created_at)}
                          </time>
                          <span className="text-xs text-gray-400 font-poppins">
                            {getTimeAgo(announcement.created_at)}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#024334] mb-3 font-libre-baskerville leading-tight group-hover:text-[#08795F] transition-colors line-clamp-2">
                        {announcement.title}
                      </h3>

                      <p className="text-gray-700 leading-relaxed font-poppins text-sm sm:text-base mb-4 line-clamp-3">
                        {announcement.excerpt}
                      </p>

                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <div className="w-6 h-6 bg-[#024334]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#024334] text-xs font-semibold">
                            {announcement.author_name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-poppins">
                          By {announcement.author_name}
                        </span>
                      </div>
                    </div>

                    {expandedCard === announcement.id && (
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <div className="mt-4 prose prose-sm max-w-none">
                          <p className="text-gray-600 font-poppins text-sm leading-relaxed whitespace-pre-line">
                            {announcement.content}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => toggleExpanded(announcement.id)}
                          className="text-[#024334] font-semibold font-poppins hover:text-[#08795F] transition-colors duration-200 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#024334]/30 rounded-lg px-2 py-1"
                          aria-expanded={expandedCard === announcement.id}
                          aria-controls={`announcement-${announcement.id}-content`}
                        >
                          {expandedCard === announcement.id
                            ? "Read Less"
                            : "Read More"}
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              expandedCard === announcement.id
                                ? "rotate-180"
                                : "group-hover:translate-x-1"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {expandedCard === announcement.id ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            )}
                          </svg>
                        </button>

                        <div className="flex items-center gap-2 text-gray-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span className="text-xs font-poppins">
                            {announcement.read_time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {announcements.length > 3 && (
              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    // TODO: Navigate to full announcements page or show all
                    console.log("View all announcements");
                  }}
                  className="group bg-white hover:bg-[#f8f9fa] text-[#024334] px-8 sm:px-10 py-4 rounded-full font-poppins tracking-[0.05em] font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-transparent hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  <span className="flex items-center gap-3">
                    View All Announcements ({announcements.length})
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default AnnouncementsSection;
