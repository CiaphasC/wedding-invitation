"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import HeartAnimation from "@/components/ui/heart-animation"

interface WeddingTitleProps {
  text?: string
  subtitle?: string
}

export default function WeddingTitle({
  text = "¡Nos casamos!",
  subtitle = "Celebremos juntos este momento especial",
}: WeddingTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !subtitleRef.current) return

    // Animación inicial
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" })

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6",
    )

    if (decorRef.current) {
      const decorElements = decorRef.current.querySelectorAll("path, circle")

      gsap.set(decorElements, {
        opacity: 0,
        scale: 0.8,
      })

      tl.to(
        decorElements,
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power1.out",
        },
        "-=0.8",
      )
    }

    // Efecto parallax para el título
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current || !decorRef.current) return

      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

      // Movimiento suave del título
      gsap.to(titleRef.current, {
        x: x * 15,
        y: y * 10,
        rotationY: x * 5,
        rotationX: -y * 5,
        duration: 1,
        ease: "power2.out",
      })

      // Movimiento de los elementos decorativos
      if (decorRef.current) {
        const elements = decorRef.current.querySelectorAll("svg")
        gsap.to(elements, {
          x: (i) => x * (10 + i * 5),
          y: (i) => y * (10 + i * 5),
          rotation: x * 5,
          duration: 1.2,
          ease: "power2.out",
        })
      }
    }

    // Solo añadir el evento en dispositivos no táctiles
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-6 md:py-10 px-4 perspective-1000">
      {/* Elementos decorativos de fondo */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="absolute top-1/4 left-1/4 w-16 h-16 opacity-10 hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 opacity-10 hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Animación de corazón encima del título */}
      <div className="relative mb-4 md:mb-6">
        <HeartAnimation className="transform-gpu hover:scale-110 transition-transform duration-300 w-16 h-16 md:w-20 md:h-20 mx-auto" />
      </div>

      {/* Título con efecto 3D */}
      <div className="relative mb-6 md:mb-8 perspective-1000">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-64 h-16 hidden md:block">
          <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
            <path d="M40 30H200" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
            <path d="M20 30H35" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M205 30H220" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" />
            <circle cx="120" cy="30" r="4" fill="#edc3bf" />
            <circle cx="20" cy="30" r="2" fill="#edc3bf" />
            <circle cx="220" cy="30" r="2" fill="#edc3bf" />
          </svg>
        </div>

        <h1
          ref={titleRef}
          className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#7d6a5b] relative z-10"
        >
          <span className="relative inline-block">
            {text}
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
          </span>
        </h1>

        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-2xl opacity-10 bg-gradient-radial from-[#edc3bf] to-transparent"></div>
      </div>

      <p ref={subtitleRef} className="text-center text-[#7d6a5b]/80 italic text-base md:text-lg max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  )
}
