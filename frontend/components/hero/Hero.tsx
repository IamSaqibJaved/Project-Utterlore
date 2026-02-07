"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Button, Carousel } from "../common";
import { colors } from "@/config/colors";
import { getImageSrc, normalizeImageSources } from "@/lib/utils";

interface HeroProps {
  sectionTitle?: string | ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  primaryButtonBgColor?: string;
  primaryButtonTextColor?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonBgColor?: string;
  secondaryButtonTextColor?: string;
  secondaryButtonBorderColor?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
  backgroundImage?: string;
  carouselImages?: string[];
  overlayColor?: string;
  descriptionMaxWidth?: number | string; // Custom max width for description
}

export default function Hero({
  sectionTitle,
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  primaryButtonBgColor = "#000000",
  primaryButtonTextColor = "#FFFFFF",
  secondaryButtonText,
  secondaryButtonLink,
  secondaryButtonBgColor = "transparent",
  secondaryButtonTextColor = "#FFFFFF",
  secondaryButtonBorderColor = "#FFFFFF",
  image,
  imageAlt = "Hero image",
  className = "",
  backgroundImage,
  carouselImages,
  overlayColor = colors.overlay.rgba,
  descriptionMaxWidth,
}: HeroProps) {
  // Normalize carousel images - handles both local paths and external URLs
  const normalizedCarouselImages = normalizeImageSources(carouselImages, [
    "/assets/images/CarasoulWallpaper.jpg",
  ]);

  // Normalize background image if provided
  const normalizedBackgroundImage = backgroundImage
    ? getImageSrc(backgroundImage)
    : undefined;

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {carouselImages || !normalizedBackgroundImage ? (
          <Carousel
            images={normalizedCarouselImages}
            autoPlay={true}
            autoPlayInterval={5000}
            showIndicators={normalizedCarouselImages.length > 1}
            showArrows={normalizedCarouselImages.length > 1}
            className="h-full w-full"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url(${normalizedBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: overlayColor,
        }}
      />

      {/* Content */}
      <div className="container relative z-[2] mx-auto flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 px-4 py-12 md:py-16 lg:py-20 text-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-4 md:gap-6 lg:gap-8">
          {/* Section Title */}
          {sectionTitle && (
            <div className="flex flex-col items-center gap-2">
              <div className="inline-flex flex-col items-center gap-2">
                <p
                  className="font-bona-nova text-white whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-bona-nova)",
                    fontWeight: 400,
                    fontSize: "clamp(16px, 2vw, 22px)",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                  }}
                >
                  {sectionTitle}
                </p>
                <div className="h-px w-full bg-white"></div>
              </div>
            </div>
          )}

          {/* Main Title */}
          {title && (
            <h1
              className="font-bona-nova text-white text-center px-2"
              style={{
                fontFamily: "var(--font-bona-nova)",
                fontWeight: 400,
                fontSize: "clamp(28px, 5vw, 52px)",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              {title}
            </h1>
          )}

          {/* Description */}
          {description && (
            <p
              className={`font-bona-nova text-white/90 text-center px-4 ${
                !descriptionMaxWidth ? "max-w-2xl" : ""
              }`}
              style={{
                fontFamily: "var(--font-bona-nova)",
                fontWeight: 400,
                fontSize: "clamp(16px, 2vw, 22px)",
                lineHeight: "120%",
                letterSpacing: "0%",
                textAlign: "center",
                ...(descriptionMaxWidth && {
                  maxWidth:
                    typeof descriptionMaxWidth === "number"
                      ? `${descriptionMaxWidth}px`
                      : descriptionMaxWidth,
                }),
              }}
            >
              {description}
            </p>
          )}

          {/* CTA Button */}
          {primaryButtonText && primaryButtonLink && (
            <div className="mt-2 md:mt-4">
              <Button
                href={primaryButtonLink}
                text={primaryButtonText}
                variant="primary"
                width={257}
                height={52}
                className="group w-full sm:w-auto"
                showArrow={true}
                style={{
                  backgroundColor: primaryButtonBgColor,
                  color: primaryButtonTextColor,
                }}
              />
            </div>
          )}

          {/* Secondary Button */}
          {secondaryButtonText && secondaryButtonLink && (
            <Button
              href={secondaryButtonLink}
              text={secondaryButtonText}
              variant="outline"
              className="hover:bg-white/10"
              style={{
                backgroundColor: secondaryButtonBgColor,
                color: secondaryButtonTextColor,
                borderColor: secondaryButtonBorderColor,
              }}
            />
          )}
        </div>

        {/* Image */}
        {image && (
          <div className="relative mt-8 flex items-center justify-center w-full h-64 md:h-96">
            <Image
              src={getImageSrc(image)}
              alt={imageAlt}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
