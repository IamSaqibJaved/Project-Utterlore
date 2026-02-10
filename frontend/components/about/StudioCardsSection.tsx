"use client";

interface Button {
  text: string;
  link: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  isHighlighted?: boolean;
}

interface StudioCard {
  type: "image-overlay" | "gradient";
  title: string;
  description?: string;
  backgroundColor: string;
  backgroundImage?: string;
  imagePosition?: string;
  overlayOpacity?: number;
  gradientStart?: string;
  gradientEnd?: string;
  gradientAngle?: number;
  titleColor: string;
  titleFontSize: string;
  titleFontFamily: string;
  buttons: Button[];
  minHeight: string;
  padding: string;
  alignment?: string;
}

interface StudioCardsSectionData {
  cards?: StudioCard[];
}

interface StudioCardsSectionProps {
  className?: string;
  data?: StudioCardsSectionData;
}

export default function StudioCardsSection({
  className = "",
  data,
}: StudioCardsSectionProps) {

  const renderCard = (card: StudioCard, index: number) => {
    const isImageOverlay = card.type === "image-overlay";
    const isGradient = card.type === "gradient";

    // Build background styles
    let backgroundStyle: React.CSSProperties = {
      minHeight: card.minHeight,
      padding: card.padding,
      backgroundColor: card.backgroundColor,
    };

    if (isImageOverlay && card.backgroundImage) {
      backgroundStyle.backgroundImage = `url(${card.backgroundImage})`;
      backgroundStyle.backgroundSize = "cover";
      backgroundStyle.backgroundPosition = card.imagePosition || "center";
      backgroundStyle.backgroundRepeat = "no-repeat";
    } else if (isGradient) {
      const angle = card.gradientAngle || 135;
      backgroundStyle.background = `linear-gradient(${angle}deg, ${card.gradientStart} 0%, ${card.gradientEnd} 100%)`;
    }

    return (
      <div
        key={index}
        className="flex justify-center lg:justify-end items-center rounded-[14px] overflow-hidden relative w-full"
        style={backgroundStyle}
      >
        {/* Overlay for image-based cards */}
        {isImageOverlay && card.backgroundImage && (
          <div
            className="absolute inset-0 rounded-[14px]"
            style={{
              backgroundColor: card.backgroundColor,
              opacity: card.overlayOpacity || 0.7,
              zIndex: 0,
            }}
          />
        )}

        <div className="relative z-10 flex justify-center lg:justify-end items-center w-full h-full">
          <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6 w-full">
            {/* Text Content */}
            <p
              className="text-center lg:text-left"
              style={{
                color: card.titleColor,
                fontFamily: card.titleFontFamily,
                fontSize: card.titleFontSize,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "1.3",
              }}
            >
              {card.title}
            </p>

            {/* Buttons */}
            {card.buttons && card.buttons.length > 0 && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                {card.buttons.map((btn, btnIndex) => (
                  <a
                    key={btnIndex}
                    href={btn.link}
                    className="flex justify-center items-center gap-2.5 rounded-full hover:opacity-90 transition-opacity px-4 sm:px-6 py-2 sm:py-2.5"
                    style={{
                      backgroundColor: btn.backgroundColor,
                      color: btn.textColor,
                      fontFamily: btn.fontFamily,
                      fontSize: btn.fontSize,
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    {btn.isHighlighted ? (
                      <>
                        <span
                          style={{
                            fontFamily: "var(--font-brunella)",
                            fontSize: "clamp(14px, 2.5vw, 16px)",
                          }}
                        >
                          {btn.text.split(" ")[0]}
                        </span>
                        <span style={{ fontFamily: btn.fontFamily }}>
                          {btn.text.substring(btn.text.indexOf(" "))}
                        </span>
                      </>
                    ) : (
                      btn.text
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!data || !data.cards || data.cards.length === 0) {
    return null;
  }

  return (
    <section
      className={`w-full bg-white py-16 md:py-20 min-[1300px]:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1245px] gap-6">
            {data.cards.map((card, index) => renderCard(card, index))}
          </div>
        </div>
      </div>
    </section>
  );
}
