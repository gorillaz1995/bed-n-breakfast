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
        start: "top 60%",
        once: true,
      },
    });

    // Animate bottles from far sides to their final positions
    tl.from(leftBottleRef.current, {
      x: "-300vw", // Start from far left
      opacity: 0,
      duration: 1.8,
      ease: "power3.out",
    })
      .from(
        rightBottleRef.current,
        {
          x: "300vw", // Start from far right
          opacity: 0,
          duration: 1.8,
          ease: "power3.out",
        },
        "<"
      ) // Start at same time as left bottle
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

    // Add hora dancing animation
    const horaTimeline = gsap.timeline({
      repeat: -1,
      ease: "none",
    });

    // Left bottle hora dance with pauses and varying intensity
    horaTimeline
      // First energetic dance sequence
      .to(leftBottleRef.current, {
        y: -25,
        rotation: 8,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(leftBottleRef.current, {
        y: 0,
        rotation: -8,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .repeat(3)
      // Take a breather
      .to(leftBottleRef.current, {
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power1.inOut",
      })
      // Gentle sway while resting
      .to(leftBottleRef.current, {
        rotation: 2,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
      })
      // Back to energetic dancing
      .to(leftBottleRef.current, {
        y: -30,
        rotation: 10,
        duration: 0.3,
        ease: "power3.out",
      })
      .to(leftBottleRef.current, {
        y: 0,
        rotation: -10,
        duration: 0.3,
        ease: "power3.out",
      })
      .repeat(-1);

    // Right bottle hora dance with complementary movements
    const rightBottleTimeline = gsap.timeline({
      repeat: -1,
      delay: 0.2,
    });

    rightBottleTimeline
      // Energetic sequence
      .to(rightBottleRef.current, {
        y: -28,
        rotation: -9,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(rightBottleRef.current, {
        y: 0,
        rotation: 9,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .repeat(3)
      // Rest period
      .to(rightBottleRef.current, {
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power1.inOut",
      })
      // Gentle movement while resting
      .to(rightBottleRef.current, {
        rotation: -3,
        duration: 0.7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 2,
      })
      // Return to vigorous dancing
      .to(rightBottleRef.current, {
        y: -32,
        rotation: -12,
        duration: 0.25,
        ease: "power3.out",
      })
      .to(rightBottleRef.current, {
        y: 0,
        rotation: 12,
        duration: 0.25,
        ease: "power3.out",
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen pb-10 px-4 md:px-8 lg:px-16 bg-[#E6BE8A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 relative flex justify-center items-center">
          <div className="relative w-full h-[400px] max-w-[800px]">
            <div
              ref={leftBottleRef}
              className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 w-[200px] h-[300px]"
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
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left text-[#013220]">
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
