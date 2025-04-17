"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Navigation,
  Clock,
  Calendar,
  Heart,
  Car,
  Hotel,
  Phone,
  Mail,
  Info,
} from "lucide-react"
import LocationOrnaments from "./location-ornaments"
import { useWindowSize } from "@/hooks/use-window-size"

export default function LocationCard() {
  const [showMap, setShowMap] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "map" | "tips">("info")
  const cardRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const isMobile = width < 768

  // Parallax effect on hover (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !contentRef.current || !mapContainerRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Apply parallax effect to content
      contentRef.current.style.transform = `translate3d(${x * -15}px, ${y * -15}px, 0)`

      // Apply parallax effect to map container
      if (showMap) {
        mapContainerRef.current.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      if (contentRef.current) {
        contentRef.current.style.transform = "translate3d(0, 0, 0)"
      }
      if (mapContainerRef.current) {
        mapContainerRef.current.style.transform = "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)"
      }
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener("mousemove", handleMouseMove)
      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove)
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [showMap, isMobile])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group perspective-1000"
    >
      {/* Enhanced glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/30 to-white/20 backdrop-blur-lg z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/30 opacity-70"></div>

        {/* Glass reflections */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9c6644]/10 via-[#9c6644]/40 to-[#9c6644]/10 z-10 animate-shimmer-copper"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#edc3bf]/10 via-[#edc3bf]/40 to-[#edc3bf]/10 z-10 animate-shimmer"></div>

      {/* Side borders with glow */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#9c6644]/10 via-[#edc3bf]/30 to-[#9c6644]/10 z-10"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#9c6644]/10 via-[#edc3bf]/30 to-[#9c6644]/10 z-10"></div>

      {/* Ornamental elements */}
      <LocationOrnaments />

      {/* Main content container */}
      <div className="relative z-10 p-4 md:p-10 transition-all duration-500">
        <div
          ref={contentRef}
          className="transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hero header - Desktop */}
          <div className="hidden md:block text-center mb-8">
            <div className="inline-block relative mb-4">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 opacity-20 animate-pulse">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L50 90 M10 50 L90 50" stroke="#9c6644" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="40" stroke="#9c6644" strokeWidth="1" strokeDasharray="1 3" />
                </svg>
              </div>
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#edc3bf]/20 backdrop-blur-sm border border-[#9c6644]/30 animate-pulse-glow">
                <MapPin className="w-8 h-8 text-[#9c6644] drop-shadow-glow animate-float" />
              </div>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-secondary font-bold mb-2 tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c6644]/80 via-[#9c6644] to-[#9c6644]/80 animate-text-gradient bg-size-200">
                Ubicación
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent mx-auto mb-4"></div>
            <p className="text-[#7d6a5b]/80 italic text-lg">El lugar perfecto para celebrar nuestro amor</p>
          </div>

          {/* Hero header - Mobile (Enhanced) */}
          <div className="md:hidden text-center mb-4">
            <div className="inline-block relative mb-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 opacity-20 animate-pulse">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10 L50 90 M10 50 L90 50" stroke="#9c6644" strokeWidth="1" strokeDasharray="2 4" />
                  <circle cx="50" cy="50" r="40" stroke="#9c6644" strokeWidth="1" strokeDasharray="1 3" />
                </svg>
              </div>
              <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#edc3bf]/20 backdrop-blur-md border border-[#9c6644]/30 animate-pulse-glow mx-auto shadow-lg">
                <MapPin className="w-7 h-7 text-[#9c6644] drop-shadow-glow animate-float" />
              </div>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-bold mb-1 tracking-wide text-shadow">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c6644]/80 via-[#9c6644] to-[#9c6644]/80 animate-text-gradient bg-size-200">
                Ubicación
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent mx-auto mb-2"></div>
            <p className="text-[#7d6a5b]/90 italic text-sm font-light">El lugar perfecto para celebrar nuestro amor</p>
          </div>

          {/* Enhanced tabs for mobile */}
          <div className="md:hidden mb-4">
            <div className="flex rounded-lg glass-effect p-1 shadow-inner">
              <button
                onClick={() => setActiveTab("info")}
                className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "info"
                    ? "bg-gradient-to-r from-[#9c6644]/70 to-[#edc3bf]/70 text-white shadow-md"
                    : "text-[#7d6a5b] hover:bg-white/30"
                }`}
              >
                <Info className="w-4 h-4 mr-1" />
                Detalles
              </button>
              <button
                onClick={() => setActiveTab("map")}
                className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "map"
                    ? "bg-gradient-to-r from-[#9c6644]/70 to-[#edc3bf]/70 text-white shadow-md"
                    : "text-[#7d6a5b] hover:bg-white/30"
                }`}
              >
                <MapPin className="w-4 h-4 mr-1" />
                Mapa
              </button>
              <button
                onClick={() => setActiveTab("tips")}
                className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === "tips"
                    ? "bg-gradient-to-r from-[#9c6644]/70 to-[#edc3bf]/70 text-white shadow-md"
                    : "text-[#7d6a5b] hover:bg-white/30"
                }`}
              >
                <Navigation className="w-4 h-4 mr-1" />
                Tips
              </button>
            </div>
          </div>

          {/* Venue details with icons - Desktop */}
          <div className="glass-effect rounded-xl p-4 md:p-6 shadow-lg relative overflow-hidden border border-white/30">
            <div className="flex flex-col items-center">
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#9c6644] font-semibold mb-4 text-shadow">
                Château Vaudreuil Suites Hotel
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl mx-auto mb-4 md:mb-6">
                <div className="flex flex-col items-center space-y-2 p-3 md:p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#edc3bf]/10 shadow-sm border border-[#edc3bf]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                  <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#edc3bf]/20 to-[#edc3bf]/5 backdrop-blur-sm border border-[#edc3bf]/30 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-5 md:w-6 h-5 md:h-6 text-[#edc3bf] group-hover:animate-bounce-slow" />
                  </div>
                  <p className="font-['Poppins'] text-foreground/90 text-center text-sm md:text-base">
                    21700 Route Transcanadienne
                    <br />
                    Vaudreuil-Dorion Qc J7V 8P7
                    <br className="hidden md:block" />
                    <span className="hidden md:inline">Canadá</span>
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-3 md:p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#9c6644]/10 shadow-sm border border-[#9c6644]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                  <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#9c6644]/5 backdrop-blur-sm border border-[#9c6644]/30 group-hover:scale-110 transition-all duration-300">
                    <Calendar className="w-5 md:w-6 h-5 md:h-6 text-[#9c6644] group-hover:animate-bounce-slow" />
                  </div>
                  <p className="font-['Poppins'] text-foreground/90 text-center text-sm md:text-base">
                    Sábado
                    <br />2 de agosto del 2025
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-3 md:p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#d4af37]/10 shadow-sm border border-[#d4af37]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                  <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 backdrop-blur-sm border border-[#d4af37]/30 group-hover:scale-110 transition-all duration-300">
                    <Clock className="w-5 md:w-6 h-5 md:h-6 text-[#d4af37] group-hover:animate-bounce-slow" />
                  </div>
                  <p className="font-['Poppins'] text-foreground/90 text-center text-sm md:text-base">
                    Ceremonia
                    <br />
                    3:30 pm
                  </p>
                </div>
              </div>

              {/* Desktop buttons */}
              <div className="hidden md:flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Button
                  variant="gold"
                  size="pillLg"
                  glowEffect={true}
                  className="font-['Poppins'] transition-all duration-300 group relative overflow-hidden w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Château+Vaudreuil+Suites+Hotel,+21700+Route+Transcanadienne+Vaudreuil-Dorion+Qc+J7V+8P7+Canada",
                      "_blank",
                    )
                  }
                >
                  <span className="relative z-10 group-hover:mr-2 transition-all duration-300">Ver en Google Maps</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:scale-125 transition-all duration-300" />
                  <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></span>
                </Button>

                <Button
                  variant="outline"
                  size="pillLg"
                  className="font-['Poppins'] border-[#9c6644]/30 text-[#9c6644] hover:bg-[#9c6644]/10 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => setShowMap(!showMap)}
                >
                  <span className="mr-2">{showMap ? "Ocultar mapa" : "Mostrar mapa"}</span>
                  {showMap ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>

              {/* Mobile buttons */}
              <div className="md:hidden flex items-center justify-center w-full">
                <Button
                  variant="gold"
                  size="pill"
                  glowEffect={true}
                  className="font-['Poppins'] text-sm transition-all duration-300 group relative overflow-hidden w-full"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Château+Vaudreuil+Suites+Hotel,+21700+Route+Transcanadienne+Vaudreuil-Dorion+Qc+J7V+8P7+Canada",
                      "_blank",
                    )
                  }
                >
                  <span className="relative z-10 group-hover:mr-1 transition-all duration-300">Ver en Google Maps</span>
                  <ExternalLink className="w-3 h-3 relative z-10 group-hover:scale-125 transition-all duration-300" />
                  <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></span>
                </Button>
              </div>
            </div>
          </div>

          {/* Contenido de pestañas para móvil - Enhanced */}
          <div className="md:hidden mt-4">
            {/* Pestaña de información */}
            {activeTab === "info" && (
              <div className="glass-effect rounded-xl p-4 shadow-lg border border-white/20 mb-4 transform transition-all duration-500 animate-fade-in-up">
                <div className="flex flex-col items-center">
                  <h3 className="font-['Cormorant_Garamond'] text-xl text-[#9c6644] font-semibold mb-3 text-shadow">
                    Detalles del Evento
                  </h3>

                  <div className="grid grid-cols-1 gap-3 w-full max-w-xs mx-auto">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#edc3bf]/10 shadow-sm border border-[#edc3bf]/20 backdrop-filter backdrop-blur-sm">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#edc3bf]/20 to-[#edc3bf]/5 backdrop-blur-sm border border-[#edc3bf]/30 animate-pulse-glow">
                        <MapPin className="w-5 h-5 text-[#edc3bf]" />
                      </div>
                      <p className="font-['Poppins'] text-foreground/90 text-sm">
                        21700 Route Transcanadienne
                        <br />
                        Vaudreuil-Dorion Qc J7V 8P7
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#9c6644]/10 shadow-sm border border-[#9c6644]/20 backdrop-filter backdrop-blur-sm">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#9c6644]/5 backdrop-blur-sm border border-[#9c6644]/30 animate-pulse-glow">
                        <Calendar className="w-5 h-5 text-[#9c6644]" />
                      </div>
                      <p className="font-['Poppins'] text-foreground/90 text-sm">
                        Sábado
                        <br />2 de agosto del 2025
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#d4af37]/10 shadow-sm border border-[#d4af37]/20 backdrop-filter backdrop-blur-sm">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 backdrop-blur-sm border border-[#d4af37]/30 animate-pulse-glow">
                        <Clock className="w-5 h-5 text-[#d4af37]" />
                      </div>
                      <p className="font-['Poppins'] text-foreground/90 text-sm">
                        Ceremonia
                        <br />
                        3:30 pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pestaña de mapa - Enhanced */}
            {activeTab === "map" && (
              <div className="glass-effect rounded-xl p-4 shadow-lg border border-white/20 mb-4 transform transition-all duration-500 animate-fade-in-up">
                <div className="rounded-xl overflow-hidden border border-[#9c6644]/20 shadow-xl perspective-1000 transition-transform duration-300 mb-3">
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1173566565394!2d-74.0394369!3d45.4011889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc93b6b9b6fea93%3A0x42bd0d6a1c77e0e0!2sCh%C3%A2teau%20Vaudreuil%20Suites%20Hotel!5e0!3m2!1sen!2sus!4v1712798000000!5m2!1sen!2sus"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="z-10"
                    ></iframe>

                    {/* Map overlay with pin animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="relative">
                        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border-2 border-[#9c6644]/30 animate-ping-slow opacity-30"></div>
                        <div
                          className="absolute -top-5 -left-5 w-10 h-10 rounded-full border border-[#9c6644]/50 animate-ping-slow opacity-50"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <MapPin className="w-7 h-7 text-[#9c6644] drop-shadow-glow animate-bounce-slow" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#edc3bf]/10 shadow-sm border border-[#edc3bf]/20 backdrop-filter backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#edc3bf]/20 to-[#edc3bf]/5 backdrop-blur-sm border border-[#edc3bf]/30">
                      <Phone className="w-5 h-5 text-[#edc3bf]" />
                    </div>
                    <p className="font-['Poppins'] text-foreground/90 text-sm">
                      +1 (450) 455-0955
                      <br />
                      Llamar para reservaciones
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#9c6644]/10 shadow-sm border border-[#9c6644]/20 backdrop-filter backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#9c6644]/5 backdrop-blur-sm border border-[#9c6644]/30">
                      <Mail className="w-5 h-5 text-[#9c6644]" />
                    </div>
                    <p className="font-['Poppins'] text-foreground/90 text-sm">
                      info@chateauvaudreuil.com
                      <br />
                      Contacto para información
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pestaña de consejos - Enhanced */}
            {activeTab === "tips" && (
              <div className="glass-effect rounded-xl p-4 shadow-lg border border-white/20 mb-4 transform transition-all duration-500 animate-fade-in-up">
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#9c6644] font-semibold mb-3 text-center text-shadow">
                  Información adicional
                </h4>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#edc3bf]/10 shadow-sm border border-[#edc3bf]/20 backdrop-filter backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#edc3bf]/20 to-[#edc3bf]/5 backdrop-blur-sm border border-[#edc3bf]/30">
                      <Car className="w-5 h-5 text-[#edc3bf]" />
                    </div>
                    <p className="font-['Poppins'] text-foreground/90 text-sm">Estacionamiento gratuito disponible</p>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#9c6644]/10 shadow-sm border border-[#9c6644]/20 backdrop-filter backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#9c6644]/5 backdrop-blur-sm border border-[#9c6644]/30">
                      <Hotel className="w-5 h-5 text-[#9c6644]" />
                    </div>
                    <p className="font-['Poppins'] text-foreground/90 text-sm">Habitaciones con tarifa especial</p>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-white/40 to-[#d4af37]/10 shadow-sm border border-[#d4af37]/20 backdrop-filter backdrop-blur-sm">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 backdrop-blur-sm border border-[#d4af37]/30">
                      <Heart className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <p className="font-['Poppins'] text-foreground/90 text-sm">Código de vestimenta: Formal elegante</p>
                  </div>
                </div>

                <div className="text-center mt-4 p-3 rounded-lg bg-gradient-to-r from-[#edc3bf]/10 to-[#9c6644]/10 border border-[#d4af37]/20 backdrop-filter backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center mb-2">
                    <Navigation className="w-5 h-5 text-[#9c6644] mr-2" />
                    <h4 className="font-['Cormorant_Garamond'] text-lg text-secondary font-semibold">
                      Consejos de viaje
                    </h4>
                  </div>
                  <p className="text-foreground/80 text-sm">
                    El hotel ofrece estacionamiento gratuito para los invitados. Si vienes desde Montreal, toma la
                    Autopista 40 Oeste. Hay transporte público disponible desde la estación central.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive map with 3D effect - Desktop */}
          <div
            className={`hidden md:block overflow-hidden transition-all duration-700 ease-in-out ${
              showMap ? "max-h-[500px] opacity-100 mb-6" : "max-h-0 opacity-0"
            }`}
          >
            <div
              ref={mapContainerRef}
              className="rounded-xl overflow-hidden border-2 border-[#9c6644]/20 shadow-xl perspective-1000 transition-transform duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1173566565394!2d-74.0394369!3d45.4011889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc93b6b9b6fea93%3A0x42bd0d6a1c77e0e0!2sCh%C3%A2teau%20Vaudreuil%20Suites%20Hotel!5e0!3m2!1sen!2sus!4v1712798000000!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="z-10"
                ></iframe>

                {/* Map overlay with pin animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="relative">
                    <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full border-4 border-[#9c6644]/30 animate-ping-slow opacity-30"></div>
                    <div
                      className="absolute -top-8 -left-8 w-16 h-16 rounded-full border-2 border-[#9c6644]/50 animate-ping-slow opacity-50"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <MapPin className="w-10 h-10 text-[#9c6644] drop-shadow-glow animate-bounce-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional information - Desktop */}
          <div className="hidden md:block glass-effect rounded-xl p-6 shadow-lg border border-white/20 mb-6 transition-all duration-300">
            <h4 className="font-['Cormorant_Garamond'] text-2xl text-[#9c6644] font-semibold mb-4 text-center text-shadow">
              Información adicional
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#edc3bf]/10 shadow-sm border border-[#edc3bf]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#edc3bf]/20 to-[#edc3bf]/5 backdrop-blur-sm border border-[#edc3bf]/30 group-hover:scale-110 transition-all duration-300">
                  <Car className="w-6 h-6 text-[#edc3bf] group-hover:animate-bounce-slow" />
                </div>
                <p className="font-['Poppins'] text-foreground/90 text-center text-sm">
                  Estacionamiento gratuito disponible para todos los invitados
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#9c6644]/10 shadow-sm border border-[#9c6644]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9c6644]/20 to-[#9c6644]/5 backdrop-blur-sm border border-[#9c6644]/30 group-hover:scale-110 transition-all duration-300">
                  <Hotel className="w-6 h-6 text-[#9c6644] group-hover:animate-bounce-slow" />
                </div>
                <p className="font-['Poppins'] text-foreground/90 text-center text-sm">
                  Habitaciones disponibles con tarifa especial para invitados
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/40 to-[#d4af37]/10 shadow-sm border border-[#d4af37]/20 group hover:bg-white/50 backdrop-filter backdrop-blur-sm transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 backdrop-blur-sm border border-[#d4af37]/30 group-hover:scale-110 transition-all duration-300">
                  <Heart className="w-6 h-6 text-[#d4af37] group-hover:animate-bounce-slow" />
                </div>
                <p className="font-['Poppins'] text-foreground/90 text-center text-sm">
                  Código de vestimenta: Formal elegante
                </p>
              </div>
            </div>
          </div>

          {/* Travel tips - Desktop */}
          <div className="hidden md:block text-center mt-6">
            <div className="inline-flex items-center justify-center mb-2">
              <Navigation className="w-5 h-5 text-[#9c6644] mr-2" />
              <h4 className="font-['Cormorant_Garamond'] text-xl text-secondary font-semibold">Consejos de viaje</h4>
            </div>
            <p className="text-foreground/80 text-sm">
              El hotel ofrece estacionamiento gratuito para los invitados. Si vienes desde Montreal, toma la Autopista
              40 Oeste. Hay transporte público disponible desde la estación central.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
