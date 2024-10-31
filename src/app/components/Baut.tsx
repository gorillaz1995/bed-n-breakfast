"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Baut() {
  const sectionRef = useRef(null);
  const leftBottleRef = useRef(null);
  const rightBottleRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "40% center",
        once: true,
      },
    });

    // Animate bottles first
    tl.from([leftBottleRef.current, rightBottleRef.current], {
      x: (index) => (index === 0 ? "-100%" : "100%"),
      opacity: 0,
      duration: 1.8,
      ease: "power3.out",
      stagger: 0.2,
    })
      // Then animate text elements
      .from(
        [headingRef.current, paragraphRef.current, taglineRef.current],
        {
          y: 100,
          opacity: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=1"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen pb-10 px-4 md:px-8 lg:px-16 bg-[#FFFFF0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative flex justify-center items-center">
          <div className="relative w-full h-[400px] max-w-[800px]">
            <div
              ref={leftBottleRef}
              className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 w-[200px] h-[300px]"
              style={{
                animation: "float 6s ease-in-out infinite",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
              }}
            >
              <Image
                src="/sticla3.webp"
                alt="Sticlă tradițională stânga"
                fill
                className="object-contain"
                sizes="200px"
                priority
              />
            </div>
            <div
              ref={rightBottleRef}
              className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-[200px] h-[300px]"
              style={{
                animation: "float 6s ease-in-out infinite",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                animationDelay: "0.5s",
              }}
            >
              <Image
                src="/sticla2.webp"
                alt="Sticlă tradițională dreapta"
                fill
                className="object-contain"
                sizes="200px"
                priority
              />
            </div>
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
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-cinzel mb-6"
          >
            Gustă esența Maramureșului
          </h2>
          <p
            ref={paragraphRef}
            className="text-lg md:text-xl font-fauna-one leading-relaxed mb-6"
          >
            Băuturile tradiționale ale Maramureșului - horinca, pălinca și țuica
            - poartă arome autentice și sunt distilate cu grijă. Sticlele
            artizanale adaugă un farmec aparte fiecărei picături.
          </p>
          <p ref={taglineRef} className="text-xl md:text-2xl font-cinzel">
            Vino să descoperi gusturile autentice ale Maramureșului!
          </p>
        </div>
      </div>
    </section>
  );
}
