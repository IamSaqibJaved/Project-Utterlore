"use client";

import Image from "next/image";
import { Button } from "../common";

interface AboutUsProps {
  sectionTitle?: string;
  heading?: string;
  content?: string[];
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imagePosition?: string;
  className?: string;
}

export default function AboutUs({
  sectionTitle = "About",
  heading = "UTTER LORE",
  content = [
    "Utter Lore stands as a visionary entity, seamlessly blending creativity with purpose to craft experiences that transcend the ordinary. Rooted in the philosophy of elevating everyday life through design, beauty, and storytelling, Utter Lore embodies an unwavering commitment to authenticity and innovation.",
    "From curated fashion insights and thoughtful lifestyle narratives to transformative beauty explorations, Utter Lore redefines the way we engage with the world around us. Each endeavor is meticulously designed to inspire, educate, and empower individuals to embrace their unique journeys with confidence and clarity.",
    "At its core, Utter Lore is not just a brand—it is a movement. A celebration of meaningful creativity that bridges the gap between aspiration and reality, offering a sanctuary for those seeking depth, elegance, and purpose in all they pursue.",
  ],
  buttonText = "Read Our Story",
  buttonLink = "/about",
  imageSrc = "/assets/images/AboutUs.png",
  imagePosition = "left",
  className = "",
}: AboutUsProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={`relative w-full bg-white py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div
          className={`relative flex flex-col lg:flex-row gap-8 lg:gap-[61px] items-start ${!isImageLeft ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image Container */}
          <div
            className="relative w-full lg:w-[451px] flex-shrink-0"
            style={{
              height: "433px",
              borderRadius: "4px",
            }}
          >
            <Image
              src={imageSrc}
              alt="About Us"
              fill
              className="object-cover"
              style={{
                borderRadius: "4px",
              }}
              priority
            />
          </div>

          {/* Content Container */}
          <div
            className="flex flex-col w-full lg:w-[753px] flex-1 lg:h-[433px] lg:justify-between"
            style={{
              gap: "16px",
            }}
          >
            {/* Section Title */}
            {sectionTitle && (
              <p
                className="font-figma-hand"
                style={{
                  fontFamily: "var(--font-figma-hand)",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  fontStyle: "normal",
                  color: "#000000",
                }}
              >
                {sectionTitle}
              </p>
            )}

            {/* Main Heading */}
            {heading && (
              <h2
                className="font-bona-nova"
                style={{
                  fontFamily: "var(--font-bona-nova)",
                  fontWeight: 400,
                  fontSize: "44px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  fontStyle: "normal",
                  color: "#000000",
                }}
              >
                {heading}
              </h2>
            )}

            {/* Body Content */}
            {content && content.length > 0 && (
              <div className="flex flex-col" style={{ gap: "16px" }}>
                {content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-inter"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      fontStyle: "normal",
                      color: "#000000",
                      textAlign: "justify",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {buttonText && buttonLink && (
              <div
                style={{ marginTop: "16px" }}
                className="flex justify-center lg:justify-start"
              >
                <Button
                  href={buttonLink}
                  text={buttonText}
                  variant="primary"
                  showArrow={true}
                  className="group"
                  height={52}
                  width={257}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
