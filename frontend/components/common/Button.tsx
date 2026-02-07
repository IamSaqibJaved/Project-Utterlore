import Link from "next/link";
import { ReactNode } from "react";
import { colors } from "@/config/colors";

interface ButtonProps {
  href?: string;
  text?: string;
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  showArrow?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  href,
  text,
  children,
  width,
  height,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  target,
  rel,
  showArrow = false,
  style: customStyle,
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center font-bona-nova transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "text-white hover:opacity-90",
    secondary: "bg-white text-zinc-900 hover:bg-zinc-100",
    outline: "border border-solid border-white text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  const style = {
    width: width
      ? typeof width === "number"
        ? `${width}px`
        : width
      : undefined,
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : undefined,
    backgroundColor: variant === "primary" ? colors.primary.DEFAULT : undefined,
    borderRadius: "50px",
    paddingTop: "10px",
    paddingRight: "30px",
    paddingBottom: "10px",
    paddingLeft: "30px",
    gap: "10px",
    fontFamily: "var(--font-bona-nova)",
    fontWeight: 700,
    fontSize: "clamp(14px, 1.2vw, 18px)",
    lineHeight: "100%",
    letterSpacing: "0%",
    ...customStyle, // Merge custom styles - these will override defaults
  };

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  // Determine content: if children provided, use them; otherwise use text with optional arrow
  let content: ReactNode;
  if (children) {
    content = children;
  } else if (text) {
    content = (
      <>
        {text}
        {showArrow && (
          <svg
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M18 6H10M18 6V14"
            />
          </svg>
        )}
      </>
    );
  } else {
    content = null;
  }

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        style={style}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={combinedClassName}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
