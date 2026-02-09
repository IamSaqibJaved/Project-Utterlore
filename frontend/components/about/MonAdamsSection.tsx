"use client";

interface CardItem {
  icon?: string; // Image URL
  text: string;
  gradient?: string; // Background gradient/color for icon
}

interface MonAdamsSectionProps {
  className?: string;
  // Content
  name?: string;
  title?: string;
  bio?: string;
  image?: string;
  backgroundImage?: string;
  quote?: string;
  layout?: "image-left" | "image-right" | "centered";
  cards?: CardItem[];
  // Color customization
  headingColor?: string;
  bioColor?: string;
  cardTextColor?: string;
  cardBackgroundColor?: string;
  cardBorderColor?: string;
  quoteColor?: string;
}

export default function MonAdamsSection({
  className = "",
  name = "MON ADAMS",
  title,
  bio = "Mon Adams is a passionate writer and entrepreneur, driven by a desire to simplify the lifestyle of her readers and customers alike. She dreams of creating and providing articles that not only educate, but also genuinely improve people's lives. When she's not penning e-books on popular topics, you'll find her brainstorming novel ways to elevate businesses, connect entities and support audiences. Mon's commitments and her kind-hearted personality are deeply rooted in her writing and endeavours. She has an ultimate purpose – to succeed making a positive impact on the world.",
  image = "/assets/images/mon-adams.png",
  backgroundImage = "/assets/images/mon-adams-back.png",
  quote = "PURPOSEFUL BY DESIGN",
  cards,
  headingColor = "#000",
  bioColor = "#212121",
  cardTextColor = "#1C1917",
  cardBackgroundColor = "#FFF",
  cardBorderColor = "rgba(231, 229, 228, 0.50)",
  quoteColor = "#000",
}: MonAdamsSectionProps) {
  const defaultCards: CardItem[] = cards || [
    {
      icon: "/assets/images/skincare_monadams.png",
      text: "Skincare that works",
      gradient: "linear-gradient(135deg, #FCE7F3 0%, #FCCEE8 100%)",
    },
    {
      icon: "/assets/images/premium-quality_mon-adams.png",
      text: "Home essentials",
      gradient: "linear-gradient(135deg, #FEF3C6 0%, #FEE685 100%)",
    },
    {
      icon: "/assets/images/light-bulb_monadams.png",
      text: "Tech that blends in",
      gradient: "linear-gradient(135deg, #E0E7FF 0%, #C6D2FF 100%)",
    },
    {
      icon: "/assets/images/fashion_monadams.png",
      text: "Fashion that lasts",
      gradient: "linear-gradient(135deg, #F3E8FF 0%, #E9D4FF 100%)",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className={`w-full bg-white py-16 md:py-20 min-[1300px]:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex justify-center">
          <div className="flex flex-col min-[1300px]:flex-row justify-between items-start gap-5 min-[1300px]:gap-5 w-full max-w-[1159px]">
            {/* Left Side - Content */}
            <div className="flex flex-col items-start gap-6 md:gap-8 min-[1300px]:gap-[38px] w-full min-[1300px]:w-[718px] min-[1300px]:flex-shrink-0 order-1 min-[1300px]:order-1">
              {/* Heading */}
              <div className="flex flex-col w-full min-[1300px]:w-[515px] gap-1">
                {name && (
                  <h2
                    className="text-left"
                    style={{
                      color: headingColor,
                      fontFamily: "var(--font-bona-nova)",
                      fontSize: "clamp(28px, 5vw, 44px)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    {name.toUpperCase()}
                  </h2>
                )}
                {title && (
                  <p
                    className="text-left"
                    style={{
                      color: bioColor,
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(14px, 2vw, 16px)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      marginTop: "8px",
                    }}
                  >
                    {title}
                  </p>
                )}
              </div>

              {/* Description */}
              {bio && (
                <p
                  className="w-full"
                  style={{
                    color: bioColor,
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(16px, 2.5vw, 18px)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    textAlign: "justify",
                  }}
                >
                  {bio}
                </p>
              )}

              {/* Cards Section */}
              {displayCards.length > 0 && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 min-[1300px]:gap-8 lg:gap-8 w-full items-stretch">
                  {displayCards.map((card, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-start gap-2.5 p-4 md:p-6 flex-1 min-w-[150px] sm:min-w-[calc(50%-16px)] min-[1300px]:min-w-0 lg:min-w-0"
                      style={{
                        borderRadius: "14px",
                        border: `0.667px solid ${cardBorderColor}`,
                        background: cardBackgroundColor,
                        boxShadow: "0 1px 2px -1px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {/* Icon Container */}
                      {card.icon && (
                        <div className="flex w-12 h-12 md:w-14 md:h-14 justify-center items-center flex-shrink-0">
                          {/* Icon Background Circle */}
                          <div
                            className="relative flex-shrink-0 flex justify-center items-center"
                            style={{
                              width: "clamp(40px, 4vw, 48px)",
                              height: "clamp(40px, 4vw, 48px)",
                              aspectRatio: "1/1",
                              borderRadius: "22369600px",
                              background: card.gradient || "transparent",
                            }}
                          >
                            <div
                              className="flex-shrink-0"
                              style={{
                                width: "clamp(24px, 3vw, 32px)",
                                height: "clamp(24px, 3vw, 32px)",
                                backgroundImage: `url(${card.icon})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Card Description */}
                      <p
                        className="w-full"
                        style={{
                          color: cardTextColor,
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(14px, 2vw, 16px)",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                        }}
                      >
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Images */}
            <div className="relative flex flex-col items-center min-[1300px]:items-end gap-0 w-full min-[1300px]:w-[435px] min-[1300px]:h-[496px] flex-shrink-0 order-2 min-[1300px]:order-2 mt-8 min-[1300px]:mt-0 min-[1300px]:ml-8 min-[1300px]:translate-x-8">
              {/* Wrapper to maintain proportional positioning */}
              <div 
                className="relative w-full"
                style={{
                  width: "clamp(280px, 80vw, 435px)",
                  height: "clamp(280px, 80vw, 435px)",
                }}
              >
                {/* Background Image (mon-adams-back) - bottom layer */}
                {backgroundImage && (
                  <div
                    className="absolute z-[1]"
                    style={{
                      width: "81.15%", // 353/435
                      height: "81.15%",
                      aspectRatio: "1/1",
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "50%",
                      backgroundRepeat: "no-repeat",
                      bottom: "32.18%", // 140/435
                      left: "-16.09%", // -70/435
                    }}
                  />
                )}

                {/* Background Circle (between first and top image) */}
                <div
                  className="absolute z-[2]"
                  style={{
                    width: "48.99%", // 213.112/435
                    height: "81.76%", // 355.639/435
                    borderRadius: "135.74px",
                    background: "#EFEEE9",
                    top: "18.39%", // 80/435
                    right: "25.52%", // 111/435
                  }}
                />

                {/* Main Image (mon-adams) - top layer */}
                {image && (
                  <div
                    className="relative w-full h-full"
                    style={{
                      aspectRatio: "1/1",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "50%",
                      backgroundRepeat: "no-repeat",
                      zIndex: 3,
                    }}
                  />
                )}
              </div>

              {/* Title below images */}
              {quote && (
                <div className="w-full max-w-[195.466px] mt-5 relative z-[4] mx-auto">
                  <p
                    className="text-center"
                    style={{
                      color: quoteColor,
                      fontFamily: "var(--font-bona-nova)",
                      fontSize: "clamp(18px, 3vw, 22px)",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      textTransform: "uppercase",
                    }}
                  >
                    {quote.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

