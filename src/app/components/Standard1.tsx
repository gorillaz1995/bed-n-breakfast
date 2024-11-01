"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ImageType {
  src: string;
  alt: string;
}

interface StandardProps {
  images: ImageType[];
  heading: string;
  paragraph: string;
  isAlternating?: boolean;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function Standard({
  images,
  heading,
  paragraph,
  isAlternating = false,
  backgroundColor = "#013220",
  textColor = "#F7D917",
  accentColor = "#D4AF37",
}: StandardProps) {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for heading and paragraph
    gsap.from([headingRef.current, paragraphRef.current], {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP animation for section stacking
  useEffect(() => {
    if (sectionRef.current) {
      const sections = gsap.utils.toArray(".stack-section");
      gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () =>
            "+=" + sectionRef.current!.offsetHeight * (sections.length - 1),
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stack-section w-full h-[110vh] flex items-center justify-center overflow-hidden pb-30"
      style={{ backgroundColor }}
    >
      <div
        className={`max-w-5xl mx-auto flex flex-col ${
          isAlternating ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-6 px-4`}
      >
        <div
          className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-lg"
          style={{
            height: "50vh",
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: currentImage === index ? 1 : 0 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-cinzel mb-4"
            style={{ color: textColor }}
          >
            {heading}
          </h2>
          <p
            ref={paragraphRef}
            className="text-base md:text-lg font-fauna-one leading-relaxed"
            style={{ color: accentColor }}
          >
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
