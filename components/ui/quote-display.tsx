"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface QuoteDisplayProps {
  quotes: {
    text: string
    icon: "quote" | "heart"
  }[]
}

export default function QuoteDisplay({ quotes }: QuoteDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const quotesRef = useRef<HTMLDivElement[]>([])
  const petalsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create floating petals
    if (petalsRef.current) {
      const petalTypes = ["petal", "rose-petal", "flower-petal", "leaf"]
      const petalColors = ["#edc3bf", "#e8c4c4", "#f5c4c8", "#d4b08c"]

      // Create 30 random petals
      for (let i = 0; i < 30; i++) {
        const petal = document.createElement("div")
        petal.className = "absolute petal pointer-events-none"

        // Random position
        petal.style.left = `${Math.random() * 100}%`
        petal.style.top = `${Math.random() * 100}%`
        petal.style.zIndex = Math.random() > 0.5 ? "1" : "-1"

        // Random size
        const size = 4 + Math.floor(Math.random() * 4)
        petal.style.width = `${size}rem`
        petal.style.height = `${size}rem`

        // Random type and color
        const type = petalTypes[Math.floor(Math.random() * petalTypes.length)]
        const color = petalColors[Math.floor(Math.random() * petalColors.length)]

        // Create SVG
        petal.innerHTML = createPetalSvg(type, color)

        petalsRef.current.appendChild(petal)

        // Animate petal
        gsap.set(petal, {
          opacity: 0,
          scale: 0,
          rotation: Math.random() * 360,
        })

        gsap.to(petal, {
          opacity: 0.6,
          scale: 1,
          duration: 1,
          delay: 0.1 * i,
          ease: "back.out(1.7)",
        })

        // Continuous animation
        gsap.to(petal, {
          y: `random(-30, 30)`,
          x: `random(-30, 30)`,
          rotation: `+=${Math.random() * 60 - 30}`,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        })
      }

      // Create falling petals
      for (let i = 0; i < 15; i++) {
        const petal = document.createElement("div")
        petal.className = "absolute petal-falling pointer-events-none"

        // Random position
        petal.style.left = `${Math.random() * 100}%`
        petal.style.top = `-${20 + Math.random() * 10}px`
        petal.style.zIndex = "2"

        // Random size
        const size = 3 + Math.floor(Math.random() * 3)
        petal.style.width = `${size}rem`
        petal.style.height = `${size}rem`

        // Random type and color
        const type = petalTypes[Math.floor(Math.random() * petalTypes.length)]
        const color = petalColors[Math.floor(Math.random() * petalColors.length)]

        // Create SVG
        petal.innerHTML = createPetalSvg(type, color)

        petalsRef.current.appendChild(petal)

        // Animate falling petal
        gsap.set(petal, {
          opacity: 0,
          scale: 0.5,
          rotation: Math.random() * 360,
        })

        gsap.to(petal, {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 200}`,
          rotation: `+=${Math.random() * 720 - 360}`,
          opacity: 0.8,
          scale: 1,
          duration: 5 + Math.random() * 10,
          delay: Math.random() * 15,
          repeat: -1,
          repeatDelay: Math.random() * 5,
          ease: "power1.inOut",
          onRepeat: () => {
            gsap.set(petal, {
              y: -100,
              x: `${Math.random() * 100}%`,
              rotation: Math.random() * 360,
            })
          },
        })
      }
    }

    // Animate quotes
    quotesRef.current.forEach((quote, index) => {
      if (!quote) return

      gsap.fromTo(
        quote,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3 * index,
          ease: "back.out(1.7)",
        },
      )

      // Animate quote decorative elements
      const decorElements = quote.querySelectorAll(".quote-decor")

      decorElements.forEach((elem) => {
        gsap.fromTo(
          elem,
          {
            scale: 0,
            opacity: 0,
            rotation: -30,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            delay: 0.5 + 0.3 * index,
            ease: "elastic.out(1, 0.5)",
          },
        )
      })

      // Animate SVG paths
      const paths = quote.querySelectorAll("path")

      paths.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 100

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.7 + 0.3 * index,
          ease: "power2.inOut",
        })
      })
    })
  }, [])

  // Helper function to create petal SVG
  const createPetalSvg = (type: string, color: string) => {
    switch (type) {
      case "petal":
        return `
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
              fill="${color}"
              fillOpacity="0.6"
              stroke="${color}"
              strokeWidth="1"
            />
          </svg>
        `
      case "rose-petal":
        return `
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 30C50 30 40 10 50 5C60 10 50 30 50 30Z"
              fill="${color}"
              fillOpacity="0.6"
              stroke="${color}"
              strokeWidth="1"
            />
          </svg>
        `
      case "flower-petal":
        return `
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
              fill="${color}"
              fillOpacity="0.6"
              stroke="${color}"
              strokeWidth="1"
            />
            <circle cx="50" cy="40" r="5" fill="${color}" fillOpacity="0.8" />
          </svg>
        `
      case "leaf":
        return `
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 20C50 20 80 50 50 80C20 50 50 20 50 20Z"
              fill="${color}"
              fillOpacity="0.6"
              stroke="${color}"
              strokeWidth="1"
            />
            <path d="M50 20V80" stroke="${color}" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        `
      default:
        return ""
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-12 overflow-hidden">
      {/* Background petals container */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none overflow-hidden"></div>

      {/* Ornamental frame */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left corner */}
        <div className="absolute top-0 left-0 w-24 h-24 quote-decor animate-fade-in-rotate">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 5 20 20 20 40C20 60 5 80 5 95" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M5 5C5 5 30 15 50 15C70 15 95 5 95 5" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Top right corner */}
        <div
          className="absolute top-0 right-0 w-24 h-24 quote-decor animate-fade-in-rotate-delay-100"
          style={{ transform: "scaleX(-1)" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 5 20 20 20 40C20 60 5 80 5 95" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M5 5C5 5 30 15 50 15C70 15 95 5 95 5" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bottom left corner */}
        <div
          className="absolute bottom-0 left-0 w-24 h-24 quote-decor animate-fade-in-rotate-delay-200"
          style={{ transform: "scaleY(-1)" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 5 20 20 20 40C20 60 5 80 5 95" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M5 5C5 5 30 15 50 15C70 15 95 5 95 5" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bottom right corner */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 quote-decor animate-fade-in-rotate-delay-300"
          style={{ transform: "scale(-1)" }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5C5 5 20 20 20 40C20 60 5 80 5 95" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
            <path d="M5 5C5 5 30 15 50 15C70 15 95 5 95 5" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Horizontal lines */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-8 quote-decor animate-fade-in-slide-down">
          <svg viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 15H290" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="150" cy="15" r="3" fill="#edc3bf" />
            <circle cx="10" cy="15" r="2" fill="#edc3bf" />
            <circle cx="290" cy="15" r="2" fill="#edc3bf" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-8 quote-decor animate-fade-in-slide-up">
          <svg viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 15H290" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
            <circle cx="150" cy="15" r="3" fill="#edc3bf" />
            <circle cx="10" cy="15" r="2" fill="#edc3bf" />
            <circle cx="290" cy="15" r="2" fill="#edc3bf" />
          </svg>
        </div>
      </div>

      {/* Quotes */}
      <div className="space-y-8 relative z-10">
        {quotes.map((quote, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) quotesRef.current[index] = el
            }}
            className={`glass-effect rounded-xl p-8 shadow-lg relative overflow-hidden transform-gpu transition-all duration-500 hover:shadow-xl border border-rose/10 hover:border-rose/30 group
            ${index === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
            hover:scale-[1.02] hover:-translate-y-1`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"></div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500 quote-decor animate-spin-slow">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 30C30 30 20 20 30 10C40 20 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 40 20 50 30C40 40 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 20 40 30 50C40 40 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M30 30C30 30 40 40 50 30C40 20 30 30 30 30Z" stroke="#d4af37" strokeWidth="1" />
              </svg>
            </div>

            <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500 quote-decor animate-spin-slow-reverse">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70 70C70 70 60 60 70 50C80 60 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 80 60 90 70C80 80 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 60 80 70 90C80 80 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
                <path d="M70 70C70 70 80 80 90 70C80 60 70 70 70 70Z" stroke="#d4af37" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-500 transform-gpu group-hover:scale-110 group-hover:rotate-12 transition-transform quote-decor animate-pulse-slow">
                {quote.icon === "quote" ? (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.5 8C9.5 8 9 9.5 9 11.5C9 13.5 10 15 12 15C14 15 15 13.5 15 11.5C15 9.5 14 8 12 8C10 8 9.5 8 9.5 8Z"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path d="M12 15V19" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 17H14" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="1 3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21C12 21 3 17.5 3 10C3 7.5 5 5 7.5 5C9 5 10.5 6 11 7C11.5 6 13 5 14.5 5C17 5 19 7.5 19 10C19 17.5 12 21 12 21Z"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 7V13" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 10H15" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>

              <p className="font-['Poppins'] text-foreground text-center text-lg md:text-xl italic relative leading-relaxed animate-fade-in">
                <span className="text-2xl text-[#d4af37] animate-pulse-slow">"</span>
                {quote.text}
                <span className="text-2xl text-[#d4af37] animate-pulse-slow">"</span>
              </p>

              {/* Subtle animated underline */}
              <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mt-4 group-hover:w-1/2 transition-all duration-500 animate-width-expand"></div>
            </div>

            {/* Floating elements inside quote */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-float quote-decor">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="10" fill="#d4af37" fillOpacity="0.5" />
              </svg>
            </div>

            <div className="absolute bottom-1/4 right-1/4 w-6 h-6 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-float-delay-500 quote-decor">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30,50 L50,30 L70,50 L50,70 Z" fill="#d4af37" fillOpacity="0.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
