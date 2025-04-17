"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useWindowSize } from "@/hooks/use-window-size"

// Registramos los plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LocationOrnaments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isMobile = width < 768

  useEffect(() => {
    if (!containerRef.current) return

    // Seleccionamos todos los elementos SVG
    const svgElements = containerRef.current.querySelectorAll("svg")
    const paths = containerRef.current.querySelectorAll("path")
    const circles = containerRef.current.querySelectorAll("circle")
    const roseGroups = containerRef.current.querySelectorAll(".rose-group")

    // Configuración inicial para paths
    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      })
    })

    // Configuración inicial para círculos
    gsap.set(circles, {
      scale: 0,
      opacity: 0,
    })

    // Configuración inicial para grupos de rosas
    gsap.set(roseGroups, {
      scale: 0,
      opacity: 0,
      rotation: -15,
    })

    // Animación de dibujo para paths
    const pathsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    pathsTimeline.to(paths, {
      strokeDashoffset: 0,
      opacity: 0.8,
      duration: 2,
      stagger: 0.05,
      ease: "power2.inOut",
    })

    // Animación para círculos
    const circlesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })

    circlesTimeline.to(circles, {
      scale: 1,
      opacity: 0.8,
      duration: 0.5,
      stagger: 0.03,
      delay: 0.5,
      ease: "back.out(1.7)",
    })

    // Animación para grupos de rosas
    const rosesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })

    rosesTimeline.to(roseGroups, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
    })

    // Animaciones flotantes para cada SVG
    svgElements.forEach((element, index) => {
      // Valores aleatorios para movimiento más natural
      const randomX = Math.random() * 10 - 5
      const randomY = Math.random() * 10 - 5
      const randomRotation = Math.random() * 6 - 3
      const randomDuration = 3 + Math.random() * 4
      const randomDelay = Math.random() * 2

      gsap.to(element, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        duration: randomDuration,
        delay: randomDelay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    // Efecto parallax en movimiento del ratón (solo en desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return

      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

      svgElements.forEach((element, index) => {
        const depth = 0.05 + (index % 5) * 0.02

        gsap.to(element, {
          x: x * 20 * depth,
          y: y * 15 * depth,
          rotation: x * 3 * depth,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        })
      })
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove)
      }

      // Limpiamos todas las animaciones de GSAP
      pathsTimeline.kill()
      circlesTimeline.kill()
      rosesTimeline.kill()

      // Matamos todos los ScrollTriggers asociados con este componente
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Ornamentos para Desktop */}
      <div className="hidden md:block">
        {/* Rosa izquierda superior */}
        <svg
          className="absolute top-1/4 left-6 w-28 h-28 rose-group"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Centro de la rosa */}
          <circle cx="50" cy="20" r="5" fill="#edc3bf" fillOpacity="0.6" />

          {/* Pétalos de la rosa */}
          <path
            d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 30 15 30 30C40 35 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 70 15 70 30C60 35 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />

          {/* Tallo y hojas */}
          <path d="M50 40V70" stroke="#5e6e64" strokeWidth="1.5" className="rose-stem" />
          <path
            d="M50 55C50 55 40 50 35 55C40 60 50 55 50 55Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
          <path
            d="M50 65C50 65 60 60 65 65C60 70 50 65 50 65Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />

          {/* Detalles decorativos */}
          <path d="M30 15C30 15 20 25 30 35" stroke="#edc3bf" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <path d="M70 15C70 15 80 25 70 35" stroke="#edc3bf" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        </svg>

        {/* Rosa derecha superior */}
        <svg
          className="absolute top-1/4 right-6 w-28 h-28 rose-group"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Centro de la rosa */}
          <circle cx="50" cy="20" r="5" fill="#9c6644" fillOpacity="0.6" />

          {/* Pétalos de la rosa */}
          <path
            d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 30 15 30 30C40 35 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 70 15 70 30C60 35 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />

          {/* Tallo y hojas */}
          <path d="M50 40V70" stroke="#5e6e64" strokeWidth="1.5" className="rose-stem" />
          <path
            d="M50 55C50 55 60 50 65 55C60 60 50 55 50 55Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
          <path
            d="M50 65C50 65 40 60 35 65C40 70 50 65 50 65Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />

          {/* Detalles decorativos */}
          <path d="M30 15C30 15 20 25 30 35" stroke="#9c6644" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <path d="M70 15C70 15 80 25 70 35" stroke="#9c6644" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        </svg>

        {/* Rosa izquierda inferior */}
        <svg
          className="absolute bottom-1/4 left-10 w-24 h-24 rose-group"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Centro de la rosa */}
          <circle cx="50" cy="20" r="4" fill="#edc3bf" fillOpacity="0.6" />

          {/* Pétalos de la rosa */}
          <path
            d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.1"
            className="rose-petal"
          />

          {/* Tallo y hojas */}
          <path d="M50 40V60" stroke="#5e6e64" strokeWidth="1.5" className="rose-stem" />
          <path
            d="M50 50C50 50 40 45 35 50C40 55 50 50 50 50Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
        </svg>

        {/* Rosa derecha inferior */}
        <svg
          className="absolute bottom-1/4 right-10 w-24 h-24 rose-group"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Centro de la rosa */}
          <circle cx="50" cy="20" r="4" fill="#9c6644" fillOpacity="0.6" />

          {/* Pétalos de la rosa */}
          <path
            d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
            stroke="#9c6644"
            strokeWidth="1.5"
            fill="#9c6644"
            fillOpacity="0.1"
            className="rose-petal"
          />

          {/* Tallo y hojas */}
          <path d="M50 40V60" stroke="#5e6e64" strokeWidth="1.5" className="rose-stem" />
          <path
            d="M50 50C50 50 60 45 65 50C60 55 50 50 50 50Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
        </svg>

        {/* Líneas ornamentales inferiores izquierdas */}
        <svg
          className="absolute bottom-20 left-10 w-40 h-20"
          viewBox="0 0 160 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 40C10 40 40 10 80 40C120 70 150 40 150 40"
            stroke="#edc3bf"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle cx="10" cy="40" r="3" fill="#edc3bf" fillOpacity="0.6" />
          <circle cx="80" cy="40" r="3" fill="#edc3bf" fillOpacity="0.6" />
          <circle cx="150" cy="40" r="3" fill="#edc3bf" fillOpacity="0.6" />

          {/* Pequeñas flores decorativas */}
          <circle cx="40" cy="25" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <path
            d="M40 25C40 25 38 23 40 21C42 23 40 25 40 25Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M40 25C40 25 42 23 44 25C42 27 40 25 40 25Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M40 25C40 25 38 27 40 29C42 27 40 25 40 25Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M40 25C40 25 42 27 44 25C42 23 40 25 40 25Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />

          <circle cx="120" cy="55" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <path
            d="M120 55C120 55 118 53 120 51C122 53 120 55 120 55Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M120 55C120 55 122 53 124 55C122 57 120 55 120 55Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M120 55C120 55 118 57 120 59C122 57 120 55 120 55Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
          <path
            d="M120 55C120 55 122 57 124 55C122 53 120 55 120 55Z"
            stroke="#edc3bf"
            strokeWidth="0.5"
            fill="#edc3bf"
            fillOpacity="0.1"
          />
        </svg>

        {/* Líneas ornamentales inferiores derechas */}
        <svg
          className="absolute bottom-20 right-10 w-40 h-20"
          viewBox="0 0 160 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 40C10 40 40 70 80 40C120 10 150 40 150 40"
            stroke="#9c6644"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <circle cx="10" cy="40" r="3" fill="#9c6644" fillOpacity="0.6" />
          <circle cx="80" cy="40" r="3" fill="#9c6644" fillOpacity="0.6" />
          <circle cx="150" cy="40" r="3" fill="#9c6644" fillOpacity="0.6" />

          {/* Pequeñas flores decorativas */}
          <circle cx="40" cy="55" r="2" fill="#9c6644" fillOpacity="0.4" />
          <path
            d="M40 55C40 55 38 53 40 51C42 53 40 55 40 55Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M40 55C40 55 42 53 44 55C42 57 40 55 40 55Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M40 55C40 55 38 57 40 59C42 57 40 55 40 55Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M40 55C40 55 42 57 44 55C42 53 40 55 40 55Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />

          <circle cx="120" cy="25" r="2" fill="#9c6644" fillOpacity="0.4" />
          <path
            d="M120 25C120 25 118 23 120 21C122 23 120 25 120 25Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M120 25C120 25 122 23 124 25C122 27 120 25 120 25Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M120 25C120 25 118 27 120 29C122 27 120 25 120 25Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
          <path
            d="M120 25C120 25 122 27 124 25C122 23 120 25 120 25Z"
            stroke="#9c6644"
            strokeWidth="0.5"
            fill="#9c6644"
            fillOpacity="0.1"
          />
        </svg>

        {/* Líneas ornamentales superiores */}
        <svg
          className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-10"
          viewBox="0 0 256 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 20H236" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
          <circle cx="20" cy="20" r="3" fill="#d4af37" fillOpacity="0.6" />
          <circle cx="128" cy="20" r="3" fill="#d4af37" fillOpacity="0.6" />
          <circle cx="236" cy="20" r="3" fill="#d4af37" fillOpacity="0.6" />
          <path
            d="M60 10C60 10 80 20 100 20C120 20 140 10 140 10"
            stroke="#d4af37"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M60 30C60 30 80 20 100 20C120 20 140 30 140 30"
            stroke="#d4af37"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M160 10C160 10 180 20 200 20C220 20 240 10 240 10"
            stroke="#d4af37"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M160 30C160 30 180 20 200 20C220 20 240 30 240 30"
            stroke="#d4af37"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Ornamentos para Móvil - Más elaborados y vistosos */}
      <div className="md:hidden">
        {/* Rosa superior */}
        <svg
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rose-group"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Centro de la rosa */}
          <circle cx="50" cy="20" r="5" fill="#edc3bf" fillOpacity="0.7" />

          {/* Pétalos de la rosa */}
          <path
            d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 30 15 30 30C40 35 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />
          <path
            d="M50 20C50 20 70 15 70 30C60 35 50 20 50 20Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity="0.2"
            className="rose-petal"
          />

          {/* Tallo y hojas */}
          <path d="M50 40V70" stroke="#5e6e64" strokeWidth="1.5" className="rose-stem" />
          <path
            d="M50 55C50 55 40 50 35 55C40 60 50 55 50 55Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
          <path
            d="M50 65C50 65 60 60 65 65C60 70 50 65 50 65Z"
            stroke="#5e6e64"
            strokeWidth="1"
            fill="#5e6e64"
            fillOpacity="0.1"
            className="rose-leaf"
          />
        </svg>

        {/* Rosas laterales izquierdas - Columna de rosas */}
        <div className="absolute left-1 top-1/4 bottom-1/4 flex flex-col justify-around items-center">
          {/* Rosa superior izquierda */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#9c6644" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>

          {/* Línea conectora vertical */}
          <svg className="w-2 h-20" viewBox="0 0 4 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0V80" stroke="#9c6644" strokeWidth="1" strokeDasharray="2 4" />
          </svg>

          {/* Rosa central izquierda */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#9c6644" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>

          {/* Línea conectora vertical */}
          <svg className="w-2 h-20" viewBox="0 0 4 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0V80" stroke="#9c6644" strokeWidth="1" strokeDasharray="2 4" />
          </svg>

          {/* Rosa inferior izquierda */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#9c6644" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#9c6644"
              strokeWidth="1.5"
              fill="#9c6644"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>
        </div>

        {/* Rosas laterales derechas - Columna de rosas */}
        <div className="absolute right-1 top-1/4 bottom-1/4 flex flex-col justify-around items-center">
          {/* Rosa superior derecha */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#edc3bf" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>

          {/* Línea conectora vertical */}
          <svg className="w-2 h-20" viewBox="0 0 4 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0V80" stroke="#edc3bf" strokeWidth="1" strokeDasharray="2 4" />
          </svg>

          {/* Rosa central derecha */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#edc3bf" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>

          {/* Línea conectora vertical */}
          <svg className="w-2 h-20" viewBox="0 0 4 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 0V80" stroke="#edc3bf" strokeWidth="1" strokeDasharray="2 4" />
          </svg>

          {/* Rosa inferior derecha */}
          <svg className="w-14 h-14 rose-group" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="20" r="4" fill="#edc3bf" fillOpacity="0.7" />
            <path
              d="M50 20C50 20 40 10 50 0C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 10 70 20C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
            <path
              d="M50 20C50 20 60 30 70 20C60 10 50 20 50 20Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              fillOpacity="0.2"
              className="rose-petal"
            />
          </svg>
        </div>

        {/* Líneas ornamentales inferiores */}
        <svg
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-8"
          viewBox="0 0 128 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8H118" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
          <circle cx="10" cy="8" r="2" fill="#d4af37" fillOpacity="0.6" />
          <circle cx="64" cy="8" r="2" fill="#d4af37" fillOpacity="0.6" />
          <circle cx="118" cy="8" r="2" fill="#d4af37" fillOpacity="0.6" />

          {/* Pequeñas flores doradas */}
          <circle cx="32" cy="8" r="1.5" fill="#d4af37" fillOpacity="0.4" />
          <path
            d="M32 8C32 8 31 7 32 6C33 7 32 8 32 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M32 8C32 8 33 7 34 8C33 9 32 8 32 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M32 8C32 8 31 9 32 10C33 9 32 8 32 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M32 8C32 8 33 9 34 8C33 7 32 8 32 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />

          <circle cx="96" cy="8" r="1.5" fill="#d4af37" fillOpacity="0.4" />
          <path
            d="M96 8C96 8 95 7 96 6C97 7 96 8 96 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M96 8C96 8 97 7 98 8C97 9 96 8 96 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M96 8C96 8 95 9 96 10C97 9 96 8 96 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
          <path
            d="M96 8C96 8 97 9 98 8C97 7 96 8 96 8Z"
            stroke="#d4af37"
            strokeWidth="0.5"
            fill="#d4af37"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  )
}
