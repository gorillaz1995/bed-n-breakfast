"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Food() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageHeight, setImageHeight] = useState("auto");
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);

  const images = [
    {
      src: "/has.webp",
      alt: "Mâncare tradițională maramureșeană",
    },
    {
      src: "/mancare1.webp",
      alt: "Preparate tradiționale",
    },
    {
      src: "/mancare2.webp",
      alt: "Bucătărie maramureșeană",
    },
    {
      src: "/mancare3.webp",
      alt: "Specialități locale",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    tl.from([headingRef.current, paragraphRef.current], {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleResize = () => {
      setImageHeight(
        window.innerWidth < 1000 ? "calc(56.25vw * 1.25)" : "auto"
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 overflow-hidden relative before:content-[''] before:absolute before:inset-0 before:bg-[#013220] before:h-[90%] before:z-[-1] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[20%] after:bg-gradient-to-b after:from-[#013220] after:to-[#E6BE8A] after:z-[-1]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            ref={headingRef}
            className="font-cinzel text-3xl md:text-4xl lg:text-5xl mb-6 text-[#F7D917]"
          >
            Descoperă gusturile autentice ale Maramureșului
          </h2>
          <p
            ref={paragraphRef}
            className="font-fauna-one text-lg md:text-xl text-[#D4AF37] max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: "0 0 3px rgba(247, 217, 23, 0.3)",
              animation: "textGlow 2s ease-in-out infinite",
            }}
          >
            Bucură-te de preparate tradiționale pregătite cu grijă, folosind
            ingrediente proaspete din inima munților. Carnea de cea mai bună
            calitate, crescută natural, și legumele alese, transformă fiecare
            masă într-o adevărată călătorie culinară în spiritul autentic al
            Maramureșului. Aici, tradiția începe cu pământul și se termină cu
            gustul desăvârșit al bucatelor noastre.
          </p>
        </div>

        <div
          className="w-full max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-shadow duration-300"
          style={{
            animation: "float 6s ease-in-out infinite",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
            aspectRatio: "16/9",
            height: imageHeight,
          }}
        >
          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-15px);
              }
              100% {
                transform: translateY(0px);
              }
            }
          `}</style>
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
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
