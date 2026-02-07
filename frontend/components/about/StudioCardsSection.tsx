"use client";

interface StudioCardsSectionProps {
  className?: string;
}

export default function StudioCardsSection({
  className = "",
}: StudioCardsSectionProps) {
  return (
    <section
      className={`w-full bg-white py-16 md:py-20 min-[1300px]:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1245px] gap-6">
            {/* First Card */}
            <div
              className="flex justify-center lg:justify-end items-center rounded-[14px] overflow-hidden relative w-full"
              style={{
                minHeight: "180px",
                padding: "clamp(24px, 4vw, 45px) clamp(20px, 3vw, 36px)",
                backgroundImage:
                  "url(/assets/images/cardbackground.jpg), #391A5C",
                backgroundSize: "cover, cover",
                backgroundPosition: "50%, center",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundColor: "#391A5C",
              }}
            >
              {/* Overlay for color blend */}
              <div
                className="absolute inset-0 rounded-[14px]"
                style={{
                  backgroundColor: "#391A5C",
                  opacity: 0.7,
                  zIndex: 0,
                }}
              />
              <div className="relative z-10 flex justify-center lg:justify-end items-center w-full h-full">
                <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 w-full">
                  {/* Text Content */}
                  <p
                    className="text-center lg:text-left"
                    style={{
                      color: "#FFF",
                      fontFamily: "var(--font-bona-nova)",
                      fontSize: "clamp(18px, 3vw, 22px)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "1.3",
                    }}
                  >
                    Explore our Studios at your own pace
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                    <button
                      className="flex justify-center items-center gap-2.5 rounded-full bg-white hover:opacity-90 transition-opacity px-4 sm:px-6 py-2 sm:py-2.5"
                      style={{
                        color: "#1C1917",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "clamp(12px, 2vw, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Publishing Studio
                    </button>
                    <button
                      className="flex justify-center items-center gap-2.5 rounded-full bg-white hover:opacity-90 transition-opacity px-4 sm:px-6 py-2 sm:py-2.5"
                      style={{
                        color: "#1C1917",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "clamp(12px, 2vw, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      Digital Studio
                    </button>
                    <button
                      className="flex justify-center items-center gap-2.5 rounded-full bg-white hover:opacity-90 transition-opacity px-4 sm:px-6 py-2 sm:py-2.5"
                      style={{
                        color: "#1C1917",
                        fontSize: "clamp(12px, 2vw, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-brunella)",
                          fontSize: "clamp(14px, 2.5vw, 16px)",
                        }}
                      >
                        FlexiBrez
                      </span>
                      <span style={{ fontFamily: "Arial, sans-serif" }}>
                        {""}Studio
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Card */}
            <div
              className="flex flex-col justify-center items-center lg:items-start gap-4 rounded-[14px] w-full"
              style={{
                minHeight: "180px",
                padding: "clamp(24px, 3vw, 30px) clamp(20px, 3vw, 32px)",
                background: "linear-gradient(135deg, #EEDEFF 0%, #F5F5F4 100%)",
              }}
            >
              {/* Text Content */}
              <p
                className="text-center lg:text-left"
                style={{
                  color: "#1C1917",
                  fontFamily: "var(--font-bona-nova)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.3",
                }}
              >
                Connect with the Utter Lore community
              </p>

              {/* Button */}
              <button
                className="flex justify-center items-center gap-2.5 rounded-full bg-[#1C1917] hover:opacity-90 transition-opacity px-4 sm:px-6 py-2 sm:py-2.5"
                style={{
                  color: "#FFF",
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(12px, 2vw, 14px)",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                Join the Community Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
