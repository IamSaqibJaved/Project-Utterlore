"use client";

interface PhilosophyItem {
  title: string;
  description: string;
}

interface PhilosophySectionProps {
  sectionTitle?: string;
  heading?: string;
  description?: string;
  items?: PhilosophyItem[];
  className?: string;
}

export default function PhilosophySection({
  sectionTitle = "About",
  heading = "Our Philosophy",
  description = "We believe modern living is at its best when it is intentional and informed. Utter Lore creates space for clarity through thoughtful publishing, considered digital and content experiences, and flexible lifestyle essentials. Guided by purpose rather than trends, we offer perspective, supporting balance, reflection, and mindful living shaped daily with intention.",
  items = [
    {
      title: "Knowledge with Intention",
      description: "Thoughtful publishing designed to inform, deepen understanding, and endure beyond trends.",
    },
    {
      title: "Clarity by Design",
      description: "Digital and content experiences, designed with clarity and purpose.",
    },
    {
      title: "Design that Adapts",
      description: "Flexible lifestyle essentials created to move with life and support everyday balance.",
    },
  ],
  className = "",
}: PhilosophySectionProps) {
  return (
    <section className={`w-full bg-white py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Section Title */}
          {sectionTitle && (
            <p
              style={{
                fontFamily: "var(--font-figma-hand)",
                fontSize: "26px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#000",
              }}
            >
              {sectionTitle}
            </p>
          )}

          {/* Main Heading */}
          {heading && (
            <h2
              style={{
                fontFamily: "var(--font-bona-nova)",
                fontSize: "44px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#000",
                textAlign: "center",
              }}
            >
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                color: "#212121",
                textAlign: "center",
                maxWidth: "1128px",
                width: "100%",
              }}
            >
              {description}
            </p>
          )}

          {/* Three Columns */}
          {items && items.length > 0 && (
            <div
              className="flex flex-wrap justify-center items-center mt-8 w-full"
              style={{
                minHeight: "168px",
                alignItems: "center",
                gap: "26px",
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[calc(50%-13px)] lg:w-[395px]"
                  style={{
                    display: "flex",
                    padding: "24px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "16px",
                    borderLeft: "4px solid #DFC6FF",
                  }}
                >
                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-bona-nova)",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      color: "#000",
                    }}
                  >
                    {item.title}
                  </h3>
                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      color: "#212121",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

