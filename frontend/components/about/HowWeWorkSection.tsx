"use client";

interface StepItem {
  icon?: React.ReactNode | string; // Can be React node or SVG string
  iconSvg?: string; // SVG string from CMS
  title: string;
  subheading?: string;
  description?: string;
}

interface HowWeWorkSectionProps {
  className?: string;
  // Content
  heading?: string;
  description?: string;
  steps?: StepItem[];
  // Color customization
  headingColor?: string;
  descriptionColor?: string;
  stepTitleColor?: string;
  stepSubheadingColor?: string;
  stepDescriptionColor?: string;
  iconContainerBackground?: string;
  iconContainerBorderColor?: string;
  iconColor?: string;
  arrowColor?: string;
}

// Helper function to render SVG from string
function renderIcon(icon: React.ReactNode | string | undefined, iconSvg?: string): React.ReactNode {
  const svgString = (typeof icon === 'string' ? icon : iconSvg) || '';
  
  if (typeof icon === 'object' && icon !== null) {
    return icon;
  }
  
  if (svgString) {
    try {
      let processedSvg = svgString.trim();
      
      if (!processedSvg.includes('width=') || !processedSvg.includes('height=')) {
        processedSvg = processedSvg.replace(
          /<svg([^>]*)>/i,
          (match, attributes) => {
            if (!attributes.includes('width=')) {
              attributes += ' width="38"';
            }
            if (!attributes.includes('height=')) {
              attributes += ' height="38"';
            }
            return `<svg${attributes}>`;
          }
        );
      }
      
      return (
        <div
          dangerouslySetInnerHTML={{ __html: processedSvg }}
          style={{
            width: "clamp(28px, 5vw, 38px)",
            height: "clamp(28px, 5vw, 38px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        />
      );
    } catch (error) {
      console.error("Error rendering SVG:", error);
      return null;
    }
  }
  
  return null;
}

export default function HowWeWorkSection({
  className = "",
  heading = "How we work",
  description = "A thoughtful, collaborative process designed to bring clarity, creativity, and intention to every project",
  steps,
  headingColor = "#000",
  descriptionColor = "#212121",
  stepTitleColor = "#000",
  stepSubheadingColor = "#212121",
  stepDescriptionColor = "#212121",
  iconContainerBackground = "#F5EDFF",
  iconContainerBorderColor = "#DFC6FF",
  iconColor = "#69488F",
  arrowColor = "#69488F",
}: HowWeWorkSectionProps) {
  const defaultSteps: StepItem[] = steps || [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path
            d="M7.125 20.1875H16.625V22.5625H7.125V20.1875Z"
            fill="#69488F"
          />
          <path
            d="M3.5625 22.5625C4.21834 22.5625 4.75 22.0308 4.75 21.375C4.75 20.7192 4.21834 20.1875 3.5625 20.1875C2.90666 20.1875 2.375 20.7192 2.375 21.375C2.375 22.0308 2.90666 22.5625 3.5625 22.5625Z"
            fill="#69488F"
          />
          <path
            d="M15.4375 17.8125C16.0933 17.8125 16.625 17.2808 16.625 16.625C16.625 15.9692 16.0933 15.4375 15.4375 15.4375C14.7817 15.4375 14.25 15.9692 14.25 16.625C14.25 17.2808 14.7817 17.8125 15.4375 17.8125Z"
            fill="#69488F"
          />
          <path
            d="M2.375 15.4375H11.875V17.8125H2.375V15.4375ZM7.125 10.6875H16.625V13.0625H7.125V10.6875Z"
            fill="#69488F"
          />
          <path
            d="M3.5625 13.0625C4.21834 13.0625 4.75 12.5308 4.75 11.875C4.75 11.2192 4.21834 10.6875 3.5625 10.6875C2.90666 10.6875 2.375 11.2192 2.375 11.875C2.375 12.5308 2.90666 13.0625 3.5625 13.0625Z"
            fill="#69488F"
          />
          <path
            d="M35.6242 33.9625L26.8367 25.175C28.618 22.8 29.6867 19.8312 29.6867 16.625C29.6867 8.7875 23.2742 2.375 15.4367 2.375C11.518 2.375 7.83672 3.91875 5.10547 6.8875L6.88672 8.55C9.02422 6.05625 12.1117 4.75 15.4367 4.75C21.968 4.75 27.3117 10.0938 27.3117 16.625C27.3117 23.1562 21.968 28.5 15.4367 28.5C11.8742 28.5 8.54922 26.9562 6.29297 24.225L4.51172 25.7688C7.12422 28.975 11.1617 30.875 15.4367 30.875C19.2367 30.875 22.6805 29.3313 25.293 26.9563L33.9617 35.625L35.6242 33.9625Z"
            fill="#69488F"
          />
        </svg>
      ),
      title: "Begin with Understanding",
      subheading: "Research-led and reflective",
      description:
        "We start with context, insight, and intention — ensuring everything we create is informed, considered, and grounded in purpose.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path
            d="M10.1415 4.92553C10.1374 4.73953 10.0809 4.55847 9.97853 4.40312C9.87616 4.24777 9.73208 4.12442 9.56281 4.04722C9.39354 3.97002 9.20594 3.94211 9.02152 3.96667C8.83711 3.99124 8.66336 4.06729 8.5202 4.18611C6.62178 5.76153 5.46516 6.96644 4.7962 8.07319C4.09003 9.23615 3.95703 10.236 3.95703 11.2787C3.95703 12.4334 4.41577 13.5409 5.23234 14.3575C6.0489 15.1741 7.1564 15.6328 8.3112 15.6328C9.46599 15.6328 10.5735 15.1741 11.3901 14.3575C12.2066 13.5409 12.6654 12.4334 12.6654 11.2787C12.6654 9.85761 11.9608 8.8989 11.4066 8.14603L11.2459 7.92594C10.6727 7.13111 10.1732 6.33707 10.1415 4.92553ZM13.3889 8.24894C14.3996 7.76854 15.5047 7.51972 16.6237 7.52061C20.51 7.52061 23.7075 10.468 24.1034 14.2498H20.7799C19.4677 14.2498 18.2092 14.7711 17.2812 15.699C16.3533 16.6269 15.832 17.8854 15.832 19.1977V22.5211C15.2762 22.4635 14.7286 22.3435 14.1996 22.1633C14.1607 22.8382 14.1058 23.5121 14.0349 24.1844C14.6144 24.3491 15.2135 24.4573 15.832 24.509V27.5102C15.832 28.8225 16.3533 30.081 17.2812 31.0089C18.2092 31.9368 19.4677 32.4581 20.7799 32.4581H29.0924C30.4047 32.4581 31.6632 31.9368 32.5912 31.0089C33.5191 30.081 34.0404 28.8225 34.0404 27.5102V19.1977C34.0404 17.8854 33.5191 16.6269 32.5912 15.699C31.6632 14.7711 30.4047 14.2498 29.0924 14.2498H26.0912C25.6891 9.37311 21.6041 5.54144 16.6229 5.54144C15.1026 5.53917 13.6042 5.90333 12.2545 6.60307C12.3376 6.73132 12.4294 6.86194 12.53 7.00128L12.6804 7.20473C12.8783 7.46994 13.1388 7.81907 13.3897 8.24973M26.0493 16.2289H29.0917C29.879 16.2289 30.6341 16.5417 31.1909 17.0985C31.7476 17.6552 32.0604 18.4103 32.0604 19.1977V27.5102C32.0604 28.2976 31.7476 29.0527 31.1909 29.6094C30.6341 30.1662 29.879 30.4789 29.0917 30.4789H20.7792C19.9918 30.4789 19.2367 30.1662 18.6799 29.6094C18.1232 29.0527 17.8104 28.2976 17.8104 27.5102V24.4678C19.9032 24.2035 21.8487 23.2505 23.3403 21.7589C24.8319 20.2672 25.785 18.3218 26.0493 16.2289ZM24.0503 16.2289C23.7991 17.7933 23.0608 19.2386 21.9404 20.359C20.8201 21.4793 19.3748 22.2177 17.8104 22.4689V19.1977C17.8104 18.4103 18.1232 17.6552 18.6799 17.0985C19.2367 16.5417 19.9918 16.2289 20.7792 16.2289H24.0503ZM4.61491 16.3612C4.66082 16.254 4.71043 16.1474 4.76374 16.0413C5.78806 16.8063 7.03272 17.2188 8.3112 17.2169C9.59076 17.2187 10.8364 16.8053 11.861 16.0389C11.9149 16.1456 11.965 16.2535 12.0114 16.3627C12.5656 17.6682 12.6654 19.2642 12.6654 20.5412C12.6654 22.6312 12.3424 25.8295 11.7502 28.5212C11.4549 29.8614 11.0812 31.1336 10.6181 32.0939C10.3885 32.5713 10.1107 33.0257 9.76866 33.3733C9.42428 33.7232 8.93582 34.0414 8.31436 34.0414C7.69291 34.0414 7.20445 33.724 6.86007 33.3741C6.51807 33.0257 6.2402 32.5721 6.00982 32.0947C5.54591 31.1344 5.17066 29.8622 4.87536 28.5219C4.28161 25.8303 3.95703 22.6319 3.95703 20.5412C3.95703 19.2634 4.05836 17.6674 4.61491 16.3612Z"
            fill="#69488F"
          />
        </svg>
      ),
      title: " Design Holistically",
      subheading: "End-to-end thinking",
      description:
        "From ideas to execution, we shape structure, content, and experience together, creating work that feels clear, cohesive, and intentional.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path
            d="M24.9375 27.3125C26.2492 27.3125 27.3125 26.2492 27.3125 24.9375C27.3125 23.6258 26.2492 22.5625 24.9375 22.5625C23.6258 22.5625 22.5625 23.6258 22.5625 24.9375C22.5625 26.2492 23.6258 27.3125 24.9375 27.3125Z"
            fill="#69488F"
          />
          <path
            d="M8.3125 10.6875C9.62418 10.6875 10.6875 9.62418 10.6875 8.3125C10.6875 7.00082 9.62418 5.9375 8.3125 5.9375C7.00082 5.9375 5.9375 7.00082 5.9375 8.3125C5.9375 9.62418 7.00082 10.6875 8.3125 10.6875Z"
            fill="#69488F"
          />
          <path
            d="M32.0625 36.8125C31.123 36.8125 30.2047 36.5339 29.4235 36.012C28.6424 35.49 28.0336 34.7482 27.6741 33.8802C27.3146 33.0123 27.2205 32.0572 27.4038 31.1358C27.5871 30.2144 28.0394 29.368 28.7037 28.7037C29.368 28.0394 30.2144 27.5871 31.1358 27.4038C32.0572 27.2205 33.0123 27.3146 33.8802 27.6741C34.7482 28.0336 35.49 28.6424 36.012 29.4235C36.5339 30.2047 36.8125 31.123 36.8125 32.0625C36.8094 33.3213 36.3079 34.5277 35.4178 35.4178C34.5277 36.3079 33.3213 36.8094 32.0625 36.8125ZM32.0625 29.6875C31.5928 29.6875 31.1336 29.8268 30.743 30.0878C30.3525 30.3487 30.048 30.7197 29.8683 31.1536C29.6885 31.5876 29.6415 32.0651 29.7331 32.5258C29.8248 32.9865 30.051 33.4097 30.3831 33.7419C30.7153 34.074 31.1385 34.3002 31.5992 34.3919C32.0599 34.4835 32.5374 34.4365 32.9714 34.2567C33.4054 34.077 33.7763 33.7725 34.0372 33.382C34.2982 32.9914 34.4375 32.5322 34.4375 32.0625C34.4356 31.4332 34.1848 30.8302 33.7398 30.3852C33.2948 29.9402 32.6918 29.6894 32.0625 29.6875Z"
            fill="#69488F"
          />
          <path
            d="M35.625 19.0001C35.6125 14.5948 33.8569 10.3734 30.7418 7.25832C27.6267 4.14324 23.4054 2.38766 19 2.37512C16.1634 2.33448 13.37 3.07388 10.925 4.51262L12.2312 6.53137C13.1591 6.08434 14.1105 5.68792 15.0813 5.34387C13.1169 9.21692 12.0227 13.4724 11.875 17.8126H4.75C4.8831 15.8519 5.451 13.9454 6.4125 12.2314L4.63125 10.6876C3.15356 13.2086 2.37473 16.078 2.375 19.0001C2.375 23.4093 4.12656 27.638 7.24435 30.7558C10.3621 33.8736 14.5908 35.6251 19 35.6251C21.1168 35.644 23.2161 35.2403 25.175 34.4376L24.4625 32.1814C22.5156 33.014 20.401 33.38 18.2875 33.2501C15.7551 29.3552 14.357 24.8322 14.25 20.1876H35.5062C35.6044 19.7999 35.6445 19.3997 35.625 19.0001ZM15.2 32.7751C12.8382 32.0682 10.6801 30.8059 8.90625 29.0939C6.54968 26.6832 5.08388 23.5422 4.75 20.1876H11.875C12.0383 24.5778 13.174 28.877 15.2 32.7751ZM14.25 17.8126C14.3447 13.1832 15.6995 8.66717 18.1687 4.75012H19.8313C22.3005 8.66717 23.6553 13.1832 23.75 17.8126H14.25ZM26.125 17.8126C26.0336 13.412 24.8938 9.09676 22.8 5.22512C25.5942 6.03016 28.0781 7.66471 29.9229 9.91243C31.7677 12.1601 32.8865 14.9151 33.1313 17.8126H26.125Z"
            fill="#69488F"
          />
        </svg>
      ),
      title: "Create for Real Life",
      subheading: "Function-led, designed to last",
      description:
        "Whether content, digital projects, or lifestyle essentials, our work is made to be used, revisited, and lived with, supporting balance, adaptability, and longevity.",
    },
  ];

  const displaySteps = steps || defaultSteps;

  // Helper to update SVG fill color
  const updateSvgColor = (svgString: string, color: string): string => {
    return svgString.replace(/fill="#69488F"/g, `fill="${color}"`);
  };

  return (
    <section
      className={`w-full bg-white py-16 md:py-20 min-[1300px]:py-24 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex flex-col items-center gap-8 md:gap-10 min-[1300px]:gap-12">
          {/* Heading */}
          {heading && (
            <h2
              className="text-center"
              style={{
                color: headingColor,
                fontFamily: "var(--font-bona-nova)",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p
              className="text-center max-w-4xl px-4"
              style={{
                color: descriptionColor,
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(16px, 2.5vw, 18px)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              {description}
            </p>
          )}

          {/* Steps with arrows */}
          {displaySteps.length > 0 && (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-2 xl:gap-3 w-full px-4 md:px-0">
              {displaySteps.map((step, index) => {
                const iconElement = renderIcon(step.icon, step.iconSvg);
                // Update icon color if it's an SVG string
                let processedIcon = iconElement;
                if (typeof step.iconSvg === 'string' && iconColor !== "#69488F") {
                  const updatedSvg = updateSvgColor(step.iconSvg, iconColor);
                  processedIcon = renderIcon(undefined, updatedSvg);
                }
                return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center"
              >
                {/* Step Item */}
                <div
                  className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[280px] xl:max-w-[320px] min-[1400px]:max-w-[392px]"
                  style={{
                    padding: "clamp(16px, 3vw, 24px)",
                  }}
                >
                  {/* Icon Container */}
                  {processedIcon && (
                    <div
                      className="flex justify-center items-center"
                      style={{
                        width: "clamp(60px, 10vw, 80px)",
                        height: "clamp(60px, 10vw, 80px)",
                        padding: "clamp(12px, 2vw, 18px) clamp(10px, 2vw, 16px)",
                        gap: "10px",
                        borderRadius: "200px",
                        border: `1px solid ${iconContainerBorderColor}`,
                        background: iconContainerBackground,
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: "clamp(28px, 5vw, 38px)",
                          height: "clamp(28px, 5vw, 38px)",
                          flexShrink: 0,
                          aspectRatio: "1/1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {processedIcon}
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-center"
                    style={{
                      color: stepTitleColor,
                      fontFamily: "var(--font-bona-nova)",
                      fontSize: "clamp(20px, 3.5vw, 28px)",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Subheading */}
                  {step.subheading && (
                    <p
                      className="text-center"
                      style={{
                        color: stepSubheadingColor,
                        fontFamily: "var(--font-figma-hand)",
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {step.subheading}
                    </p>
                  )}

                  {/* Description */}
                  {step.description && (
                    <p
                      className="text-center"
                      style={{
                        color: stepDescriptionColor,
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(12px, 2vw, 14px)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Arrow between items (not after last item) */}
                {index < displaySteps.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center flex-shrink-0 mx-1 xl:mx-2"
                    style={{
                      width: "clamp(50px, 5vw, 98px)",
                      height: "23px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 98 23"
                      fill="none"
                      className="w-full h-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M97.0607 12.1066C97.6464 11.5208 97.6464 10.571 97.0607 9.98524L87.5147 0.439297C86.9289 -0.14649 85.9792 -0.14649 85.3934 0.439297C84.8076 1.02508 84.8076 1.97483 85.3934 2.56062L93.8787 11.0459L85.3934 19.5312C84.8076 20.117 84.8076 21.0667 85.3934 21.6525C85.9792 22.2383 86.9289 22.2383 87.5147 21.6525L97.0607 12.1066ZM0 11.0459V12.5459H3V11.0459V9.5459H0V11.0459ZM9 11.0459V12.5459H15V11.0459V9.5459H9V11.0459ZM21 11.0459V12.5459H27V11.0459V9.5459H21V11.0459ZM33 11.0459V12.5459H39V11.0459V9.5459H33V11.0459ZM45 11.0459V12.5459H51V11.0459V9.5459H45V11.0459ZM57 11.0459V12.5459H63V11.0459V9.5459H57V11.0459ZM69 11.0459V12.5459H75V11.0459V9.5459H69V11.0459ZM81 11.0459V12.5459H87V11.0459V9.5459H81V11.0459ZM93 11.0459V12.5459H96V11.0459V9.5459H93V11.0459Z"
                        fill={arrowColor}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
