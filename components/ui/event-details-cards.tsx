"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Calendar, Clock, MapPin } from "lucide-react"

// Add the import for OrnamentalElements at the top of the file
import OrnamentalElements from "@/components/ui/ornamental-elements"

// Importamos el plugin DrawSVG de GSAP
// Nota: En un proyecto real, necesitarías registrar este plugin con GSAP.registerPlugin(DrawSVG)
// y asegurarte de que esté instalado correctamente

export default function EventDetailsCards() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgLinesRef = useRef<SVGPathElement[]>([])
  const roseDecorationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current || !containerRef.current) return

    // Inicializar el plugin DrawSVG (simulado aquí)
    // En un proyecto real, usarías: gsap.registerPlugin(DrawSVG)

    // Animación de entrada para las tarjetas
    gsap.fromTo(
      cardsRef.current.querySelectorAll(".info-card"),
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    // Animación para las líneas SVG decorativas
    if (svgLinesRef.current.length > 0) {
      svgLinesRef.current.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100

        // Configuración inicial
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.3,
        })

        // Animación de dibujo
        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        })
      })
    }

    // Animación para las decoraciones de rosas
    if (roseDecorationsRef.current) {
      const roses = roseDecorationsRef.current.querySelectorAll(".rose-decoration")

      gsap.fromTo(
        roses,
        { scale: 0, opacity: 0, rotation: -30 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )

      // Animación continua para las rosas
      roses.forEach((rose) => {
        gsap.to(rose, {
          y: "random(-10, 10)",
          x: "random(-5, 5)",
          rotation: "random(-10, 10)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      })
    }

    // Efecto parallax para las tarjetas - solo en dispositivos no táctiles
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardsRef.current) return

        const rect = containerRef.current!.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        // Movimiento de las tarjetas
        gsap.to(cardsRef.current.querySelectorAll(".info-card"), {
          y: (i) => y * (5 + i * 2),
          x: (i) => x * (5 + i * 2),
          rotationY: x * 3,
          rotationX: -y * 3,
          duration: 1,
          ease: "power2.out",
        })

        // Movimiento de las decoraciones de rosas
        if (roseDecorationsRef.current) {
          gsap.to(roseDecorationsRef.current.querySelectorAll(".rose-decoration"), {
            y: (i) => y * (15 + i * 5),
            x: (i) => x * (15 + i * 5),
            rotation: (i) => x * (5 + i * 2),
            duration: 1.2,
            ease: "power2.out",
          })
        }
      }

      containerRef.current.addEventListener("mousemove", handleMouseMove)

      return () => {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Función para renderizar una rosa SVG
  const renderRose = (className: string) => (
    <div className={`rose-decoration ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          className="rose-petal"
          d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
          stroke="#e8c4c4"
          strokeWidth="1.5"
          fill="#e8c4c4"
          fillOpacity="0.2"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
          stroke="#e8c4c4"
          strokeWidth="1.5"
          fill="#e8c4c4"
          fillOpacity="0.2"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 40 40 50 50C60 40 50 30 50 30Z"
          stroke="#e8c4c4"
          strokeWidth="1.5"
          fill="#e8c4c4"
          fillOpacity="0.2"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 60 40 70 30C60 20 50 30 50 30Z"
          stroke="#e8c4c4"
          strokeWidth="1.5"
          fill="#e8c4c4"
          fillOpacity="0.2"
        />
        <path className="rose-stem" d="M50 50V80" stroke="#5e6e64" strokeWidth="1.5" />
        <path
          className="rose-leaf"
          d="M50 65C50 65 40 60 35 65C40 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.2"
        />
        <path
          className="rose-leaf"
          d="M50 65C50 65 60 60 65 65C60 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  )

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 mb-8 md:mb-12 perspective-1000">
      <OrnamentalElements />
      {/* Contenedor principal con fondo degradado */}
      <div
        ref={cardsRef}
        className="bg-gradient-to-br from-white/90 via-white/90 to-white/85 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-rose/10 relative overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bordes decorativos con gradiente */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#e8c4c4] to-transparent animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-shimmer"></div>

        {/* Líneas decorativas SVG que se dibujan a sí mismas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              ref={(el) => el && svgLinesRef.current.push(el)}
              d="M10,10 Q50,20 90,10"
              stroke="#e8c4c4"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="1 3"
              className="absolute top-0"
            />
            <path
              ref={(el) => el && svgLinesRef.current.push(el)}
              d="M10,90 Q50,80 90,90"
              stroke="#d4af37"
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="1 3"
              className="absolute bottom-0"
            />
            <path
              ref={(el) => el && svgLinesRef.current.push(el)}
              d="M50,10 Q60,50 50,90"
              stroke="#e8c4c4"
              strokeWidth="0.3"
              fill="none"
              strokeDasharray="1 2"
              className="absolute"
            />
          </svg>
        </div>

        {/* Elementos decorativos de fondo */}
        <div className="absolute top-10 left-10 w-20 h-20 opacity-5 animate-spin-slow hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="absolute bottom-10 right-10 w-20 h-20 opacity-5 animate-spin-slow-reverse hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#e8c4c4" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        {/* Decoraciones de rosas en los costados - visibles en móvil y escritorio */}
        <div ref={roseDecorationsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Rosas para móvil - más prominentes */}
          {renderRose("absolute -left-6 top-1/4 w-16 h-16 md:hidden opacity-70")}
          {renderRose("absolute -right-6 top-2/4 w-16 h-16 md:hidden opacity-70")}
          {renderRose("absolute -left-6 bottom-1/4 w-16 h-16 md:hidden opacity-70")}
          {renderRose("absolute -right-6 bottom-1/3 w-16 h-16 md:hidden opacity-70")}

          {/* Rosas para escritorio - más sutiles */}
          {renderRose("absolute left-4 top-4 w-12 h-12 hidden md:block opacity-50")}
          {renderRose("absolute right-4 top-4 w-12 h-12 hidden md:block opacity-50")}
          {renderRose("absolute left-4 bottom-4 w-12 h-12 hidden md:block opacity-50")}
          {renderRose("absolute right-4 bottom-4 w-12 h-12 hidden md:block opacity-50")}

          {/* Rosas adicionales para escritorio */}
          {renderRose("absolute left-1/4 top-2 w-10 h-10 hidden md:block opacity-40")}
          {renderRose("absolute right-1/4 bottom-2 w-10 h-10 hidden md:block opacity-40")}
        </div>

        {/* Título de la sección para móvil */}
        <div className="mb-6 text-center md:hidden">
          <h3 className="font-['Cormorant_Garamond'] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#e8c4c4] to-[#d4af37] animate-text-gradient">
            Detalles del Evento
          </h3>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#e8c4c4] to-transparent mx-auto mt-2"></div>
        </div>

        {/* Diseño para móviles: vertical con tarjetas más grandes, para escritorio: horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fecha */}
          <div className="info-card glass-effect rounded-lg p-5 md:p-6 shadow-md transform-gpu transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white/95 border border-[#e8c4c4]/20 hover:border-[#e8c4c4]/50 group animate-border-pulse">
            {/* Diseño para móviles: horizontal con icono a la izquierda */}
            <div className="flex md:flex-col items-center md:items-center">
              <div className="relative overflow-hidden rounded-full w-20 h-20 md:w-16 md:h-16 flex-shrink-0 md:mx-auto md:mb-4 bg-gradient-to-br from-[#e8c4c4]/10 to-white/80 flex items-center justify-center group-hover:shadow-lg transition-all duration-500 border border-[#e8c4c4]/30 group-hover:border-[#e8c4c4]/70">
                {/* Efectos de fondo para el icono */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8c4c4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 animate-pulse-glow opacity-0 group-hover:opacity-40 bg-[#e8c4c4]/30 rounded-full blur-md"></div>
                <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-30">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" stroke="#e8c4c4" strokeWidth="1" strokeDasharray="1 3" />
                  </svg>
                </div>

                {/* Icono con efectos */}
                <Calendar className="w-10 h-10 md:w-8 md:h-8 text-[#e8c4c4] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_8px_rgba(232,196,196,0.8)] z-10" />

                {/* Destellos alrededor del icono */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#e8c4c4] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"></div>
                <div
                  className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-[#e8c4c4] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              <div className="ml-6 md:ml-0 flex-1 md:text-center">
                <h4 className="font-['Cormorant_Garamond'] text-2xl md:text-xl text-[#e8c4c4] font-semibold mb-1 md:mb-2 group-hover:text-[#e8c4c4] transition-colors duration-500 drop-shadow-sm">
                  Fecha
                </h4>

                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#e8c4c4]/50 to-transparent hidden md:mx-auto md:block mb-2 group-hover:w-16 transition-all duration-300"></div>

                <p className="text-foreground/80 text-lg md:text-base group-hover:text-foreground transition-colors duration-500">
                  Sábado 2 de agosto del 2025
                </p>
              </div>
            </div>

            {/* Decoración floral en la esquina - solo visible en hover */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M70 70C70 70 60 60 70 50C80 60 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 60 90 70C80 80 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 60 80 70 90C80 80 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 80 90 70C80 60 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
          </div>

          {/* Hora */}
          <div className="info-card glass-effect rounded-lg p-5 md:p-6 shadow-md transform-gpu transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white/95 border border-[#d4af37]/20 hover:border-[#d4af37]/50 group animate-border-pulse">
            {/* Diseño para móviles: horizontal con icono a la izquierda */}
            <div className="flex md:flex-col items-center md:items-center">
              <div className="relative overflow-hidden rounded-full w-20 h-20 md:w-16 md:h-16 flex-shrink-0 md:mx-auto md:mb-4 bg-gradient-to-br from-[#d4af37]/10 to-white/80 flex items-center justify-center group-hover:shadow-lg transition-all duration-500 border border-[#d4af37]/30 group-hover:border-[#d4af37]/70">
                {/* Efectos de fondo para el icono */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 animate-pulse-glow opacity-0 group-hover:opacity-40 bg-[#d4af37]/30 rounded-full blur-md"></div>
                <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-30">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
                  </svg>
                </div>

                {/* Icono con efectos */}
                <Clock className="w-10 h-10 md:w-8 md:h-8 text-[#d4af37] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] z-10" />

                {/* Destellos alrededor del icono */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"></div>
                <div
                  className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              <div className="ml-6 md:ml-0 flex-1 md:text-center">
                <h4 className="font-['Cormorant_Garamond'] text-2xl md:text-xl text-[#d4af37] font-semibold mb-1 md:mb-2 group-hover:text-[#d4af37] transition-colors duration-500 drop-shadow-sm">
                  Hora
                </h4>

                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent hidden md:mx-auto md:block mb-2 group-hover:w-16 transition-all duration-300"></div>

                <p className="text-foreground/80 text-lg md:text-base group-hover:text-foreground transition-colors duration-500">
                  3:30 pm
                </p>
              </div>
            </div>

            {/* Decoración floral en la esquina - solo visible en hover */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M70 70C70 70 60 60 70 50C80 60 70 70 70 70Z"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  fill="#d4af37"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 60 90 70C80 80 70 70 70 70Z"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  fill="#d4af37"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 60 80 70 90C80 80 70 70 70 70Z"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  fill="#d4af37"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 80 90 70C80 60 70 70 70 70Z"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  fill="#d4af37"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
          </div>

          {/* Lugar */}
          <div className="info-card glass-effect rounded-lg p-5 md:p-6 shadow-md transform-gpu transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:bg-white/95 border border-[#e8c4c4]/20 hover:border-[#e8c4c4]/50 group animate-border-pulse">
            {/* Diseño para móviles: horizontal con icono a la izquierda */}
            <div className="flex md:flex-col items-center md:items-center">
              <div className="relative overflow-hidden rounded-full w-20 h-20 md:w-16 md:h-16 flex-shrink-0 md:mx-auto md:mb-4 bg-gradient-to-br from-[#e8c4c4]/10 to-white/80 flex items-center justify-center group-hover:shadow-lg transition-all duration-500 border border-[#e8c4c4]/30 group-hover:border-[#e8c4c4]/70">
                {/* Efectos de fondo para el icono */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8c4c4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 animate-pulse-glow opacity-0 group-hover:opacity-40 bg-[#e8c4c4]/30 rounded-full blur-md"></div>
                <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-30">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" stroke="#e8c4c4" strokeWidth="1" strokeDasharray="1 3" />
                  </svg>
                </div>

                {/* Icono con efectos */}
                <MapPin className="w-10 h-10 md:w-8 md:h-8 text-[#e8c4c4] transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_8px_rgba(232,196,196,0.8)] z-10" />

                {/* Destellos alrededor del icono */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-[#e8c4c4] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"></div>
                <div
                  className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-[#e8c4c4] opacity-0 group-hover:opacity-70 blur-[1px] animate-ping-slow"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              <div className="ml-6 md:ml-0 flex-1 md:text-center">
                <h4 className="font-['Cormorant_Garamond'] text-2xl md:text-xl text-[#e8c4c4] font-semibold mb-1 md:mb-2 group-hover:text-[#e8c4c4] transition-colors duration-500 drop-shadow-sm">
                  Lugar
                </h4>

                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#e8c4c4]/50 to-transparent hidden md:mx-auto md:block mb-2 group-hover:w-16 transition-all duration-300"></div>

                <p className="text-foreground/80 text-lg md:text-base group-hover:text-foreground transition-colors duration-500">
                  Château Vaudreuil Suites Hotel
                </p>
              </div>
            </div>

            {/* Decoración floral en la esquina - solo visible en hover */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M70 70C70 70 60 60 70 50C80 60 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 60 90 70C80 80 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 60 80 70 90C80 80 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
                <path
                  d="M70 70C70 70 80 80 90 70C80 60 70 70 70 70Z"
                  stroke="#e8c4c4"
                  strokeWidth="1.5"
                  fill="#e8c4c4"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Elemento decorativo inferior con animación */}
        <div className="mt-8 text-center relative">
          <div className="w-48 h-0.5 bg-gradient-to-r from-[#e8c4c4]/30 via-[#d4af37]/70 to-[#e8c4c4]/30 mx-auto animate-shimmer"></div>

          {/* Ornamento floral central */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-40">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="5" fill="#d4af37" />
              <path
                d="M50 20C50 20 40 30 40 40C40 50 50 60 60 50C70 40 60 30 50 20Z"
                stroke="#e8c4c4"
                strokeWidth="1"
                fill="#e8c4c4"
                fillOpacity="0.1"
              />
              <path
                d="M50 80C50 80 40 70 40 60C40 50 50 40 60 50C70 60 60 70 50 80Z"
                stroke="#d4af37"
                strokeWidth="1"
                fill="#d4af37"
                fillOpacity="0.1"
              />
              <path
                d="M50 80C50 80 60 70 60 60C60 50 50 40 40 50C30 60 40 70 50 80Z"
                stroke="#d4af37"
                strokeWidth="1"
                fill="#d4af37"
                fillOpacity="0.1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
