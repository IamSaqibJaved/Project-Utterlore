"use client";

interface ValueItem {
  icon?: React.ReactNode | string; // Can be React node or SVG string from CMS
  iconSvg?: string; // SVG string from CMS
  label?: string; // For backward compatibility
  title?: string; // From CMS schema
  description?: string; // Optional description
}

interface StudioValuesSectionProps {
  heading?: string;
  description?: string;
  values?: ValueItem[];
  className?: string;
  // Color customization
  iconBackground?: string; // Background gradient/color for icon containers
  valueTitleColor?: string; // Color for value titles
}

// Helper function to render SVG from string
function renderIcon(icon: React.ReactNode | string | undefined, iconSvg?: string): React.ReactNode {
  // Priority: icon prop > iconSvg prop
  const svgString = (typeof icon === 'string' ? icon : iconSvg) || '';
  
  if (typeof icon === 'object' && icon !== null) {
    // Already a React node
    return icon;
  }
  
  if (svgString) {
    // Parse and render SVG string
    try {
      // Ensure SVG has proper width and height for consistent rendering
      let processedSvg = svgString.trim();
      
      // If SVG doesn't have width/height, add them
      if (!processedSvg.includes('width=') || !processedSvg.includes('height=')) {
        // Try to add width and height attributes to the SVG tag
        processedSvg = processedSvg.replace(
          /<svg([^>]*)>/i,
          (match, attributes) => {
            // Check if width/height already exist
            if (!attributes.includes('width=')) {
              attributes += ' width="40"';
            }
            if (!attributes.includes('height=')) {
              attributes += ' height="40"';
            }
            return `<svg${attributes}>`;
          }
        );
      }
      
      // Create a wrapper div and use dangerouslySetInnerHTML to render SVG
      // This is safe since we control the SVG content from CMS
      return (
        <div
          dangerouslySetInnerHTML={{ __html: processedSvg }}
          style={{
            width: "40px",
            height: "40px",
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

export default function StudioValuesSection({
  heading = "The Studio Values",
  description = "We bring research, thoughtful writing, and creative perspective together to define Utter Lore's editorial voice.",
  values,
  className = "",
  iconBackground = "radial-gradient(50% 50% at 50% 50%, #9A85B1 0%, #3C1E66 100%)",
  valueTitleColor = "#000",
}: StudioValuesSectionProps) {
  // Default values with icons
  const defaultValues: ValueItem[] = values || [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M30.9617 2.5H20.625L27.2023 11.2703L30.9617 2.5ZM9.03828 2.5L12.7977 11.2703L19.375 2.5H9.03828ZM20 5.83359L15 12.5H25L20 5.83359ZM33.043 3.98906L29.3953 12.5H38.125L33.043 3.98906ZM6.95703 3.98906L1.79688 12.5H10.6047L6.95703 3.98906ZM11.4594 15H1.875L19.2812 37.5H19.3227L11.4594 15ZM28.5406 15L20.6773 37.5H20.7188L38.125 15H28.5406ZM25.7336 15H14.2664L20 31.25L25.7336 15Z"
            fill="white"
          />
        </svg>
      ),
      label: "Clarity",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M5.52693 27.1262C2.49693 30.1022 5.05693 33.1582 1.03293 37.6842C-0.783068 39.7302 8.50893 39.1062 13.1109 34.5822C15.0649 32.6602 14.5129 29.8642 12.4189 27.8042C10.3249 25.7482 7.47893 25.2042 5.52693 27.1262ZM39.0789 1.31821C37.5269 -0.209792 20.3209 13.5762 15.2009 18.6102C12.6589 21.1102 11.8109 22.4502 11.0329 23.4502C10.6929 23.8882 11.1429 24.0202 11.3409 24.1222C12.3489 24.6382 13.0529 25.1142 13.9629 26.0082C14.8749 26.9022 15.3609 27.5942 15.8809 28.5862C15.9869 28.7822 16.1229 29.2222 16.5649 28.8902C17.5849 28.1242 18.9469 27.2882 21.4889 24.7922C26.6109 19.7602 40.6349 2.84421 39.0789 1.31821Z"
            fill="white"
          />
        </svg>
      ),
      label: "Design",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M19.9987 3.3335C21.492 3.3335 22.9387 3.53016 24.3154 3.8985L20.772 7.44016C20.5032 7.71005 20.2661 8.00977 20.0654 8.3335H19.9987C17.6912 8.3335 15.4356 9.01773 13.517 10.2997C11.5985 11.5816 10.1031 13.4037 9.2201 15.5355C8.33708 17.6673 8.10604 20.0131 8.5562 22.2762C9.00636 24.5393 10.1175 26.6181 11.7491 28.2497C13.3807 29.8814 15.4595 30.9925 17.7226 31.4427C19.9858 31.8928 22.3315 31.6618 24.4633 30.7788C26.5951 29.8957 28.4172 28.4004 29.6992 26.4818C30.9811 24.5632 31.6654 22.3076 31.6654 20.0002V19.9335C31.9876 19.7335 32.2848 19.4974 32.557 19.2252L36.1004 15.6835C36.4687 17.0602 36.6654 18.5068 36.6654 20.0002C36.6654 29.2052 29.2037 36.6668 19.9987 36.6668C10.7937 36.6668 3.33203 29.2052 3.33203 20.0002C3.33203 10.7952 10.7937 3.3335 19.9987 3.3335ZM19.3087 11.6952C19.3087 13.1135 19.2387 14.5518 19.3154 15.9685L18.4154 16.8685C18.1058 17.1781 17.8602 17.5456 17.6926 17.9501C17.5251 18.3546 17.4389 18.7882 17.4389 19.226C17.4389 19.6638 17.5251 20.0974 17.6926 20.5019C17.8602 20.9064 18.1058 21.2739 18.4154 21.5835C18.725 21.8931 19.0925 22.1387 19.497 22.3062C19.9015 22.4738 20.335 22.56 20.7729 22.56C21.2107 22.56 21.6442 22.4738 22.0487 22.3062C22.4532 22.1387 22.8208 21.8931 23.1304 21.5835L24.0304 20.6835C25.447 20.7602 26.8837 20.6902 28.3037 20.6902C28.172 22.2741 27.5902 23.7873 26.6267 25.0513C25.6633 26.3154 24.3585 27.2776 22.8661 27.8244C21.3738 28.3713 19.7562 28.4799 18.2042 28.1376C16.6521 27.7953 15.2303 27.0163 14.1064 25.8924C12.9826 24.7686 12.2036 23.3468 11.8613 21.7947C11.5189 20.2426 11.6276 18.6251 12.1744 17.1327C12.7213 15.6404 13.6834 14.3356 14.9475 13.3721C16.2116 12.4087 17.7248 11.8268 19.3087 11.6952ZM30.8387 3.54516C31.1429 3.67129 31.4029 3.88472 31.586 4.15851C31.769 4.4323 31.8668 4.75417 31.867 5.0835V8.1335H34.9154C35.2449 8.13357 35.5671 8.23135 35.8411 8.41449C36.1151 8.59763 36.3287 8.85791 36.4548 9.16241C36.5809 9.4669 36.6139 9.80196 36.5497 10.1252C36.4854 10.4485 36.3267 10.7454 36.0937 10.9785L30.1987 16.8668C29.8862 17.1794 29.4624 17.3551 29.0204 17.3552H24.9987L21.952 20.4035C21.6393 20.7162 21.2151 20.8919 20.7729 20.8919C20.3306 20.8919 19.9064 20.7162 19.5937 20.4035C19.281 20.0908 19.1053 19.6666 19.1053 19.2243C19.1053 18.7821 19.281 18.3579 19.5937 18.0452L22.642 15.0002V10.9768C22.6419 10.7577 22.6849 10.5407 22.7687 10.3382C22.8525 10.1357 22.9754 9.95176 23.1304 9.79683L29.022 3.90516C29.2551 3.67194 29.5521 3.51309 29.8755 3.44872C30.1989 3.38434 30.5341 3.41732 30.8387 3.5435"
            fill="white"
          />
        </svg>
      ),
      label: "Intentional",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M39.9388 8.07037C39.9117 7.61219 39.7174 7.17988 39.3929 6.85533C39.0683 6.53079 38.636 6.33655 38.1778 6.30943C29.8544 5.82037 23.1466 8.39693 20.2341 13.2063C18.3372 16.3313 18.2716 20.1079 20.006 23.7219C19.1617 24.7988 18.5124 26.0151 18.0872 27.3157L16.1091 25.3376C17.2325 22.7172 17.1138 20.0079 15.7341 17.7297C13.5497 14.1188 8.57472 12.1876 2.42784 12.5422C1.96941 12.5694 1.53689 12.7639 1.21231 13.0887C0.887725 13.4136 0.693655 13.8463 0.666904 14.3047C0.310654 20.4516 2.2419 25.4266 5.84972 27.611C7.07333 28.3568 8.47924 28.7499 9.91222 28.7469C11.1339 28.7371 12.3408 28.4782 13.4591 27.986L17.4982 32.0313V35.6251C17.4982 36.1223 17.6957 36.5993 18.0473 36.9509C18.399 37.3025 18.8759 37.5001 19.3732 37.5001C19.8704 37.5001 20.3473 37.3025 20.699 36.9509C21.0506 36.5993 21.2482 36.1223 21.2482 35.6251V31.0172C21.2443 29.3412 21.7626 27.7055 22.731 26.3376C24.2997 27.0807 26.0109 27.4746 27.7466 27.4922C29.6141 27.4965 31.4466 26.985 33.0419 26.0141C37.8497 23.1016 40.4294 16.3938 39.9388 8.07037ZM7.7919 24.4032C5.73097 23.1532 4.48253 20.1126 4.38097 16.2579C8.23565 16.3594 11.2778 17.6079 12.5263 19.6688C13.0145 20.4629 13.2148 21.4008 13.0935 22.3251L11.3232 20.5485C10.9709 20.1963 10.4932 19.9984 9.99503 19.9984C9.49689 19.9984 9.01915 20.1963 8.6669 20.5485C8.31466 20.9007 8.11678 21.3785 8.11678 21.8766C8.11678 22.3748 8.31466 22.8525 8.6669 23.2047L10.4388 24.9766C9.51702 25.0904 8.58391 24.8883 7.7919 24.4032ZM31.0997 22.8126C29.4341 23.8204 27.506 24.011 25.5044 23.4001L31.3247 17.5813C31.677 17.2291 31.8748 16.7513 31.8748 16.2532C31.8748 15.755 31.677 15.2773 31.3247 14.9251C30.9725 14.5728 30.4947 14.3749 29.9966 14.3749C29.4984 14.3749 29.0207 14.5728 28.6685 14.9251L22.8482 20.7438C22.2435 18.7501 22.4341 16.8141 23.4357 15.1563C25.42 11.8751 30.0997 10.0001 36.1419 10.0001H36.2482C36.27 16.0938 34.395 20.8094 31.0997 22.8126Z"
            fill="white"
          />
        </svg>
      ),
      label: "Purposeful",
    },
  ];

  const displayValues = values || defaultValues;

  return (
    <section className={`w-full bg-white py-16 md:py-20 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-[80px]">
        <div className="flex justify-center">
          <div
            style={{
              display: "flex",
              width: "1200px",
              maxWidth: "100%",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {/* Heading */}
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
                  alignSelf: "stretch",
                }}
              >
                {description}
              </p>
            )}

            {/* Icons Section */}
            {displayValues.length > 0 && (
              <div
                style={{
                  display: "flex",
                  padding: "30px",
                  alignItems: "center",
                  gap: "10px",
                  alignSelf: "stretch",
                }}
              >
                {/* Icons Container */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "120px",
                    width: "100%",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {displayValues.map((value, index) => {
                    const iconElement = renderIcon(value.icon, value.iconSvg);
                    const labelText = value.title || value.label || '';
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {/* Icon */}
                        {iconElement && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "80px",
                              height: "80px",
                              borderRadius: "50px",
                              background: iconBackground,
                            }}
                          >
                            {iconElement}
                          </div>
                        )}
                        {/* Label */}
                        {labelText && (
                          <span
                            style={{
                              fontFamily: "var(--font-bona-nova)",
                              fontSize: "18px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                              color: valueTitleColor,
                              textAlign: "center",
                            }}
                          >
                            {labelText}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

