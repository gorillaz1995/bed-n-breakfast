"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./Hero";
import Seasons from "./Seasons";
import Food from "./Food";

export default function Merged() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const seasonsRef = useRef(null);
  const foodRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for main animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=360%",
        pin: true,
        scrub: 1,
      },
    });

    tl.from(seasonsRef.current, {
      yPercent: 100,
      duration: 1,
      ease: "none",
    })
      .to(
        heroRef.current,
        {
          backgroundColor: "#013220",
          opacity: 0,
          duration: 0.5,
          ease: "none",
          background: "#013220",
        },
        0
      )
      .from(
        foodRef.current,
        {
          yPercent: 100,
          duration: 1,
          ease: "none",
        },
        1
      )
      .to(
        seasonsRef.current,
        {
          backgroundColor: "#013220",
          opacity: 0,
          duration: 0.5,
          ease: "none",
          background: "#013220",
        },
        1
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      style={{ background: "#013220" }}
    >
      <div
        ref={heroRef}
        className="absolute inset-0"
        style={{ zIndex: 1, background: "#013220" }}
      >
        <Hero />
      </div>
      <div
        ref={seasonsRef}
        className="absolute inset-0"
        style={{ zIndex: 2, background: "#013220" }}
      >
        <Seasons />
      </div>
      <div
        ref={foodRef}
        className="absolute inset-0"
        style={{ zIndex: 3, background: "#013220" }}
      >
        <Food />
      </div>
    </div>
  );
}
