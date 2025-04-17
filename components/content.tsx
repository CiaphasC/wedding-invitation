"use client"

import { useEffect, useRef, useState, useCallback, memo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Timeline } from "@/components/ui/timeline"
import { GalleryGrid } from "@/components/ui/gallery-grid"
import { RsvpForm } from "@/components/ui/rsvp-form"
import InfoTabContent from "@/components/ui/info-tab-content"
import { throttle } from "@/lib/utils"
import WeddingTitle from "@/components/ui/wedding-title"
import CoupleNamesDisplay from "@/components/ui/couple-names-display"
import QuoteDisplay from "@/components/ui/quote-display"
import LocationCard from "@/components/ui/location-card"
import EventDetailsCards from "@/components/ui/event-details-cards"
import { WeddingTabs } from "@/components/wedding-tabs"
import { WeddingHero } from "@/components/ui/wedding-hero"

// Reemplazar el componente WeddingInfoSection con esta versión mejorada
const WeddingInfoSection = memo(function WeddingInfoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="content-section mb-8 md:mb-16 relative overflow-hidden glass-effect rounded-xl p-4 md:p-6 my-4"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute -top-20 -left-20 w-40 h-40 opacity-5 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>

      <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>

      {/* Título "Nos casamos" como componente separado */}
      <WeddingTitle />

      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Componente para los nombres de la pareja */}
        <div className="mb-8 md:mb-16">
          <CoupleNamesDisplay bride="Jessica" groom="Pablo" />
        </div>

        {/* Componente para las citas */}
        <QuoteDisplay
          quotes={[
            {
              text: "El amor no se mide por la perfección, sino por la verdad que habita en cada gesto, en cada mirada y en cada promesa que nace del alma",
              icon: "quote",
            },
            {
              text: "Nuestra historia nació sin aviso, como esas estrellas que aparecen cuando menos lo esperas… y en medio del tiempo, cuando no buscábamos nada, nos encontramos todo. Fue ahí, justo en ese instante perfecto que no sabíamos que existía",
              icon: "heart",
            },
          ]}
        />
        <WeddingHero />
      </div>
    </section>
  )
})

// Reemplazar el componente EventDetailsSection con esta versión mejorada
const EventDetailsSection = memo(function EventDetailsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return

    // Animación inicial del título
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    // Efecto parallax para el título - solo en dispositivos no táctiles
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!titleRef.current) return

        const { clientX, clientY } = e
        const x = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
        const y = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

        // Movimiento del título
        gsap.to(titleRef.current, {
          x: x * 10,
          y: y * 5,
          rotationY: x * 3,
          rotationX: -y * 3,
          duration: 1,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="content-section mb-8 md:mb-16 relative glass-effect rounded-xl p-4 md:p-6 my-4"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 animate-spin-slow hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
          <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5 animate-spin-slow-reverse hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
          <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#d4af37" strokeWidth="1" />
        </svg>
      </div>

      {/* Título con decoración mejorada */}
      <div className="relative mb-8 md:mb-14 perspective-1000">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-16 hidden md:block">
          <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70">
            <path d="M40 30H200" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 4" />
            <path d="M20 30H35" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
            <path d="M205 30H220" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" />
            <circle cx="120" cy="30" r="5" fill="#d4af37" fillOpacity="0.6" />
            <circle cx="20" cy="30" r="3" fill="#edc3bf" />
            <circle cx="220" cy="30" r="3" fill="#edc3bf" />
          </svg>
        </div>

        <div className="relative text-center">
          <h2
            ref={titleRef}
            className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37]/80 via-[#d4af37] to-[#d4af37]/80 animate-gradient-x"
          >
            Detalles del Evento
          </h2>
          <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-2xl opacity-20 bg-gradient-radial from-[#d4af37] to-transparent"></div>

          <div className="absolute -z-10 -top-6 left-1/2 -translate-x-1/2 w-20 h-20 opacity-20 hidden md:block">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full animate-spin-slow"
            >
              <circle cx="50" cy="50" r="40" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="30" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="20" stroke="#d4af37" strokeWidth="1" strokeDasharray="1 3" />
            </svg>
          </div>

          <div className="mt-2 md:mt-4 text-[#7d6a5b]/80 italic text-center font-light text-sm md:text-base">
            Celebremos juntos este momento especial
          </div>
        </div>
      </div>

      {/* Tarjetas de información con efecto 3D - componente separado */}
      <EventDetailsCards />

      {/* Dirección y botón */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <LocationCard />
      </div>
    </section>
  )
})

// Memoized tab content components
const ScheduleTabContent = memo(function ScheduleTabContent() {
  return (
    <div className="bg-tertiary/10 rounded-xl p-4 md:p-6 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(212,175,55,0.15)] glass-effect">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
      <div className="absolute top-10 left-10 w-20 h-20 opacity-10 hidden md:block" data-mouse-parallax="0.1">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 opacity-10 hidden md:block" data-mouse-parallax="0.15">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20L80 80M20 80L80 20" stroke="#d4b08c" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Title with decorative elements */}
      <div className="relative mb-6 md:mb-8">
        <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-secondary font-semibold mb-2 text-center">
          <span className="relative inline-block">
            Itinerario
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></span>
          </span>
        </h3>
        <p className="text-center text-[#5e6e64] italic text-sm md:text-base">
          ¡Prepárense para una boda llena de colores! Dejen el blanco para la novia
        </p>
      </div>

      {/* Timeline component */}
      <Timeline
        items={[
          {
            time: "15:30 - 16:30",
            title: "Ceremonia",
            description: "Jardín del Château",
            icon: "ceremony",
          },
          {
            time: "16:30 - 17:30",
            title: "Cóctel",
            description: "Terraza Vaudreuil",
            icon: "cocktail",
          },
          {
            time: "17:30 - 18:00",
            title: "Recepción",
            description: "Salón Principal",
            icon: "reception",
          },
          {
            time: "18:00 - 18:15",
            title: "Presentaciones",
            description: "Bienvenida a los novios",
            icon: "presentation",
          },
          {
            time: "18:15 - 18:30",
            title: "Brindis",
            description: "Celebración con champagne",
            icon: "toast",
          },
          {
            time: "18:30 - 21:00",
            title: "Cena",
            description: "Menú de gala",
            icon: "dinner",
          },
          {
            time: "21:00 - 02:00",
            title: "Barra libre",
            description: "Fiesta y celebración",
            icon: "party",
          },
        ]}
        className="mt-6 md:mt-10"
      />

      {/* Final decorative element */}
      <div className="mt-8 md:mt-12 text-center relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10 hidden md:block"
          data-mouse-parallax="0.2"
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
        <p className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[#d4b08c] mt-4">
          ¡Los esperamos para celebrar juntos!
        </p>
      </div>
    </div>
  )
})

const GalleryTabContent = memo(function GalleryTabContent() {
  return (
    <div className="bg-tertiary/10 rounded-xl p-4 md:p-6 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(212,175,55,0.15)] glass-effect">
      <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-secondary font-semibold mb-4 md:mb-6 text-center">
        Nuestra Historia
      </h3>

      <GalleryGrid />

      <p className="text-center mt-4 md:mt-6 text-foreground text-sm md:text-base">
        Comparte tus fotos del evento usando el hashtag{" "}
        <span className="font-semibold text-accent">#JessicaYPablo2025</span>
      </p>
    </div>
  )
})

const RsvpTabContent = memo(function RsvpTabContent() {
  return (
    <div className="bg-tertiary/10 rounded-xl p-4 md:p-6 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(212,175,55,0.15)] glass-effect">
      <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-secondary font-semibold mb-4 md:mb-6 text-center">
        Confirma tu Asistencia
      </h3>
      <p className="text-center text-foreground mb-4 md:mb-6 text-sm md:text-base">
        Por favor confirma tu asistencia antes del 15 de julio de 2025
      </p>

      <RsvpForm />
    </div>
  )
})

const FooterSection = memo(function FooterSection() {
  return (
    <section className="content-section text-center glass-effect rounded-xl p-4 md:p-6 my-4">
      <div className="w-24 md:w-32 h-0.5 bg-gold mx-auto mb-6 md:mb-8 opacity-80"></div>
      <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-secondary mb-3 md:mb-4">Jessica & Pablo</p>
      <p className="font-['Poppins'] text-foreground mt-2 text-base md:text-lg">
        ¡Te esperamos para celebrar este día tan especial!
      </p>
      <div className="w-24 md:w-32 h-0.5 bg-gold mx-auto mt-6 md:mt-8 opacity-80"></div>
    </section>
  )
})

const TimelineTabContent = memo(ScheduleTabContent)

export default function Content() {
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("info")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const parallaxElementsRef = useRef<HTMLElement[]>([])
  const scrollTriggersRef = useRef<gsap.core.ScrollTrigger[]>([])
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

  // Setup animations once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!contentRef.current || !sectionsRef.current || animationsSetupRef.current) return

    animationsSetupRef.current = true

    // Collect all parallax elements for better performance
    if (contentRef.current) {
      parallaxElementsRef.current = Array.from(
        contentRef.current.querySelectorAll("[data-mouse-parallax]"),
      ) as HTMLElement[]
    }

    // Handle mouse movement for parallax effect - only on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    // Initial animation for the main content container - only once
    gsap.fromTo(
      contentRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      },
    )

    // Animate each section when scrolled into view
    const sections = sectionsRef.current.querySelectorAll(".content-section")

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            section,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.1 * index,
              ease: "power2.out",
            },
          )
        },
      })

      scrollTriggersRef.current.push(trigger)
    })

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      scrollTriggersRef.current.forEach((trigger) => trigger.kill())
    }
  }, [handleMouseMove])

  // Apply parallax effect based on mouse position - optimized to only update when mouse moves
  useEffect(() => {
    if (parallaxElementsRef.current.length === 0) return

    parallaxElementsRef.current.forEach((element) => {
      const depth = Number.parseFloat(element.dataset.mouseParallax || "0.1")
      const moveX = mousePosition.x * depth * 50
      const moveY = mousePosition.y * depth * 50
      const rotateZ = mousePosition.x * depth * 10

      // Use transform for better performance instead of gsap for mouse movement
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`
    })
  }, [mousePosition])

  // Create confetti effect - optimized
  const createConfetti = useCallback(() => {
    if (!contentRef.current) return

    const container = contentRef.current
    const confettiCount = 30 // Reduced count for better performance
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.className = "absolute w-2 h-2 pointer-events-none z-50 will-change-transform"

      // Random color
      const colors = ["#edc3bf", "#d4b08c", "#d4af37", "#f5efe7"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Random shape
      const shapes = ["rounded-full", "rounded-sm", "rounded"]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]

      confetti.classList.add(shape)
      confetti.style.backgroundColor = color
      confetti.style.opacity = "0"
      confetti.style.position = "absolute"
      confetti.style.top = "0"
      confetti.style.left = `${Math.random() * 100}%`

      fragment.appendChild(confetti)
    }

    container.appendChild(fragment)

    // Batch animations for better performance
    const confettiElements = container.querySelectorAll(".z-50")

    gsap.to(confettiElements, {
      y: (i) => `${300 + Math.random() * 300}px`,
      x: (i) => `${(Math.random() - 0.5) * 200}px`,
      rotation: (i) => `${Math.random() * 360}deg`,
      opacity: 0.8,
      duration: (i) => 1 + Math.random() * 2,
      ease: "power1.out",
      stagger: 0.02,
      onComplete: () => {
        gsap.to(confettiElements, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.01,
          onComplete: () => {
            // Remove all confetti elements at once
            confettiElements.forEach((el) => {
              if (container.contains(el)) {
                container.removeChild(el)
              }
            })
          },
        })
      },
    })
  }, [])

  return (
    <div
      ref={contentRef}
      className="mt-8 md:mt-12 mb-12 md:mb-20 w-full max-w-5xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-12 relative overflow-hidden border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.15)] glass-card"
    >
      {/* Background decorative elements with parallax - reduced for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute top-20 left-20 w-32 h-32 opacity-5 hidden md:block" data-mouse-parallax="0.2">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#d4b08c" strokeWidth="1" strokeDasharray="1 3" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-1/4 w-36 h-36 opacity-5 hidden md:block" data-mouse-parallax="0.25">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 40C30 40 15 30 15 20C15 15 20 10 25 10C28 10 30 12 30 15C30 12 32 10 35 10C40 10 45 15 45 20C45 30 30 40 30 40Z"
              stroke="#d4b08c"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div ref={sectionsRef}>
        <WeddingInfoSection />
        <EventDetailsSection />

        <section className="content-section mb-8 md:mb-16">
          <WeddingTabs
            infoContent={<InfoTabContent />}
            timelineContent={<TimelineTabContent />}
            galleryContent={<GalleryTabContent />}
            rsvpContent={<RsvpTabContent />}
            className="max-w-5xl mx-auto"
          />
        </section>

        <FooterSection />
      </div>
    </div>
  )
}
