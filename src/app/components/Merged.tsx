"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import Seasons from "./Seasons";

export default function Merged() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const seasonsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for main animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      },
    });

    tl.from(seasonsRef.current, {
      yPercent: 100,
      duration: 1,
      ease: "none",
    }).to(
      heroRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "none",
      },
      0 // Start fading immediately when second section appears
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={heroRef} className="absolute inset-0" style={{ zIndex: 1 }}>
        <Hero />
      </div>
      <div
        ref={seasonsRef}
        className="absolute inset-0 bg-[#FFFFF0]"
        style={{ zIndex: 2 }}
      >
        <Seasons />
      </div>
    </div>
  );
}
