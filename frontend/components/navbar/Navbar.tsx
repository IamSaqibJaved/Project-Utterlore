"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../common";

interface HeaderConfig {
  logo?: {
    image?: string;
    alt?: string;
    link?: string;
  };
  headerStyle?: {
    position?: string;
    top?: string;
    height?: string;
    backgroundColor?: string;
    paddingHorizontal?: string;
  };
  menuItems?: Array<{
    label: string;
    href: string;
    isSpecial?: boolean;
  }>;
  menuStyle?: {
    fontSize?: string;
    normalFontWeight?: string;
    activeFontWeight?: string;
    textColor?: string;
    activeUnderlineColor?: string;
    gap?: string;
  };
  ctaButton?: {
    enabled?: boolean;
    text?: string;
    link?: string;
    variant?: string;
    showArrow?: boolean;
    height?: number;
    width?: number;
  };
  cartIcon?: {
    enabled?: boolean;
    iconColor?: string;
  };
}

interface NavbarProps extends Omit<HeaderConfig, "logo" | "menuItems"> {
  // Legacy props for backward compatibility
  logo?: string | { image?: string; alt?: string; link?: string };
  logoAlt?: string;
  menuItems?: Array<{
    label: string;
    href: string;
    isSpecial?: boolean;
  }>;
  activeItem?: string;
  ctaText?: string;
  ctaLink?: string;
  showCart?: boolean;
  className?: string;
}

export default function Navbar(props: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle both old and new prop structures
  const logo =
    typeof props.logo === "string"
      ? { image: props.logo, alt: props.logoAlt || "UtterLore Logo", link: "/" }
      : props.logo || {
          image: "/assets/images/logo.png",
          alt: "UtterLore Logo",
          link: "/",
        };

  const headerStyle = props.headerStyle || {
    position: "absolute",
    top: "23px",
    height: "103px",
    backgroundColor: "transparent",
    paddingHorizontal: "50px",
  };

  const menuItems = props.menuItems || [];

  const menuStyle = props.menuStyle || {
    fontSize: "clamp(14px, 1.25vw, 20px)",
    normalFontWeight: "400",
    activeFontWeight: "700",
    textColor: "#FFFFFF",
    activeUnderlineColor: "#FFFFFF",
    gap: "clamp(16px, 2vw, 32px)",
  };

  const ctaButton = props.ctaButton || {
    enabled: props.ctaText ? true : false,
    text: props.ctaText || "Get in touch",
    link: props.ctaLink || "/contact",
    variant: "primary",
    showArrow: true,
    height: 52,
    width: 195,
  };

  // Convenience locals to support legacy render paths
  const ctaText = ctaButton.text;
  const ctaLink = ctaButton.link;

  const cartIcon = props.cartIcon || {
    enabled: props.showCart !== undefined ? props.showCart : false,
    iconColor: "#FFFFFF",
  };

  const currentPath = props.activeItem || pathname;
  const { className = "" } = props;

  return (
    <nav
      className={`flex items-center z-50 w-full ${className}`}
      style={{
        position: headerStyle.position as any,
        top: headerStyle.top,
        left: "0",
        right: "0",
        height: headerStyle.height,
        justifyContent: "space-between",
        maxWidth: "100vw",
        backgroundColor: headerStyle.backgroundColor,
        paddingLeft: headerStyle.paddingHorizontal,
        paddingRight: headerStyle.paddingHorizontal,
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href={logo.link || "/"}>
          <Image
            src={logo.image || "/assets/images/logo.png"}
            alt={logo.alt || "UtterLore Logo"}
            width={100}
            height={56}
            className="object-contain w-20 h-auto lg:w-[154px]"
            style={{
              maxHeight: "136px",
            }}
            priority
          />
        </Link>
      </div>

      {/* Desktop Menu Items, CTA Button and Cart */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-8 relative z-10">
        {/* Menu Items */}
        {menuItems.length > 0 && (
          <div
            className="flex items-center"
            style={{
              height: "52px",
              gap: menuStyle.gap,
            }}
          >
            {menuItems.map((item, index) => {
              const isActive = currentPath === item.href;
              const isSpecial = item.isSpecial;

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center hover:opacity-80 whitespace-nowrap relative"
                  style={{
                    fontFamily: isSpecial
                      ? "var(--font-brunella)"
                      : "var(--font-bona-nova)",
                    fontWeight: isActive
                      ? menuStyle.activeFontWeight
                      : menuStyle.normalFontWeight,
                    fontStyle: isSpecial ? "normal" : "normal",
                    fontSize: menuStyle.fontSize,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: menuStyle.textColor,
                    height: isActive ? "24px" : "52px",
                    minWidth: isActive ? "56px" : "auto",
                    gap: isActive ? "10px" : "0",
                    paddingBottom: "0",
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {item.label}
                  {/* Animated Underline */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: isActive ? "100%" : "0%",
                      height: "1px",
                      backgroundColor: menuStyle.activeUnderlineColor,
                      transition: "width 0.3s ease-in-out",
                      transformOrigin: "left",
                    }}
                  />
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Button and Cart */}
        <div className="flex items-center gap-2 md:gap-4">
          {ctaButton.enabled && (
            <Button
              href={ctaButton.link || "/contact"}
              text={ctaButton.text || "Get in touch"}
              variant={(ctaButton.variant as any) || "primary"}
              showArrow={ctaButton.showArrow ?? true}
              className="group"
              height={ctaButton.height || 52}
              width={ctaButton.width || 195}
            />
          )}
          {cartIcon.enabled && (
            <button
              className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              aria-label="Shopping cart"
              style={{
                color: cartIcon.iconColor,
              }}
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 lg:hidden">
        {cartIcon.enabled && (
          <button
            className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label="Shopping cart"
            style={{
              color: cartIcon.iconColor,
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        )}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center text-white hover:opacity-80 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                className="transition-opacity duration-300"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
                className="transition-opacity duration-300"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-md lg:hidden z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8 gap-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4 flex-1">
            {menuItems.map((item, index) => {
              const isActive = currentPath === item.href;
              const isSpecial =
                item.isSpecial || item.label.toLowerCase().includes("flexi");

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center hover:opacity-80 py-3 border-b border-white/10"
                  style={{
                    fontFamily: isSpecial
                      ? "var(--font-brunella)"
                      : "var(--font-bona-nova)",
                    fontWeight: isActive ? 700 : 400,
                    fontSize: "18px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#FFFFFF",
                    borderBottom: isActive
                      ? "2px solid #FFFFFF"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          {ctaButton.enabled && ctaText && ctaLink && (
            <div className="pt-4 border-t border-white/10">
              <Button
                href={ctaLink}
                text={ctaText}
                variant="primary"
                showArrow={true}
                className="group w-full"
                height={52}
                width="100%"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
