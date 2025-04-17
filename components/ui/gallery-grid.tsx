"use client"

import { useState, useCallback, memo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { throttle } from "@/lib/utils"

// Memoized gallery item component with enhanced visuals
const GalleryItem = memo(function GalleryItem({
  image,
  title,
  date,
  index,
  onHover,
}: {
  image: string
  title: string
  date: string
  index: number
  onHover: (index: number | null) => void
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Optimized hover handlers
  const handleMouseEnter = useCallback(() => {
    onHover(index)
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [index, onHover])

  const handleMouseLeave = useCallback(() => {
    onHover(null)
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: 10,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [onHover])

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] group cursor-pointer will-change-transform transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-sm border border-white/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-70"></div>

        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-md"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tr-md"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-md"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-md"></div>

        {/* Enhanced content with better typography and animations */}
        <div
          ref={contentRef}
          className="absolute bottom-0 left-0 right-0 p-5 text-white transform transition-all duration-300"
          style={{ transform: "translateY(10px)", opacity: 0.8 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-[#edc3bf] to-[#d4af37] rounded-full mr-3"></div>
            <h4 className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-semibold tracking-wide">{title}</h4>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-[#edc3bf]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm md:text-base opacity-90 font-light">{date}</p>
          </div>
        </div>
      </div>
    </div>
  )
})

// Enhanced decorative SVG components
const FlowerSvg = memo(function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 15C50 15 65 30 80 30C80 30 65 45 65 60C65 60 50 45 35 60C35 60 45 45 30 30C30 30 45 30 50 15Z"
        stroke="url(#flowerGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="40" r="4" fill="url(#flowerGradient)" opacity="0" />
      <defs>
        <linearGradient id="flowerGradient" x1="30" y1="15" x2="80" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#edc3bf" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  )
})

const SparklesSvg = memo(function SparklesSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        className="draw-path"
        d="M50 15L54 40L79 43L54 46L50 71L46 46L21 43L46 40L50 15Z"
        stroke="url(#sparkleGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="appear-element" cx="50" cy="43" r="4" fill="url(#sparkleGradient)" opacity="0" />
      <defs>
        <linearGradient id="sparkleGradient" x1="21" y1="15" x2="79" y2="71" gradientUnits="userSpaceOnUse">
          <stop stopColor="#edc3bf" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  )
})

// New decorative elements
const CircleDecor = memo(function CircleDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#circleGradient)"
        strokeWidth="1"
        strokeDasharray="1 3"
        className="animate-spin-slow"
        style={{ animationDuration: "30s" }}
      />
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="url(#circleGradient)"
        strokeWidth="1"
        className="animate-spin-slow"
        style={{ animationDuration: "20s", animationDirection: "reverse" }}
      />
      <circle
        cx="50"
        cy="50"
        r="20"
        stroke="url(#circleGradient)"
        strokeWidth="1"
        strokeDasharray="1 3"
        className="animate-spin-slow"
        style={{ animationDuration: "15s" }}
      />
      <defs>
        <linearGradient id="circleGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#edc3bf" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  )
})

export function GalleryGrid() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const decorElementsRef = useRef<HTMLElement[]>([])
  const titleRef = useRef<HTMLDivElement>(null)

  const galleryItems = [
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Nuestro Primer Encuentro",
      date: "Junio 2020",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "La Propuesta",
      date: "Diciembre 2024",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Compromiso",
      date: "Enero 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Sesión Pre-Boda",
      date: "Marzo 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Despedida de Solteros",
      date: "Julio 2025",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      title: "Ensayo de Boda",
      date: "Julio 2025",
    },
  ]

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

    if (!containerRef.current) return

    // Collect all decorative elements for better performance
    decorElementsRef.current = Array.from(containerRef.current.querySelectorAll("[data-parallax]")) as HTMLElement[]

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove)

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none none",
          },
          ease: "power3.out",
        },
      )
    }

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

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          ease: "power2.inOut",
        })
      })

      const appearElements = element.querySelectorAll(".appear-element")

      gsap.to(appearElements, {
        opacity: 1,
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ease: "back.out(1.7)",
      })
    })

    // Animate gallery items
    const galleryItems = containerRef.current.querySelectorAll(".gallery-item")

    galleryItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none none",
          },
          ease: "power2.out",
        },
      )
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (decorElementsRef.current.length === 0) return

    decorElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.parallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  // Memoized hover handler
  const handleHover = useCallback((index: number | null) => {
    setHoveredItem(index)
  }, [])

  return (
    <div ref={containerRef} className="relative py-12 md:py-20">
      {/* Enhanced section title */}
      <div ref={titleRef} className="mb-12 md:mb-16 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 opacity-10">
          <CircleDecor className="w-full h-full" />
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-bold text-secondary relative inline-block">
          <span className="relative z-10">Nuestra Historia</span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
        </h2>
        <p className="mt-4 text-foreground/80 max-w-2xl mx-auto text-base md:text-lg">
          Momentos especiales que han marcado nuestro camino juntos
        </p>
      </div>

      {/* Decorative elements with enhanced styling */}
      <div
        className="absolute -top-10 right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none svg-element"
        data-parallax="0.2"
      >
        <SparklesSvg className="w-full h-full" />
      </div>

      <div
        className="absolute -bottom-10 left-10 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none svg-element"
        data-parallax="0.15"
      >
        <FlowerSvg className="w-full h-full" />
      </div>

      {/* New decorative elements */}
      <div
        className="absolute top-1/3 left-0 w-16 h-16 md:w-20 md:h-20 opacity-10 pointer-events-none"
        data-parallax="0.1"
      >
        <CircleDecor className="w-full h-full" />
      </div>

      <div
        className="absolute bottom-1/4 right-0 w-16 h-16 md:w-20 md:h-20 opacity-10 pointer-events-none"
        data-parallax="0.12"
      >
        <CircleDecor className="w-full h-full" />
      </div>

      {/* Enhanced gallery grid with better spacing and responsive design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {galleryItems.map((item, index) => (
          <div key={index} className="gallery-item">
            <GalleryItem image={item.image} title={item.title} date={item.date} index={index} onHover={handleHover} />
          </div>
        ))}
      </div>

      {/* Floating decorative element that follows hovered item with enhanced styling */}
      {hoveredItem !== null && (
        <div
          className="absolute w-40 h-40 md:w-48 md:h-48 pointer-events-none transition-all duration-300 ease-out"
          style={{
            top: `${Math.floor(hoveredItem / 3) * 300 + 150}px`,
            left: `${(hoveredItem % 3) * 33.33 + 16.67}%`,
            opacity: 0.1,
            transform: `translate(-50%, -50%) rotate(${mousePosition.x * 30}deg)`,
          }}
        >
          <CircleDecor className="w-full h-full" />
        </div>
      )}

      {/* Enhanced view more button */}
      <div className="mt-12 md:mt-16 text-center">
        <Button
          variant="gold"
          size="pillLg"
          className="bg-gradient-to-r from-[#edc3bf]/80 to-[#d4af37]/80 hover:from-[#edc3bf] hover:to-[#d4af37] text-white backdrop-blur-sm border border-white/20 shadow-[0_10px_30px_-10px_rgba(237,195,191,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(237,195,191,0.4)] transition-all duration-300 group"
        >
          <span className="group-hover:mr-2 transition-all duration-300">Ver más fotos</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      {/* Add subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,195,191,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
    </div>
  )
}
