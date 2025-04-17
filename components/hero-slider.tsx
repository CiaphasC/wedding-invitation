"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import FloatingParticles from "./floating-particles"

interface HeroSliderProps {
  isVisible: boolean
  onScrollDown: () => void
}

// Enhance the HeroSlider component with more elegant transitions and effects

// Update the images array to include more elegant captions and styling
const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-07%20a%20las%2015.42.37_96f1bb7c.jpg-EQlHGVjJzcGZVtjPEnMloD8fvDTLSj.jpeg",
    alt: "Jessica y Pablo en aguas turquesas",
    caption: "Nuestras aventuras juntos",
    position: "center 40%",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvyASnKGhm6P8e2atKpv4aWAUg5peV.png",
    alt: "Jessica y Pablo al atardecer en la playa",
    caption: "Atardeceres que nos inspiran",
    position: "center",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-04-06%20a%20las%2012.56.00_5f800095.jpg-AAebcgxscior2QH5o7Qg1Pw0ilj1Dp.jpeg",
    alt: "Jessica y Pablo besándose frente a un crucero",
    caption: "Viajes que nos unen",
    position: "center 30%",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/enhanced_image-gAYWNHmQQVi0towjopym79CjjV49V8.png",
    alt: "Jessica y Pablo abrazados junto a un árbol de Navidad",
    caption: "Momentos que atesoramos",
    position: "center",
  },
]

export default function HeroSlider({ isVisible, onScrollDown }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      goToNext()
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  useEffect(() => {
    if (isVisible) {
      startAutoplay()
    } else {
      stopAutoplay()
    }

    return () => {
      stopAutoplay()
    }
  }, [isVisible])

  // Update the render function with more elegant styling and transitions
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={sliderRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Floating particles overlay */}
          <FloatingParticles />

          {/* Slider */}
          <div className="relative h-full w-full overflow-hidden">
            {/* Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
                <div
                  className="h-full w-full bg-cover bg-center will-change-transform"
                  style={{
                    backgroundImage: `url(${images[currentIndex].src})`,
                    backgroundPosition: images[currentIndex].position || "center",
                  }}
                >
                  {/* Parallax effect on image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out"
                    style={{
                      backgroundImage: `url(${images[currentIndex].src})`,
                      backgroundPosition: images[currentIndex].position || "center",
                      transform: `scale(1.1)`,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-1/3 z-20 text-center">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-auto max-w-3xl px-4"
              >
                <div className="mb-6 flex justify-center">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-rose/80 to-transparent"></div>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white drop-shadow-lg mb-4">
                  Jessica & Pablo
                </h2>
                <p className="font-['Poppins'] text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-md">
                  {images[currentIndex].caption}
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-rose/80 to-transparent"></div>
                </div>
              </motion.div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-4 sm:px-6 md:px-8">
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  goToPrev()
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                aria-label="Previous slide"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.preventDefault()
                  goToNext()
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                aria-label="Next slide"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Indicators */}
            <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center">
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      startAutoplay()
                    }}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      currentIndex === index ? "w-8 bg-white" : "bg-white/50 hover:bg-white/70",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Scroll down button */}
            <motion.button
              onClick={onScrollDown}
              className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ y: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll down"
            >
              <span className="mb-2 font-['Poppins'] text-sm">Ver invitación</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
