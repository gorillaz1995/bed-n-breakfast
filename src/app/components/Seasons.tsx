"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Seasons() {
  const [isWinter, setIsWinter] = useState(true);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "40% center",
        once: true,
      },
    });

    tl.from([headingRef.current, paragraphRef.current], {
      y: 100,
      opacity: 0,
      duration: 1.8,
      ease: "power3.out",
      stagger: 0.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWinter((prev) => !prev);
    }, 2500); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 lg:flex lg:items-center overflow-hidden bg-[#013220] pb-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:scale-125 lg:transform lg:origin-center">
        <div
          className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden max-w-[800px] max-h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300"
          style={{
            animation: "float 6s ease-in-out infinite",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
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
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: isWinter ? 1 : 0 }}
            >
              <Image
                src="/iarna.webp"
                alt="Iarna la Duparaz"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover"
                priority
              />
            </div>
            <div
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: isWinter ? 0 : 1 }}
            >
              <Image
                src="/vara.webp"
                alt="Vara la Duparaz"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2
            ref={headingRef}
            className="text-4xl md:text-4xl lg:text-4xl font-cinzel mb-6 text-[#F7D917]"
          >
            Refugiul tău în orice anotimp
          </h2>
          <p
            ref={paragraphRef}
            className="text-md md:text-lg lg:text-lg font-fauna-one leading-relaxed text-[#D4AF37]"
            style={{
              textShadow: "0 0 3px rgba(247, 217, 23, 0.3)",
              animation: "textGlow 2s ease-in-out infinite",
            }}
          >
            Timpul trece, dar frumusetea este vesnic prezenta aici. Verdele crud
            al primaverii sau albul pur al iernii te va fermeca indiferent de
            anotimp.<br></br>Te invitam la o sedinta foto in straie traditionale
            din Maramures; fie ca esti baiat sau fata, mic sau mare avem toate
            marimile!
          </p>
        </div>
      </div>
    </section>
  );
}
