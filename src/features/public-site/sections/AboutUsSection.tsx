import LogoOnly from "../../../assets/images/logo_only.png";
import arrivalYearbook from "../../../assets/images/arrival-yearbook.jpg";
import presentationYearbook from "../../../assets/images/presentation-yearbook.jpg";
import blazerLogo from "../../../assets/images/logo_only.png";

interface TeamImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

function AboutUsSection() {
  const teamImages: TeamImage[] = [
    {
      id: 1,
      title:
        "The University President receives the first copy of the Blazer 2025 Yearbook!",
      description:
        "Arrival and Presentation of the Blazer 2025 Yearbook and Frames to the University President of Central Mindanao University.",
      imageUrl: arrivalYearbook,
    },
    {
      id: 2,
      title: "Yearbook Distribution Day",
      description: "The Blazer 2025 with teh University President",
      imageUrl: presentationYearbook,
    },
  ];

  return (
    <section id="about" className="relative">
      <div className="bg-gray-50 pt-24 pb-20 px-6 relative z-20">
        <div
          className="absolute top-10 right-10 w-16 h-16 sm:w-30 sm:h-30 opacity-90 hover:opacity-40 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${blazerLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        ></div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-8">
              <div className="w-16 h-1 bg-[#024334]/30 mx-auto mb-6"></div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#024334] mb-6 font-libre-baskerville tracking-tight">
                ABOUT US
              </h2>
              <div className="w-16 h-1 bg-[#024334]/30 mx-auto"></div>
            </div>
            <p className="text-gray-700 text-lg sm:text-xl font-poppins leading-relaxed max-w-4xl mx-auto">
              The Blazer is the official yearbook publication of Central
              Mindanao University, dedicated to capturing and preserving the
              memorable moments of our academic community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {teamImages.map((image) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] `}
              >
                <div className="aspect-[4/3] bg-gray-200">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <img
                            src={LogoOnly}
                            alt="Blazer Logo"
                            className="w-6 h-6"
                          />
                        </div>
                        <div>
                          <p className="font-poppins font-bold text-sm">
                            THE BLAZER
                          </p>
                          <p className="text-xs font-poppins opacity-80">
                            CREATIVITY. CRAFT. CHARACTER
                          </p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg font-libre-baskerville mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm font-poppins mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#024334] mb-4 font-libre-baskerville">
                Goals and Objectives
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed">
                The Blazer, as the official yearbook publication of Central Mindanao University, 
                will provide aid to the senior students in terms of their yearbook and pictorial that serves as a commemoration of their journey in the institution.
              </p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#024334] mb-4 font-libre-baskerville">
                Our Mission
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed">
                To produce, to serve, to listen to criticisms, to assist, to-accept general concerns and suggestions, and to ameliorate in the production of yearbooks 
                and frames of the senior students that give honor and legacy to the name of Central Mindanao University in terms of creativity, craft, and character.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#024334] mb-4 font-libre-baskerville">
                Our Vision
              </h3>
              <p className="text-gray-600 font-poppins leading-relaxed">
                A high service in terms of quality in the university yearbook publication that conforms to the production and development that contributes to the representation
                of Central Mindanao University in the Philippines 
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
