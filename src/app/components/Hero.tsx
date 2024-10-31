"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handle initial check and window resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    // Check on mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Preload video when component mounts and is mobile
    if (videoRef.current && isMobile) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [isMobile]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Media */}
      {isMobile ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          preload="auto"
        >
          <source src="/mock2.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/hero2.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay with gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/0" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="absolute top-[2%] left-1/2 transform -translate-x-1/2">
          <div className="relative w-80 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
            <Image
              src="/logo_w.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
              loading="eager"
            />
          </div>
        </div>

        <div className="text-center text-white mt-24 sm:mt-32">
          <h1 className="text-3xl  md:text-6xl font-cinzel">
            Te asteapta cu drag, in inima Maramuresului
          </h1>
          <p className="mt-5 text-md md:text-2xl max-w-4xl mx-auto font-fauna-one">
            Un refugiu in mijlocul naturii.<br></br>Liniste, bucate alese si
            voie buna!
          </p>
        </div>
      </div>
    </section>
  );
}
