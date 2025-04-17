"use client"

import { useCallback } from "react"
import { useRef, useEffect, useState, memo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { throttle } from "@/lib/utils"

// Memoized decorative SVG components
const FlowerSvg = memo(function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="40" r="3" fill="#edc3bf" opacity="0" />
    </svg>
  )
})

const RoseSvg = memo(function RoseSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 30C50 30 45 20 50 15C55 20 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 60 25 65 30C60 35 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 55 40 50 45C45 40 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 30C50 30 40 25 35 30C40 35 50 30 50 30Z"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M50 45V70"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="draw-path"
        d="M45 55L55 55"
        stroke="#edc3bf"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})

const RingsSvg = memo(function RingsSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle className="draw-path" cx="40" cy="50" r="15" stroke="#d4af37" strokeWidth="1.5" />
      <circle className="draw-path" cx="60" cy="50" r="15" stroke="#d4af37" strokeWidth="1.5" />
    </svg>
  )
})

const SparklesSvg = memo(function SparklesSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 20L53 40L73 43L53 46L50 66L47 46L27 43L47 40L50 20Z"
        stroke="#d4af37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="43" r="3" fill="#d4af37" opacity="0" />
    </svg>
  )
})

const OrnamentalLineSvg = memo(function OrnamentalLineSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="draw-path" d="M10 10H190" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
      <path
        className="draw-path"
        d="M30 5C30 5 35 10 40 10C45 10 50 5 50 5"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M30 15C30 15 35 10 40 10C45 10 50 15 50 15"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M150 5C150 5 155 10 160 10C165 10 170 5 170 5"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M150 15C150 15 155 10 160 10C165 10 170 15 170 15"
        stroke="#edc3bf"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle className="appear-element" cx="100" cy="10" r="3" fill="#edc3bf" opacity="0" />
      <circle className="appear-element" cx="10" cy="10" r="2" fill="#edc3bf" opacity="0" />
      <circle className="appear-element" cx="190" cy="10" r="2" fill="#edc3bf" opacity="0" />
    </svg>
  )
})

// Memoized content sections
const DressCodeSection = memo(function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      <div
        ref={decorRef}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <OrnamentalLineSvg className="w-full h-full" />
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white/30 group">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 flex-shrink-0 relative bg-gradient-to-br from-[#d4b08c]/20 to-[#edc3bf]/20 rounded-full p-1.5 backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <path
                  className="draw-path"
                  d="M50 20C50 20 30 30 30 50C30 70 50 80 50 80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="draw-path"
                  d="M50 20C50 20 70 30 70 50C70 70 50 80 50 80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  className="draw-path"
                  d="M30 40H70"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 3"
                />
                <path
                  className="draw-path"
                  d="M30 60H70"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 3"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-4 relative inline-flex">
              Código de Vestimenta
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4b08c]/0 via-[#d4b08c] to-[#d4b08c]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
            </h3>
            <p className="text-foreground mb-6 text-lg">
              Para hacer de este día algo especial, te pedimos que nos acompañes con vestimenta formal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4b08c]/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 7L12 3L4 7"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 7V17L12 21L4 17V7"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12L12 21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12L20 7"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 12L4 7"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] font-semibold">Caballeros</h4>
                </div>
                <p className="text-foreground">Traje formal o smoking, preferiblemente en tonos oscuros.</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#edc3bf]/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                        stroke="#edc3bf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="#edc3bf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                        stroke="#edc3bf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                        stroke="#edc3bf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#edc3bf] font-semibold">Damas</h4>
                </div>
                <p className="text-foreground">Vestido largo o cocktail, evitando el color blanco.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const AccommodationSection = memo(function AccommodationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      <div
        ref={decorRef}
        className="absolute -top-10 right-0 w-32 h-32 pointer-events-none transform rotate-45"
        style={{ zIndex: -1 }}
      >
        <FlowerSvg className="w-full h-full" />
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white/30 group">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 flex-shrink-0 relative bg-gradient-to-br from-[#d4b08c]/20 to-[#edc3bf]/20 rounded-full p-1.5 backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full svg-element"
              >
                <path
                  className="draw-path"
                  d="M20 80V40L50 20L80 40V80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M20 40L50 60L80 40"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M50 60V80"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="draw-path"
                  d="M35 70H65"
                  stroke="#d4b08c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-4 relative inline-flex">
              Hospedaje
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4b08c]/0 via-[#d4b08c] to-[#d4b08c]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
            </h3>
            <p className="text-foreground mb-6 text-lg">
              Para nuestros invitados que vienen de fuera, hemos conseguido tarifas especiales en los siguientes
              hoteles:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4b08c]/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 21H21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9H9.01"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 9H15.01"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] font-semibold">Hotel Las Palmas</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Ubicación:</span> A 5 minutos del lugar de la ceremonia
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 3v18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 3v18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 9h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 15h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 15h5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 9h5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Dirección:</span> Av. Principal 123, Ciudad Jardín
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Teléfono:</span> (123) 456-7890
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 12V8H6a2 2 0 100 4h14v4H6a2 2 0 100 4h14v-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Código de descuento:</span> BODAJP2025
                  </p>
                </div>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4b08c]/20 flex items-center justify-center mr-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 21H21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9H9.01"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 9H15.01"
                        stroke="#d4b08c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] font-semibold">
                    Hotel Vista Hermosa
                  </h4>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Ubicación:</span> A 10 minutos del lugar de la ceremonia
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 3v18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 3v18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 9h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 15h8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 15h5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 9h5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Dirección:</span> Calle Secundaria 456, Ciudad Jardín
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Teléfono:</span> (123) 456-7891
                  </p>
                  <p className="text-foreground flex items-center">
                    <span className="w-5 h-5 inline-flex items-center justify-center mr-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 12V8H6a2 2 0 100 4h14v4H6a2 2 0 100 4h14v-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">Código de descuento:</span> BODAJP2025
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <p className="text-foreground italic flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Menciona que vienes a nuestra boda al hacer tu reservación para obtener la tarifa especial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const SpecialConsiderationsSection = memo(function SpecialConsiderationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !decorRef.current) return

    const section = sectionRef.current
    const decorElements = decorRef.current.querySelectorAll(".draw-path")
    const appearElements = decorRef.current.querySelectorAll(".appear-element")

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate the section
    tl.fromTo(section, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0)

    // Animate the decorative elements
    decorElements.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.3,
      )
    })

    // Animate the appear elements
    tl.to(
      appearElements,
      {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      1,
    )

    return () => {
      if (tl) tl.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className="mb-12 relative overflow-hidden">
      <div
        ref={decorRef}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <OrnamentalLineSvg className="w-full h-full" />
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:bg-white/30 group">
        <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-6 text-center relative inline-flex mx-auto">
          Consideraciones Especiales
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4b08c]/0 via-[#d4b08c] to-[#d4b08c]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#edc3bf]/20 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 16V12" stroke="#edc3bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M12 8H12.01"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-[#edc3bf] font-semibold">Clima</h4>
            </div>
            <p className="text-foreground">
              La ceremonia y recepción serán al aire libre. Te recomendamos traer un abrigo ligero para la noche, ya que
              la temperatura puede descender.
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#edc3bf]/20 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-[#edc3bf] font-semibold">Fotografías</h4>
            </div>
            <p className="text-foreground">
              Contaremos con fotógrafos profesionales. Te pedimos que evites usar flash durante la ceremonia y que
              compartas tus fotos con el hashtag #JessicaYPablo2025.
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#edc3bf]/20 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-[#edc3bf] font-semibold">Niños</h4>
            </div>
            <p className="text-foreground">
              Amamos a los pequeños, pero para que todos puedan disfrutar de la celebración, hemos decidido que sea un
              evento solo para adultos. Gracias por tu comprensión.
            </p>
          </div>
          <div className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/20 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/40">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#edc3bf]/20 flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15L17 21H7L12 15Z"
                    stroke="#edc3bf"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-xl text-[#edc3bf] font-semibold">Estacionamiento</h4>
            </div>
            <p className="text-foreground">
              El lugar cuenta con estacionamiento gratuito para nuestros invitados. Te recomendamos llegar con tiempo
              suficiente para encontrar lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default function InfoTabContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const animationsSetupRef = useRef(false)

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }, 16), // ~60fps
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || animationsSetupRef.current) return

    animationsSetupRef.current = true

    // Collect all parallax elements for better performance
    if (containerRef.current) {
      parallaxElementsRef.current = Array.from(
        containerRef.current.querySelectorAll("[data-parallax]"),
      ) as HTMLElement[]
    }

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize SVG animations
    const svgElements = containerRef.current.querySelectorAll(".svg-element")

    svgElements.forEach((element) => {
      const paths = element.querySelectorAll(".draw-path")

      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
      })
    })

    // Add decorative floating elements
    const floatingElements = containerRef.current.querySelectorAll(".floating-element")

    floatingElements.forEach((element) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (parallaxElementsRef.current.length === 0) return

    parallaxElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.parallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  return (
    <div className="bg-tertiary/10 rounded-xl p-4 md:p-6 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(212,175,55,0.15)] glass-effect">
      {/* Background decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 opacity-10 floating-element" data-parallax="0.2">
          <RingsSvg className="w-full h-full" />
        </div>

        <div className="absolute bottom-40 right-20 w-32 h-32 opacity-10 floating-element" data-parallax="0.15">
          <FlowerSvg className="w-full h-full" />
        </div>

        <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10 floating-element" data-parallax="0.25">
          <SparklesSvg className="w-full h-full" />
        </div>

        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 opacity-10 floating-element" data-parallax="0.3">
          <RoseSvg className="w-full h-full" />
        </div>
      </div>

      {/* Title with decorative elements */}
      <div className="relative mb-8 text-center">
        <div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 pointer-events-none"
          style={{ zIndex: -1 }}
        >
          <OrnamentalLineSvg className="w-full h-full" />
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-2 relative inline-block">
          Información Importante
          <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
        </h2>

        <p className="text-foreground mt-4 max-w-2xl mx-auto">
          Aquí encontrarás todos los detalles que necesitas saber para acompañarnos en nuestro día especial. Por favor,
          lee atentamente esta información para que puedas disfrutar al máximo de nuestra celebración.
        </p>
      </div>

      {/* Content sections */}
      <DressCodeSection />
      <AccommodationSection />
      <SpecialConsiderationsSection />

      {/* Final decorative element */}
      <div className="text-center relative mt-12">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10"
          data-parallax="0.2"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>
        <div className="inline-block relative">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20H70" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="40" cy="20" r="3" fill="#edc3bf" />
            <circle cx="10" cy="20" r="2" fill="#edc3bf" />
            <circle cx="70" cy="20" r="2" fill="#edc3bf" />
          </svg>
        </div>
        <p className="font-['Cormorant_Garamond'] text-xl text-[#d4b08c] mt-4">¡Esperamos verte pronto!</p>
      </div>
    </div>
  )
}
