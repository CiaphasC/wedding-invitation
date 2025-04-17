"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import WeddingRingsAnimation from "@/components/ui/wedding-rings-animation"

interface CoupleNamesDisplayProps {
  bride: string
  groom: string
  brideParents?: string
  groomParents?: string
}

export default function CoupleNamesDisplay({
  bride = "Jessica",
  groom = "Pablo",
  brideParents,
  groomParents,
}: CoupleNamesDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const brideCardRef = useRef<HTMLDivElement>(null)
  const groomCardRef = useRef<HTMLDivElement>(null)
  const decorationsRef = useRef<HTMLDivElement>(null)
  const petalsRef = useRef<HTMLDivElement>(null)
  const [petalPositions, setPetalPositions] = useState<Array<{ x: number; y: number; rotation: number }>>([])
  const [initialized, setInitialized] = useState(false)

  // Generar colores de pétalos con variaciones sutiles
  const petalColors = [
    { fill: "#edc3bf", stroke: "#e8b4b0" },
    { fill: "#e8c4c4", stroke: "#d9b5b5" },
    { fill: "#f8d7d5", stroke: "#e9c8c6" },
    { fill: "#f5c4c8", stroke: "#e6b5b9" },
    { fill: "#f0d4d1", stroke: "#e1c5c2" },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize petal positions if not already done
    if (!initialized && petalsRef.current) {
      const petals = petalsRef.current.querySelectorAll(".petal")
      const initialPositions = Array.from(petals).map(() => ({
        x: 0,
        y: 0,
        rotation: Math.random() * 360,
      }))
      setPetalPositions(initialPositions)
      setInitialized(true)
    }

    // Animación inicial
    const tl = gsap.timeline({ delay: 0.5 })

    // Animar las tarjetas de los nombres con efecto 3D mejorado
    tl.fromTo(
      [brideCardRef.current, groomCardRef.current],
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
        rotationX: -20,
        transformPerspective: 1000,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
    )

    // Animar los ornamentos SVG
    if (decorationsRef.current) {
      const paths = decorationsRef.current.querySelectorAll("path")
      const circles = decorationsRef.current.querySelectorAll("circle")

      // Configurar los paths para la animación de dibujo
      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        })
      })

      // Configurar los círculos
      gsap.set(circles, {
        scale: 0,
        opacity: 0,
      })

      // Animar los paths con efecto de dibujo
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        "-=0.5",
      )

      // Animar los círculos
      tl.to(
        circles,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(2)",
        },
        "-=1",
      )
    }

    // Animar pétalos flotantes
    if (petalsRef.current && !initialized) {
      const petals = petalsRef.current.querySelectorAll(".petal")

      gsap.set(petals, {
        opacity: 0,
        scale: 0,
        rotation: () => Math.random() * 360,
      })

      tl.to(
        petals,
        {
          opacity: 0.8,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=1",
      )

      // Animación continua de los pétalos
      petals.forEach((petal, index) => {
        gsap.to(petal, {
          y: `random(-20, 20)`,
          x: `random(-20, 20)`,
          rotation: `+=${Math.random() * 40 - 20}`,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      })
    }

    // Efectos continuos para las flores
    gsap.to(".floating-flower", {
      y: "random(-15, 15)",
      x: "random(-15, 15)",
      rotation: "random(-10, 10)",
      duration: "random(4, 7)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    })

    // Efecto de brillo para los nombres
    gsap.to(".name-text", {
      backgroundPosition: "200% center",
      duration: 4,
      repeat: -1,
      ease: "linear",
    })

    // Animar los pétalos que caen
    gsap.utils.toArray(".falling-petal").forEach((petal: any) => {
      const speed = 10 + Math.random() * 20
      const rotation = Math.random() * 360
      const xMovement = Math.random() * 100 - 50

      gsap.fromTo(
        petal,
        {
          y: -100,
          x: Math.random() * window.innerWidth,
          rotation: rotation,
          opacity: 0.7,
        },
        {
          y: window.innerHeight + 100,
          x: `+=${xMovement}`,
          rotation: rotation + Math.random() * 360,
          duration: speed,
          repeat: -1,
          delay: Math.random() * 10,
          ease: "none",
          onRepeat: () => {
            gsap.set(petal, {
              y: -100,
              x: Math.random() * window.innerWidth,
              rotation: Math.random() * 360,
            })
          },
        },
      )
    })

    // Efecto parallax en hover - solo para dispositivos no táctiles
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        // Mover las tarjetas con efecto 3D mejorado
        gsap.to([brideCardRef.current, groomCardRef.current], {
          x: (i) => x * (i === 0 ? -25 : 25),
          y: y * 15,
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.8,
          ease: "power2.out",
          transformPerspective: 1000,
        })

        // Mover las flores con efecto parallax por capas
        gsap.to(".floating-flower", {
          x: (i) => x * (30 + i * 8),
          y: (i) => y * (30 + i * 8),
          rotation: x * 15,
          duration: 1,
          ease: "power2.out",
        })

        // Mover los pétalos con más intensidad pero mantener su posición relativa
        if (petalsRef.current) {
          const petals = petalsRef.current.querySelectorAll(".petal")

          petals.forEach((petal, index) => {
            // Obtener la posición actual del pétalo
            const currentPosition = petalPositions[index] || { x: 0, y: 0, rotation: 0 }
            const depth = 0.5 + (index % 5) * 0.2 // Diferentes profundidades para efecto parallax

            // Aplicar el efecto parallax manteniendo la posición base
            gsap.to(petal, {
              x: currentPosition.x + x * (40 + index * 10) * depth,
              y: currentPosition.y + y * (40 + index * 10) * depth,
              rotation: currentPosition.rotation + x * 25 * depth,
              duration: 1.2,
              ease: "power1.out",
            })
          })
        }

        // Mover los elementos decorativos con efecto parallax
        gsap.to(".decor-element", {
          x: (i) => x * (20 + i * 15),
          y: (i) => y * (20 + i * 15),
          rotation: x * 10,
          duration: 1.2,
          ease: "power2.out",
        })

        // Mover las líneas decorativas
        gsap.to(".decor-line", {
          x: x * 10,
          scaleX: 1 + Math.abs(x) * 0.1,
          duration: 1,
          ease: "power2.out",
        })
      }

      containerRef.current.addEventListener("mousemove", handleMouseMove)

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("mousemove", handleMouseMove)
        }
        gsap.killTweensOf(".name-text")
        gsap.killTweensOf(".floating-flower")
        gsap.killTweensOf(".petal")
        gsap.killTweensOf(".falling-petal")
        gsap.killTweensOf(".decor-element")
        gsap.killTweensOf(".decor-line")
      }
    }
  }, [initialized, petalPositions])

  // Función para generar un pétalo SVG aleatorio
  const renderRandomPetal = (index: number) => {
    const petalType = Math.floor(Math.random() * 4)
    const colorIndex = Math.floor(Math.random() * petalColors.length)
    const color = petalColors[colorIndex]

    switch (petalType) {
      case 0: // Pétalo simple
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill={color.fill}
              fillOpacity={0.3 + Math.random() * 0.4}
              stroke={color.stroke}
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
          </svg>
        )
      case 1: // Pétalo con nervadura
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill={color.fill}
              fillOpacity={0.3 + Math.random() * 0.4}
              stroke={color.stroke}
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
            <path
              d="M50 10C50 10 40 30 40 50C40 70 30 70 30 70"
              stroke={color.stroke}
              strokeWidth="0.3"
              strokeDasharray="1 2"
              opacity="0.6"
            />
          </svg>
        )
      case 2: // Pétalo redondeado
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C70 20 80 40 80 50C80 70 60 80 50 80C30 80 20 60 20 50C20 30 40 20 50 20Z"
              fill={color.fill}
              fillOpacity={0.3 + Math.random() * 0.4}
              stroke={color.stroke}
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
          </svg>
        )
      case 3: // Pétalo con brillo
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill={color.fill}
              fillOpacity={0.3 + Math.random() * 0.4}
              stroke={color.stroke}
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
            <path d="M40 30C40 30 45 35 45 40C45 45 40 50 35 45C30 40 35 35 40 30Z" fill="white" fillOpacity="0.4" />
          </svg>
        )
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto perspective-1000 py-6 md:py-10 overflow-hidden"
    >
      {/* Fondo decorativo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-rose/5 to-white/5 rounded-3xl"></div>

      {/* Línea decorativa central */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 decor-line bg-gradient-to-r from-transparent via-[#edc3bf]/50 to-transparent transform -translate-y-1/2"></div>

      {/* Pétalos flotantes */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pétalos alrededor - más cantidad y variedad */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`petal-${i}`}
            className={`absolute petal w-${3 + Math.floor(Math.random() * 4)} h-${3 + Math.floor(Math.random() * 4)}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: Math.random() > 0.5 ? 1 : -1,
              filter: `blur(${Math.random() > 0.8 ? "1px" : "0px"})`,
            }}
          >
            {renderRandomPetal(i)}
          </div>
        ))}

        {/* Pétalos que caen desde arriba */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`falling-petal-${i}`}
            className="absolute falling-petal w-4 h-4 md:w-6 md:h-6"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${20 + Math.random() * 10}px`,
              zIndex: 2,
              opacity: 0.7,
            }}
          >
            {renderRandomPetal(i)}
          </div>
        ))}
      </div>

      {/* Ornamentos decorativos SVG mejorados */}
      <div ref={decorationsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rosa superior izquierda con más detalles */}
        <svg
          className="absolute top-0 left-0 w-20 h-20 md:w-40 md:h-40 floating-flower decor-element hidden sm:block"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))" }}
        >
          <path
            d="M30 30C30 30 20 20 30 10C40 20 30 30 30 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow"
          />
          <path
            d="M30 30C30 30 40 20 50 30C40 40 30 30 30 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.2s]"
          />
          <path
            d="M30 30C30 30 20 40 30 50C40 40 30 30 30 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.4s]"
          />
          <path
            d="M30 30C30 30 40 40 50 30C40 20 30 30 30 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.6s]"
          />
          <circle cx="30" cy="30" r="2" fill="#edc3bf" className="animate-pulse-glow [animation-delay:0.8s]" />
          <path d="M30 50V70" stroke="#5e6e64" strokeWidth="1" strokeLinecap="round" />
          <path d="M28 60L32 60" stroke="#5e6e64" strokeWidth="1" strokeLinecap="round" />

          {/* Hojas adicionales */}
          <path
            d="M25 55C25 55 20 50 25 45C30 50 25 55 25 55Z"
            stroke="#5e6e64"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="#5e6e64"
            fillOpacity="0.2"
          />
          <path
            d="M35 55C35 55 40 50 35 45C30 50 35 55 35 55Z"
            stroke="#5e6e64"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="#5e6e64"
            fillOpacity="0.2"
          />
        </svg>

        {/* Rosa superior derecha con más detalles */}
        <svg
          className="absolute top-0 right-0 w-20 h-20 md:w-40 md:h-40 floating-flower decor-element hidden sm:block"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))" }}
        >
          <path
            d="M70 30C70 30 60 20 70 10C80 20 70 30 70 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow"
          />
          <path
            d="M70 30C70 30 80 20 90 30C80 40 70 30 70 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.2s]"
          />
          <path
            d="M70 30C70 30 60 40 70 50C80 40 70 30 70 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.4s]"
          />
          <path
            d="M70 30C70 30 80 40 90 30C80 20 70 30 70 30Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-pulse-glow [animation-delay:0.6s]"
          />
          <circle cx="70" cy="30" r="2" fill="#edc3bf" className="animate-pulse-glow [animation-delay:0.8s]" />
          <path d="M70 50V70" stroke="#5e6e64" strokeWidth="1" strokeLinecap="round" />
          <path d="M68 60L72 60" stroke="#5e6e64" strokeWidth="1" strokeLinecap="round" />

          {/* Hojas adicionales */}
          <path
            d="M65 55C65 55 60 50 65 45C70 50 65 55 65 55Z"
            stroke="#5e6e64"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="#5e6e64"
            fillOpacity="0.2"
          />
          <path
            d="M75 55C75 55 80 50 75 45C70 50 75 55 75 55Z"
            stroke="#5e6e64"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="#5e6e64"
            fillOpacity="0.2"
          />
        </svg>

        {/* Guirnalda floral superior mejorada */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-12 md:h-16 pointer-events-none">
          <svg viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M20,25 Q100,5 200,25 Q300,45 380,25"
              stroke="#5e6e64"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="draw-path"
            />

            {/* Flores en la guirnalda - más variedad */}
            <g transform="translate(50, 15)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#edc3bf"
                fillOpacity="0.7"
                className="animate-pulse-glow"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>

            <g transform="translate(100, 10)">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#e8c4c4"
                fillOpacity="0.7"
                className="animate-pulse-glow [animation-delay:0.3s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>

            <g transform="translate(150, 20)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#f5c4c8"
                fillOpacity="0.7"
                className="animate-pulse-glow [animation-delay:0.6s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>

            <g transform="translate(200, 25)">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#edc3bf"
                fillOpacity="0.7"
                className="animate-pulse-glow [animation-delay:0.9s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>

            <g transform="translate(250, 15)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#f0d4d1"
                fillOpacity="0.7"
                className="animate-pulse-glow [animation-delay:1.2s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>

            <g transform="translate(300, 10)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#e8c4c4"
                fillOpacity="0.7"
                className="animate-pulse-glow [animation-delay:1.5s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.7" />
            </g>
          </svg>
        </div>

        {/* Elementos decorativos adicionales */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 400 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M20,25 Q100,45 200,25 Q300,5 380,25"
              stroke="#5e6e64"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="draw-path"
            />

            {/* Flores decorativas inferiores */}
            <g transform="translate(80, 30)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#edc3bf"
                fillOpacity="0.6"
                className="animate-pulse-glow [animation-delay:0.2s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.6" />
            </g>

            <g transform="translate(320, 30)" className="hidden sm:block">
              <path
                d="M0,0 Q5,-5 10,0 Q15,5 10,10 Q5,15 0,10 Q-5,5 0,0Z"
                fill="#e8c4c4"
                fillOpacity="0.6"
                className="animate-pulse-glow [animation-delay:0.8s]"
              />
              <circle cx="5" cy="5" r="2" fill="#d4af37" fillOpacity="0.6" />
            </g>
          </svg>
        </div>
      </div>

      {/* Contenedor de las tarjetas - diseño responsivo mejorado */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 relative z-10">
        {/* Tarjeta de la novia con efectos mejorados */}
        <div
          ref={brideCardRef}
          className="couple-card w-full md:w-2/5 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-lg transform-gpu transition-all duration-500 hover:shadow-xl border border-rose/20 hover:border-rose/40 group"
        >
          <div className="text-center">
            <div className="mb-2 md:mb-4 relative">
              <svg
                className="absolute -top-6 md:-top-10 left-1/2 transform -translate-x-1/2 w-12 h-6 md:w-20 md:h-10 opacity-70"
                viewBox="0 0 80 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 20H70" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
                <circle cx="40" cy="20" r="3" fill="#edc3bf" className="animate-pulse-glow" />
                <circle cx="10" cy="20" r="2" fill="#edc3bf" />
                <circle cx="70" cy="20" r="2" fill="#edc3bf" />
              </svg>

              <h3 className="name-text font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 bg-gradient-to-r from-[#edc3bf] via-[#e8b4b0] to-[#edc3bf] bg-clip-text text-transparent bg-[length:200%_auto] transform-gpu transition-all duration-500 group-hover:scale-105">
                {bride}
              </h3>
            </div>

            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-2 md:mb-4 group-hover:w-24 md:group-hover:w-32 transition-all duration-500"></div>

            {brideParents && (
              <p className="text-foreground/80 text-sm md:text-base font-light italic transform-gpu transition-all duration-500 group-hover:text-foreground">
                {brideParents}
              </p>
            )}
          </div>
        </div>

        {/* Anillos de boda animados con efectos mejorados */}
        <div className="relative z-20 transform-gpu transition-all duration-500 hover:scale-110 my-2 md:my-0">
          <div className="absolute -inset-4 bg-gradient-to-r from-rose/10 via-gold/20 to-rose/10 rounded-full blur-md opacity-70 animate-pulse-slow"></div>
          <WeddingRingsAnimation />
        </div>

        {/* Tarjeta del novio con efectos mejorados */}
        <div
          ref={groomCardRef}
          className="couple-card w-full md:w-2/5 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-lg transform-gpu transition-all duration-500 hover:shadow-xl border border-rose/20 hover:border-rose/40 group"
        >
          <div className="text-center">
            <div className="mb-2 md:mb-4 relative">
              <svg
                className="absolute -top-6 md:-top-10 left-1/2 transform -translate-x-1/2 w-12 h-6 md:w-20 md:h-10 opacity-70"
                viewBox="0 0 80 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 20H70" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
                <circle cx="40" cy="20" r="3" fill="#edc3bf" className="animate-pulse-glow" />
                <circle cx="10" cy="20" r="2" fill="#edc3bf" />
                <circle cx="70" cy="20" r="2" fill="#edc3bf" />
              </svg>

              <h3 className="name-text font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 bg-gradient-to-r from-[#d4af37] via-[#f5e7b2] to-[#d4af37] bg-clip-text text-transparent bg-[length:200%_auto] transform-gpu transition-all duration-500 group-hover:scale-105">
                {groom}
              </h3>
            </div>

            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-2 md:mb-4 group-hover:w-24 md:group-hover:w-32 transition-all duration-500"></div>

            {groomParents && (
              <p className="text-foreground/80 text-sm md:text-base font-light italic transform-gpu transition-all duration-500 group-hover:text-foreground">
                {groomParents}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decoraciones de esquina */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,0 L40,0 Q30,10 20,20 Q10,30 0,40 Z" fill="url(#cornerGradient1)" className="opacity-30" />
          <defs>
            <linearGradient id="cornerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#edc3bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#edc3bf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M100,0 L60,0 Q70,10 80,20 Q90,30 100,40 Z" fill="url(#cornerGradient2)" className="opacity-30" />
          <defs>
            <linearGradient id="cornerGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#edc3bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#edc3bf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0,100 L40,100 Q30,90 20,80 Q10,70 0,60 Z" fill="url(#cornerGradient3)" className="opacity-30" />
          <defs>
            <linearGradient id="cornerGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#edc3bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#edc3bf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M100,100 L60,100 Q70,90 80,80 Q90,70 100,60 Z" fill="url(#cornerGradient4)" className="opacity-30" />
          <defs>
            <linearGradient id="cornerGradient4" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#edc3bf" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#edc3bf" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
