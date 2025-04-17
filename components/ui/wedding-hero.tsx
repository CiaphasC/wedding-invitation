"use client"
import { useEffect, useRef, useState, type FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { CalendarDays, Heart } from "lucide-react"

export const WeddingHero: FC = () => {
  // State for hover effects
  const [isHovering, setIsHovering] = useState(false)

  // Refs for animated SVG elements
  const topOrnamentRef = useRef<SVGSVGElement>(null)
  const bottomOrnamentRef = useRef<SVGSVGElement>(null)
  const leftRoseRef = useRef<SVGSVGElement>(null)
  const rightRoseRef = useRef<SVGSVGElement>(null)
  const petalContainerRef = useRef<HTMLDivElement>(null)
  const branchesRef = useRef<SVGSVGElement>(null)
  const mobileOrnamentRef = useRef<SVGSVGElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const heartsContainerRef = useRef<HTMLDivElement>(null)

  // Colors
  const paleRoseColor = "#E6A8A1"
  const goldColor = "#D4B78F"
  const deepRoseColor = "#C27C7C"
  const accentColor = "#9E7F5F"
  const goldGradient = "linear-gradient(135deg, #D4B78F 0%, #E6C787 50%, #D4AF37 100%)"

  useEffect(() => {
    // Card hover effect
    if (cardRef.current) {
      const card = cardRef.current

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 30
        const rotateY = (centerX - x) / 30

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      card.addEventListener("mousemove", handleMouseMove)
      card.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        card.removeEventListener("mousemove", handleMouseMove)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    // Create hearts animation
    if (heartsContainerRef.current) {
      const createHeart = () => {
        const heart = document.createElement("div")

        // Random position
        const left = Math.random() * 100
        const delay = Math.random() * 5
        const size = 10 + Math.random() * 20
        const duration = 10 + Math.random() * 20

        // Set styles
        heart.style.position = "absolute"
        heart.style.left = `${left}%`
        heart.style.bottom = "-50px"
        heart.style.width = `${size}px`
        heart.style.height = `${size}px`
        heart.style.opacity = "0"
        heart.style.zIndex = "5"
        heart.style.animation = `float-heart ${duration}s ease-in-out ${delay}s infinite`

        // Create SVG heart
        heart.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="${Math.random() > 0.7 ? goldColor : paleRoseColor}" 
              fillOpacity="${Math.random() * 0.5 + 0.3}" 
              stroke="${deepRoseColor}" 
              strokeWidth="1" />
          </svg>
        `

        // Add to container
        heartsContainerRef.current?.appendChild(heart)

        // Animate
        gsap.to(heart, {
          opacity: Math.random() * 0.7 + 0.3,
          y: -window.innerHeight - 100,
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360,
          duration: duration,
          ease: "power1.inOut",
          onComplete: () => {
            heart.remove()
          },
        })
      }

      // Create initial hearts
      for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 1000)
      }

      // Continue creating hearts at intervals
      const interval = setInterval(createHeart, 3000)

      return () => clearInterval(interval)
    }

    // Create sparkle effect
    if (sparklesRef.current) {
      const createSparkle = () => {
        const sparkle = document.createElement("div")

        // Random position
        const left = Math.random() * 100
        const top = Math.random() * 100
        const size = 3 + Math.random() * 8

        // Set styles
        sparkle.style.position = "absolute"
        sparkle.style.left = `${left}%`
        sparkle.style.top = `${top}%`
        sparkle.style.width = `${size}px`
        sparkle.style.height = `${size}px`
        sparkle.style.borderRadius = "50%"
        sparkle.style.backgroundColor = Math.random() > 0.7 ? goldColor : paleRoseColor
        sparkle.style.boxShadow = `0 0 ${size * 2}px ${size / 2}px ${Math.random() > 0.7 ? goldColor : paleRoseColor}`
        sparkle.style.opacity = "0"
        sparkle.style.zIndex = "10"

        // Add to container
        sparklesRef.current?.appendChild(sparkle)

        // Animate
        gsap.to(sparkle, {
          opacity: Math.random() * 0.7 + 0.3,
          duration: 0.3,
          onComplete: () => {
            gsap.to(sparkle, {
              opacity: 0,
              duration: 0.5,
              delay: Math.random() * 1 + 0.5,
              onComplete: () => {
                sparkle.remove()
              },
            })
          },
        })
      }

      // Create initial sparkles
      for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 200)
      }

      // Continue creating sparkles at intervals
      const interval = setInterval(createSparkle, 500)

      return () => clearInterval(interval)
    }

    // Glow animation
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    // Animation for top ornament (gentle rotation)
    if (topOrnamentRef.current) {
      gsap.to(topOrnamentRef.current, {
        rotation: 5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }

    // Animation for bottom ornament (opposite rotation)
    if (bottomOrnamentRef.current) {
      gsap.to(bottomOrnamentRef.current, {
        rotation: -5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }

    // Mobile ornament animation
    if (mobileOrnamentRef.current) {
      // Draw animation for the ornament paths
      const paths = mobileOrnamentRef.current.querySelectorAll(".mobile-ornament-path")
      paths.forEach((path, index) => {
        gsap.set(path, {
          strokeDasharray: 300,
          strokeDashoffset: 300,
        })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 0.2 * index,
          ease: "power2.inOut",
        })
      })

      // Gentle floating animation
      gsap.to(mobileOrnamentRef.current, {
        y: 5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }

    // Animation for left rose (gentle floating)
    if (leftRoseRef.current) {
      // Draw animation for rose petals
      const petals = leftRoseRef.current.querySelectorAll(".rose-petal")
      petals.forEach((petal, index) => {
        gsap.set(petal, {
          strokeDasharray: 100,
          strokeDashoffset: 100,
          fillOpacity: 0,
        })
        gsap.to(petal, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.2 * index,
          ease: "power2.inOut",
        })
        gsap.to(petal, {
          fillOpacity: 0.8,
          duration: 1,
          delay: 0.5 + 0.2 * index,
          ease: "power2.inOut",
        })
      })

      // Draw animation for stems
      const stems = leftRoseRef.current.querySelectorAll(".rose-stem")
      stems.forEach((stem, index) => {
        gsap.set(stem, {
          strokeDasharray: 100,
          strokeDashoffset: 100,
        })
        gsap.to(stem, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 1 + 0.1 * index,
          ease: "power2.inOut",
        })
      })

      // Floating animation for the entire rose
      gsap.to(leftRoseRef.current, {
        y: 10,
        rotation: 2,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      })
    }

    // Animation for right rose (mirrored floating)
    if (rightRoseRef.current) {
      // Draw animation for rose petals
      const petals = rightRoseRef.current.querySelectorAll(".rose-petal")
      petals.forEach((petal, index) => {
        gsap.set(petal, {
          strokeDasharray: 100,
          strokeDashoffset: 100,
          fillOpacity: 0,
        })
        gsap.to(petal, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.2 * index,
          ease: "power2.inOut",
        })
        gsap.to(petal, {
          fillOpacity: 0.8,
          duration: 1,
          delay: 0.5 + 0.2 * index,
          ease: "power2.inOut",
        })
      })

      // Draw animation for stems
      const stems = rightRoseRef.current.querySelectorAll(".rose-stem")
      stems.forEach((stem, index) => {
        gsap.set(stem, {
          strokeDasharray: 100,
          strokeDashoffset: 100,
        })
        gsap.to(stem, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 1 + 0.1 * index,
          ease: "power2.inOut",
        })
      })

      // Floating animation for the entire rose
      gsap.to(rightRoseRef.current, {
        y: -10,
        rotation: -2,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      })
    }

    // Animate ornamental branches
    if (branchesRef.current) {
      const branches = branchesRef.current.querySelectorAll(".branch-path")
      branches.forEach((branch, index) => {
        gsap.set(branch, {
          strokeDasharray: 500,
          strokeDashoffset: 500,
        })
        gsap.to(branch, {
          strokeDashoffset: 0,
          duration: 3,
          delay: 0.5 + 0.2 * index,
          ease: "power2.inOut",
        })
      })

      // Subtle movement for branches
      gsap.to(branchesRef.current, {
        scale: 1.02,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    }

    // Falling petals animation
    if (petalContainerRef.current) {
      const createPetal = () => {
        const petal = document.createElement("div")
        petal.className = "absolute petal-falling"

        // Random petal type
        const petalTypes = ["petal", "rose-petal", "leaf", "small-petal", "round-petal"]
        const petalType = petalTypes[Math.floor(Math.random() * petalTypes.length)]

        // Random color
        const colors = [paleRoseColor, deepRoseColor, "#edc3bf", "#e8c4c4", "#d4b08c", "#f5d0c5", "#f0c0b0"]
        const color = colors[Math.floor(Math.random() * colors.length)]

        // Random position, size and rotation
        const left = Math.random() * 100
        const size = 15 + Math.random() * 25
        const rotation = Math.random() * 360

        // Set styles
        petal.style.left = `${left}%`
        petal.style.top = "-50px"
        petal.style.width = `${size}px`
        petal.style.height = `${size}px`
        petal.style.transform = `rotate(${rotation}deg)`
        petal.style.filter = "drop-shadow(0 0 3px rgba(255,255,255,0.5))"

        // Create SVG based on petal type
        let svgContent = ""
        if (petalType === "petal") {
          svgContent = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z" 
                fill="${color}" fillOpacity="0.8" stroke="${color}" strokeWidth="1" />
            </svg>
          `
        } else if (petalType === "rose-petal") {
          svgContent = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 30C50 30 40 10 50 5C60 10 50 30 50 30Z" 
                fill="${color}" fillOpacity="0.8" stroke="${color}" strokeWidth="1" />
            </svg>
          `
        } else if (petalType === "leaf") {
          svgContent = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20C50 20 80 50 50 80C20 50 50 20 50 20Z" 
                fill="${color}" fillOpacity="0.8" stroke="${color}" strokeWidth="1" />
              <path d="M50 20V80" stroke="${color}" strokeWidth="1" strokeDasharray="2" />
            </svg>
          `
        } else if (petalType === "small-petal") {
          svgContent = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 40C50 40 60 30 50 20C40 30 50 40 50 40Z" 
                fill="${color}" fillOpacity="0.8" stroke="${color}" strokeWidth="1" />
            </svg>
          `
        } else {
          svgContent = `
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="30" 
                fill="${color}" fillOpacity="0.6" stroke="${color}" strokeWidth="1" />
            </svg>
          `
        }

        petal.innerHTML = svgContent

        // Add to container
        petalContainerRef.current?.appendChild(petal)

        // Animate
        const duration = 5 + Math.random() * 10
        gsap.to(petal, {
          y: window.innerHeight + 100,
          x: (Math.random() - 0.5) * 300,
          rotation: rotation + Math.random() * 360,
          opacity: 0,
          duration: duration,
          ease: "power1.in",
          onComplete: () => {
            petal.remove()
          },
        })
      }

      // Create initial petals (more of them)
      for (let i = 0; i < 30; i++) {
        setTimeout(() => createPetal(), i * 150)
      }

      // Continue creating petals at intervals (more frequently)
      const interval = setInterval(createPetal, 800)

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <motion.div
      layout
      className="w-full py-12 flex flex-col items-center justify-center text-center relative transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Background gradient with Tailwind 4.1 features */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-white/10 to-rose-50/30 z-0 backdrop-blur-[2px]"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] z-0"></div>

      {/* Container for floating hearts */}
      <div ref={heartsContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-5"></div>

      {/* Container for falling petals */}
      <div ref={petalContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10"></div>

      {/* Container for sparkles */}
      <div ref={sparklesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-20"></div>

      {/* Ornamental branches - hidden on mobile, visible on larger screens */}
      <svg
        ref={branchesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top left branch */}
        <path
          d="M0 100 Q100 50, 150 100 T250 80 T350 100"
          stroke={paleRoseColor}
          strokeWidth="2"
          fill="none"
          className="branch-path"
        />
        <path
          d="M150 100 Q170 70, 180 50"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M250 80 Q270 60, 260 30"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M200 90 Q220 70, 230 80"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />

        {/* Top right branch */}
        <path
          d="M1000 150 Q900 100, 850 150 T750 130 T650 150"
          stroke={paleRoseColor}
          strokeWidth="2"
          fill="none"
          className="branch-path"
        />
        <path
          d="M850 150 Q830 120, 820 100"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M750 130 Q730 110, 740 80"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M800 140 Q780 120, 770 130"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />

        {/* Bottom left branch */}
        <path
          d="M0 500 Q100 550, 150 500 T250 520 T350 500"
          stroke={paleRoseColor}
          strokeWidth="2"
          fill="none"
          className="branch-path"
        />
        <path
          d="M150 500 Q170 530, 180 550"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M250 520 Q270 540, 260 570"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M200 510 Q220 530, 230 520"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />

        {/* Bottom right branch */}
        <path
          d="M1000 450 Q900 500, 850 450 T750 470 T650 450"
          stroke={paleRoseColor}
          strokeWidth="2"
          fill="none"
          className="branch-path"
        />
        <path
          d="M850 450 Q830 480, 820 500"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M750 470 Q730 490, 740 520"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />
        <path
          d="M800 460 Q780 480, 770 470"
          stroke={paleRoseColor}
          strokeWidth="1.5"
          fill="none"
          className="branch-path"
        />

        {/* Small decorative flowers on branches */}
        <circle cx="180" cy="50" r="6" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="260" cy="30" r="5" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="230" cy="80" r="4" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />

        <circle cx="820" cy="100" r="6" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="740" cy="80" r="5" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="770" cy="130" r="4" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />

        <circle cx="180" cy="550" r="6" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="260" cy="570" r="5" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="230" cy="520" r="4" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />

        <circle cx="820" cy="500" r="6" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="740" cy="520" r="5" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
        <circle cx="770" cy="470" r="4" fill={paleRoseColor} fillOpacity="0.8" className="branch-path" />
      </svg>

      {/* Main content with glass effect */}
      <div className="relative max-w-3xl mx-auto z-30">
        {/* Top ornament - hidden on mobile */}
        <div className="absolute top-[-70px] left-1/2 transform -translate-x-1/2 transition-all duration-500 hidden md:block">
          <svg
            ref={topOrnamentRef}
            width="240"
            height="100"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            <path
              d="M120 0 C145 25, 170 50, 120 75"
              stroke={deepRoseColor}
              strokeWidth="3"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M120 0 C95 25, 70 50, 120 75"
              stroke={deepRoseColor}
              strokeWidth="3"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M120 0 C120 37.5, 120 37.5, 120 75"
              stroke={goldColor}
              strokeWidth="2"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Decorative flowers */}
            <circle
              cx="120"
              cy="0"
              r="5"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="draw-path"
            />
            <circle
              cx="120"
              cy="75"
              r="5"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="draw-path"
            />

            {/* Additional decorative elements */}
            <path
              d="M90 37.5 C100 32.5, 110 27.5, 120 37.5 C130 27.5, 140 32.5, 150 37.5"
              stroke={goldColor}
              strokeWidth="1.5"
              fill="none"
              className="draw-path"
            />
          </svg>
        </div>

        {/* Mobile-specific ornament - only visible on mobile */}
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 transition-all duration-500 md:hidden">
          <svg
            ref={mobileOrnamentRef}
            width="200"
            height="70"
            viewBox="0 0 200 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            {/* Elegant curved lines */}
            <path
              d="M100 0 C120 20, 140 40, 100 60"
              stroke={deepRoseColor}
              strokeWidth="2.5"
              fill="none"
              className="mobile-ornament-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M100 0 C80 20, 60 40, 100 60"
              stroke={deepRoseColor}
              strokeWidth="2.5"
              fill="none"
              className="mobile-ornament-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Small decorative flowers */}
            <circle
              cx="100"
              cy="0"
              r="4"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="mobile-ornament-path"
            />
            <circle
              cx="100"
              cy="60"
              r="4"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="mobile-ornament-path"
            />

            {/* Small petals */}
            <path
              d="M60 30C60 30 55 20 60 15C65 20 60 30 60 30Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0.7"
              className="mobile-ornament-path"
            />
            <path
              d="M140 30C140 30 135 20 140 15C145 20 140 30 140 30Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0.7"
              className="mobile-ornament-path"
            />

            {/* Gold accents */}
            <path
              d="M80 30 C90 25, 110 25, 120 30"
              stroke={goldColor}
              strokeWidth="1.5"
              fill="none"
              className="mobile-ornament-path"
            />
          </svg>
        </div>

        {/* Left rose */}
        <div className="absolute top-[-50px] left-[-80px] transition-all duration-500 hidden md:block">
          <svg
            ref={leftRoseRef}
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            {/* Rose petals */}
            <path
              d="M75 37.5C75 37.5 62.5 18.75 75 12.5C87.5 18.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 93.75 18.75 100 31.25C87.5 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 87.5 56.25 75 62.5C62.5 56.25 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 56.25 18.75 50 31.25C62.5 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Additional inner petals */}
            <path
              d="M75 37.5C75 37.5 68.75 31.25 75 25C81.25 31.25 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
            />
            <path
              d="M75 37.5C75 37.5 81.25 31.25 87.5 37.5C81.25 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
            />

            {/* Stem and leaves */}
            <path d="M75 62.5V112.5" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" className="rose-stem" />
            <path
              d="M75 81.25H56.25C56.25 81.25 62.5 68.75 75 81.25Z"
              stroke="#9c6644"
              strokeWidth="2"
              fill="#9c6644"
              fillOpacity="0.5"
              className="rose-stem"
            />
            <path
              d="M75 93.75H93.75C93.75 93.75 87.5 106.25 75 93.75Z"
              stroke="#9c6644"
              strokeWidth="2"
              fill="#9c6644"
              fillOpacity="0.5"
              className="rose-stem"
            />

            {/* Gold accents */}
            <circle cx="75" cy="25" r="2" fill={goldColor} className="rose-petal" />
          </svg>
        </div>

        {/* Right rose */}
        <div className="absolute top-[-50px] right-[-80px] transition-all duration-500 hidden md:block">
          <svg
            ref={rightRoseRef}
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            {/* Rose petals */}
            <path
              d="M75 37.5C75 37.5 62.5 18.75 75 12.5C87.5 18.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 93.75 18.75 100 31.25C87.5 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 87.5 56.25 75 62.5C62.5 56.25 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M75 37.5C75 37.5 56.25 18.75 50 31.25C62.5 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="2"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Additional inner petals */}
            <path
              d="M75 37.5C75 37.5 68.75 31.25 75 25C81.25 31.25 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
            />
            <path
              d="M75 37.5C75 37.5 81.25 31.25 87.5 37.5C81.25 43.75 75 37.5 75 37.5Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0"
              className="rose-petal"
            />

            {/* Stem and leaves */}
            <path d="M75 62.5V112.5" stroke="#9c6644" strokeWidth="2" strokeLinecap="round" className="rose-stem" />
            <path
              d="M75 81.25H56.25C56.25 81.25 62.5 68.75 75 81.25Z"
              stroke="#9c6644"
              strokeWidth="2"
              fill="#9c6644"
              fillOpacity="0.5"
              className="rose-stem"
            />
            <path
              d="M75 93.75H93.75C93.75 93.75 87.5 106.25 75 93.75Z"
              stroke="#9c6644"
              strokeWidth="2"
              fill="#9c6644"
              fillOpacity="0.5"
              className="rose-stem"
            />

            {/* Gold accents */}
            <circle cx="75" cy="25" r="2" fill={goldColor} className="rose-petal" />
          </svg>
        </div>

        {/* Glass card container - enhanced with 3D effects and Tailwind 4.1 features */}
        <div
          ref={cardRef}
          className="relative bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden mx-4 sm:mx-auto transform-gpu will-change-transform"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Glow effect */}
          <div
            ref={glowRef}
            className="absolute inset-0 bg-gradient-to-r from-rose-100/20 via-white/30 to-rose-100/20 opacity-0 z-10"
          ></div>

          {/* Glass shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-gold opacity-60 z-20"></div>

          {/* Decorative border */}
          <div className="absolute inset-[3px] border border-gold/20 rounded-xl pointer-events-none z-30"></div>

          {/* Inner petals for decoration */}
          <div className="absolute top-5 left-5 opacity-50 z-40">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 10C50 10 70 30 70 50C70 70 50 90 30 70C10 50 30 30 50 10Z"
                fill={deepRoseColor}
                stroke={deepRoseColor}
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="absolute bottom-5 right-5 opacity-50 z-40">
            <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 30C50 30 40 10 50 5C60 10 50 30 50 30Z"
                fill={deepRoseColor}
                stroke={deepRoseColor}
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Content - enhanced with shadows and styling */}
          <h3 className="font-georgia italic text-center text-base sm:text-lg md:text-xl font-light text-gray-800 mb-6 transition-all duration-500 relative z-50 drop-shadow-sm">
            <span className="relative">
              <span className="absolute -inset-1 blur-sm bg-white/50 rounded-lg -z-10"></span>
              Con la bendición de Dios y en compañía de nuestros padrinos
            </span>
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 transition-all duration-500 relative z-50">
            <motion.div
              layout
              className="flex flex-col items-center transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-georgia italic text-center text-xl sm:text-2xl md:text-4xl text-[#9E7F5F] mb-2 transition-all duration-500 drop-shadow-md">
                <span className="relative">
                  <span className="absolute -inset-1 blur-sm bg-white/30 rounded-lg -z-10"></span>
                  Manuel Pereira
                </span>
              </h2>
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4B78F] to-transparent transition-all duration-500"></div>
            </motion.div>

            <div className="hidden md:block transition-all duration-500">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse-glow drop-shadow-lg"
              >
                <path
                  d="M30 7.5C30 7.5 37.5 30 30 52.5M30 7.5C30 7.5 22.5 30 30 52.5"
                  stroke={goldColor}
                  strokeWidth="2"
                  className="draw-path"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="7.5"
                  stroke={goldColor}
                  strokeWidth="1.5"
                  fill="none"
                  className="draw-path"
                />
                <circle cx="30" cy="30" r="2.5" fill={goldColor} className="draw-path" />
              </svg>
            </div>

            {/* Mobile separator - only visible on mobile */}
            <div className="block md:hidden w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4B78F] to-transparent my-2"></div>

            <motion.div
              layout
              className="flex flex-col items-center transition-all duration-500"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-georgia italic text-center text-xl sm:text-2xl md:text-4xl text-[#9E7F5F] mb-2 transition-all duration-500 drop-shadow-md">
                <span className="relative">
                  <span className="absolute -inset-1 blur-sm bg-white/30 rounded-lg -z-10"></span>
                  Verónica Ortiz
                </span>
              </h2>
              <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4B78F] to-transparent transition-all duration-500"></div>
            </motion.div>
          </div>

          {/* Decorative date display */}
          <div className="mt-10 relative z-50">
            <div className="text-center font-georgia italic text-base sm:text-lg md:text-xl text-[#9E7F5F] drop-shadow-md">
              <span className="relative inline-flex items-center animate-fade-in-up">
                {/* Fondo decorativo animado */}
                <span className="absolute -inset-1 bg-white/20 rounded-xl blur-md -z-10 shadow-lg animate-pulse-slow" />
                
                {/* Icono con tamaño responsive */}
                <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gold opacity-90 drop-shadow" />
                
                {/* Fecha estilizada con responsive padding y fuente */}
                <span className="bg-gradient-to-r from-[#F5DEB3]/60 to-[#D2B48C]/60 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg shadow-inner ring-1 ring-white/20 backdrop-blur-md transition hover:scale-105 hover:brightness-110 duration-300 text-sm sm:text-base md:text-lg">
                  02 · Agosto · 2025
                </span>
              </span>
            </div>
          </div>


          {/* RSVP Button */}
          <div className="mt-8 flex justify-center">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#D4B78F] via-[#E6C787] to-[#D4B78F] hover:from-[#E6C787] hover:to-[#E6C787] text-white font-georgia italic px-8 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Heart className="w-4 h-4 mr-2 animate-pulse" />
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hover effect particles - only visible on hover */}
          {isHovering && (
            <div className="absolute inset-0 pointer-events-none z-60">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gold/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `ping-slow ${2 + Math.random() * 3}s cubic-bezier(0, 0, 0.2, 1) infinite ${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom ornament - hidden on mobile */}
        <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 transition-all duration-500 hidden md:block">
          <svg
            ref={bottomOrnamentRef}
            width="240"
            height="100"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            <path
              d="M120 100 C145 75, 170 50, 120 25"
              stroke={deepRoseColor}
              strokeWidth="3"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M120 100 C95 75, 70 50, 120 25"
              stroke={deepRoseColor}
              strokeWidth="3"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M120 100 C120 62.5, 120 62.5, 120 25"
              stroke={goldColor}
              strokeWidth="2"
              fill="none"
              className="draw-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Decorative flowers */}
            <circle
              cx="120"
              cy="100"
              r="5"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="draw-path"
            />
            <circle
              cx="120"
              cy="25"
              r="5"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="draw-path"
            />

            {/* Additional decorative elements */}
            <path
              d="M90 62.5 C100 67.5, 110 72.5, 120 62.5 C130 72.5, 140 67.5, 150 62.5"
              stroke={goldColor}
              strokeWidth="1.5"
              fill="none"
              className="draw-path"
            />
          </svg>
        </div>

        {/* Mobile-specific bottom ornament - only visible on mobile */}
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 transition-all duration-500 md:hidden">
          <svg
            width="200"
            height="70"
            viewBox="0 0 200 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform-gpu drop-shadow-lg"
          >
            <path
              d="M100 70 C120 50, 140 30, 100 10"
              stroke={deepRoseColor}
              strokeWidth="2.5"
              fill="none"
              className="mobile-ornament-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />
            <path
              d="M100 70 C80 50, 60 30, 100 10"
              stroke={deepRoseColor}
              strokeWidth="2.5"
              fill="none"
              className="mobile-ornament-path"
              filter="drop-shadow(0 0 2px rgba(255,255,255,0.8))"
            />

            {/* Small decorative flowers */}
            <circle
              cx="100"
              cy="70"
              r="4"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="mobile-ornament-path"
            />
            <circle
              cx="100"
              cy="10"
              r="4"
              fill={goldColor}
              stroke={deepRoseColor}
              strokeWidth="1"
              className="mobile-ornament-path"
            />

            {/* Small petals */}
            <path
              d="M60 40C60 40 55 50 60 55C65 50 60 40 60 40Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0.7"
              className="mobile-ornament-path"
            />
            <path
              d="M140 40C140 40 135 50 140 55C145 50 140 40 140 40Z"
              stroke={deepRoseColor}
              strokeWidth="1.5"
              fill={deepRoseColor}
              fillOpacity="0.7"
              className="mobile-ornament-path"
            />

            {/* Gold accents */}
            <path
              d="M80 40 C90 45, 110 45, 120 40"
              stroke={goldColor}
              strokeWidth="1.5"
              fill="none"
              className="mobile-ornament-path"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
