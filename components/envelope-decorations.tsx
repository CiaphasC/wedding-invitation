"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useWindowSize } from "@/hooks/use-window-size"

interface EnvelopeDecorationsProps {
  isOpen: boolean
  showContent: boolean
}

export default function EnvelopeDecorations({ isOpen, showContent }: EnvelopeDecorationsProps) {
  const decorationsRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const [hasTransitioned, setHasTransitioned] = useState(false)

  // Initialize decorations and set up parallax effect
  useEffect(() => {
    if (!decorationsRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!decorationsRef.current) return

      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const yPos = (clientY / window.innerHeight - 0.5) * 2 // -1 to 1

      const decorElements = decorationsRef.current.querySelectorAll(".decor-element")

      decorElements.forEach((element) => {
        const depth = Number.parseFloat((element as HTMLElement).dataset.depth || "0.1")

        gsap.to(element, {
          x: xPos * 30 * depth,
          y: yPos * 30 * depth,
          rotation: xPos * 5 * depth,
          duration: 1,
          ease: "power2.out",
        })
      })
    }

    // Add mouse move listener for parallax effect
    window.addEventListener("mousemove", handleMouseMove)

    // Initial animation for decorations
    const decorElements = decorationsRef.current.querySelectorAll(".decor-element")

    gsap.fromTo(
      decorElements,
      {
        scale: 0.5,
        opacity: 0,
        rotation: -10,
      },
      {
        scale: 1,
        opacity: 0.9,
        rotation: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
    )

    // Add continuous subtle animations
    decorElements.forEach((element, index) => {
      // Create different animation patterns for different elements
      const duration = 3 + Math.random() * 4
      const delay = Math.random() * 2
      const yAmount = 5 + Math.random() * 10
      const rotateAmount = 3 + Math.random() * 5

      gsap.to(element, {
        y: `+=${yAmount}`,
        rotation: `+=${rotateAmount}`,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Update the transition effect to position decorations further from content on mobile
  // Handle transition when envelope is opened
  useEffect(() => {
    if (!decorationsRef.current) return

    if (isOpen && showContent && !hasTransitioned) {
      const decorElements = decorationsRef.current.querySelectorAll(".decor-element")

      // Move decorations to corners and sides
      decorElements.forEach((element, index) => {
        let targetX = 0
        let targetY = 0
        // Smaller scale on mobile for less intrusion
        const targetScale = width < 640 ? 0.4 : width < 768 ? 0.6 : 0.7
        let targetRotation = 0
        // More transparency on mobile
        const targetOpacity = width < 640 ? 0.6 : 0.9

        // Position in corners and sides based on index
        // We'll use modulo 8 to create 8 different positions (4 corners + 4 sides)
        switch (index % 8) {
          case 0: // Top left
            targetX = width < 640 ? -25 : width < 768 ? -20 : -30
            targetY = width < 640 ? -25 : -20
            targetRotation = -15
            break
          case 1: // Top right
            targetX = width < 640 ? 25 : width < 768 ? 20 : 30
            targetY = width < 640 ? -25 : -20
            targetRotation = 15
            break
          case 2: // Bottom right
            targetX = width < 640 ? 25 : width < 768 ? 20 : 30
            targetY = width < 640 ? 25 : 20
            targetRotation = 15
            break
          case 3: // Bottom left
            targetX = width < 640 ? -25 : width < 768 ? -20 : -30
            targetY = width < 640 ? 25 : 20
            targetRotation = -15
            break
          case 4: // Left center
            targetX = width < 640 ? -30 : width < 768 ? -30 : -40
            targetY = 0
            targetRotation = -10
            break
          case 5: // Right center
            targetX = width < 640 ? 30 : width < 768 ? 30 : 40
            targetY = 0
            targetRotation = 10
            break
          case 6: // Top center
            targetX = 0
            targetY = width < 640 ? -30 : width < 768 ? -25 : -30
            targetRotation = 0
            break
          case 7: // Bottom center
            targetX = 0
            targetY = width < 640 ? 30 : width < 768 ? 25 : 30
            targetRotation = 0
            break
        }

        gsap.to(element, {
          xPercent: targetX * 10,
          yPercent: targetY * 10,
          scale: targetScale,
          rotation: targetRotation,
          opacity: targetOpacity,
          duration: 1.5,
          ease: "power3.inOut",
        })
      })

      setHasTransitioned(true)
    } else if (!isOpen) {
      // Reset positions when envelope is closed
      const decorElements = decorationsRef.current.querySelectorAll(".decor-element")

      gsap.to(decorElements, {
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        opacity: 0.9,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      })

      setHasTransitioned(false)
    }
  }, [isOpen, showContent, width, hasTransitioned])

  // Update the SVG elements to have conditional opacity based on screen size
  // Replace the return statement with this enhanced version that includes responsive opacity

  return (
    <div ref={decorationsRef} className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Floral corner decorations */}
      <div
        className="decor-element absolute top-10 left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10,50 Q30,30 50,10 Q70,30 90,50 Q70,70 50,90 Q30,70 10,50 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            opacity={width < 640 ? "0.5" : "0.7"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M40,20 C50,10 60,20 50,30 C40,20 30,30 40,20 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.2" : "0.3"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M60,20 C70,10 80,20 70,30 C60,20 50,30 60,20 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.2" : "0.3"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.9s" }}
          />
        </svg>
      </div>

      <div
        className="decor-element absolute top-10 right-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
        data-depth="0.15"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20,20 Q35,5 50,20 Q65,5 80,20 Q95,35 80,50 Q95,65 80,80 Q65,95 50,80 Q35,95 20,80 Q5,65 20,50 Q5,35 20,20 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="animate-pulse-soft"
          />
          <path
            d="M40,30 C45,25 55,25 60,30"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.5s" }}
          />
          <path
            d="M40,70 C45,75 55,75 60,70"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.7s" }}
          />
        </svg>
      </div>

      <div
        className="decor-element absolute bottom-10 right-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
        data-depth="0.25"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,10 C70,30 90,50 70,70 C50,90 30,70 10,50 C30,30 50,10 50,10 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M50,20 C65,35 80,50 65,65 C50,80 35,65 20,50 C35,35 50,20 50,20 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            opacity={width < 640 ? "0.5" : "0.7"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M50,30 C60,40 70,50 60,60 C50,70 40,60 30,50 C40,40 50,30 50,30 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="50"
            cy="50"
            r="5"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.5"}
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      <div
        className="decor-element absolute bottom-10 left-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10,10 L90,10 L90,90 L10,90 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M30,30 L70,30 L70,70 L30,70 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M10,10 C30,30 70,30 90,10"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M10,90 C30,70 70,70 90,90"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.9s" }}
          />
        </svg>
      </div>

      {/* Side decorative elements - Left */}
      <div
        className="decor-element absolute top-1/3 left-5 w-16 h-32 sm:w-20 sm:h-40 md:w-24 md:h-48"
        data-depth="0.15"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25,10 C15,30 15,70 25,90"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M15,20 C25,40 25,60 15,80"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M35,20 C25,40 25,60 35,80"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="25"
            cy="25"
            r="3"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
          <circle
            cx="25"
            cy="50"
            r="3"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="25"
            cy="75"
            r="3"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* Side decorative elements - Right */}
      <div
        className="decor-element absolute top-1/3 right-5 w-16 h-32 sm:w-20 sm:h-40 md:w-24 md:h-48"
        data-depth="0.15"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25,10 C35,30 35,70 25,90"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M35,20 C25,40 25,60 35,80"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M15,20 C25,40 25,60 15,80"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="25"
            cy="25"
            r="3"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
          <circle
            cx="25"
            cy="50"
            r="3"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="25"
            cy="75"
            r="3"
            fill="#e8c4c4"
            className="animate-pulse-soft"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* New floral side elements - Left middle */}
      <div
        className="decor-element absolute top-1/2 left-8 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,20 C30,20 20,40 20,50 C20,60 30,80 50,80 C70,80 80,60 80,50 C80,40 70,20 50,20 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M50,30 C35,30 30,45 30,50 C30,55 35,70 50,70 C65,70 70,55 70,50 C70,45 65,30 50,30 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.1" : "0.15"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d="M30,50 C40,45 60,45 70,50"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.8s" }}
          />
          <path
            d="M30,50 C40,55 60,55 70,50"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "1.2s" }}
          />
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      {/* New floral side elements - Right middle */}
      <div
        className="decor-element absolute top-1/2 right-8 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20,20 L80,20 L80,80 L20,80 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
          />
          <path
            d="M35,35 L65,35 L65,65 L35,65 Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.1" : "0.15"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d="M20,20 C35,35 65,35 80,20"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.8s" }}
          />
          <path
            d="M20,80 C35,65 65,65 80,80"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "1.2s" }}
          />
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      {/* New top and bottom decorative elements */}
      <div
        className="decor-element absolute top-5 left-1/2 transform -translate-x-1/2 w-40 h-16 sm:w-48 sm:h-20 md:w-56 md:h-24"
        data-depth="0.1"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,25 H180" stroke="#edc3bf" strokeWidth="1" strokeDasharray="1 5" className="animate-draw-svg" />
          <path
            d="M60,10 C80,40 120,40 140,10"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M60,40 C80,10 120,10 140,40"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="100"
            cy="25"
            r="4"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
          <circle
            cx="60"
            cy="25"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.3" : "0.4"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            cx="140"
            cy="25"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.3" : "0.4"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>
      </div>

      <div
        className="decor-element absolute bottom-5 left-1/2 transform -translate-x-1/2 w-40 h-16 sm:w-48 sm:h-20 md:w-56 md:h-24"
        data-depth="0.1"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,25 H180" stroke="#edc3bf" strokeWidth="1" strokeDasharray="1 5" className="animate-draw-svg" />
          <path
            d="M60,10 C80,40 120,40 140,10"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M60,40 C80,10 120,10 140,40"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="100"
            cy="25"
            r="4"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
          <circle
            cx="60"
            cy="25"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.3" : "0.4"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            cx="140"
            cy="25"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.3" : "0.4"}
            className="animate-pulse-soft"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>
      </div>

      {/* Rose decorations */}
      <div
        className="decor-element absolute top-1/4 left-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        data-depth="0.25"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,30 C50,30 45,20 50,15 C55,20 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
          />
          <path
            d="M50,30 C50,30 60,25 65,30 C60,35 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.2s" }}
          />
          <path
            d="M50,30 C50,30 55,40 50,45 C45,40 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d="M50,30 C50,30 40,25 35,30 C40,35 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.6s" }}
          />
          <path d="M50,45 V70" stroke="#e8c4c4" strokeWidth="1.2" className="rose-stem" />
          <path />
          <path d="M50,45 V70" stroke="#e8c4c4" strokeWidth="1.2" className="rose-stem" />
          <path
            d="M45,55 H55"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-stem"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>
      </div>

      <div
        className="decor-element absolute top-1/4 right-1/4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        data-depth="0.25"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,30 C50,30 45,20 50,15 C55,20 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
          />
          <path
            d="M50,30 C50,30 60,25 65,30 C60,35 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.2s" }}
          />
          <path
            d="M50,30 C50,30 55,40 50,45 C45,40 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d="M50,30 C50,30 40,25 35,30 C40,35 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="1.2"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="rose-petal"
            style={{ animationDelay: "0.6s" }}
          />
          <path d="M50,45 V70" stroke="#e8c4c4" strokeWidth="1.2" className="rose-stem" />
          <path
            d="M45,55 H55"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-stem"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>
      </div>

      {/* Sparkle decorations */}
      <div
        className="decor-element absolute bottom-1/4 left-1/4 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
        data-depth="0.3"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,20 L55,40 L75,45 L55,50 L50,70 L45,50 L25,45 L45,40 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.1" : "0.15"}
            className="animate-draw-svg"
          />
          <circle
            cx="50"
            cy="45"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      <div
        className="decor-element absolute bottom-1/4 right-1/4 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
        data-depth="0.3"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,20 L55,40 L75,45 L55,50 L50,70 L45,50 L25,45 L45,40 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.1" : "0.15"}
            className="animate-draw-svg"
          />
          <circle
            cx="50"
            cy="45"
            r="3"
            fill="#edc3bf"
            fillOpacity={width < 640 ? "0.4" : "0.6"}
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      {/* Additional side decorations for tablet and mobile */}
      <div
        className="decor-element absolute top-2/3 left-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="#e8c4c4" strokeWidth="1.5" fill="none" className="animate-draw-svg" />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            stroke="#e8c4c4"
            strokeWidth="0.5"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M20,50 H40"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "0.9s" }}
          />
          <path
            d="M60,50 H80"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.2s" }}
          />
          <path
            d="M50,20 V40"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.5s" }}
          />
          <path
            d="M50,60 V80"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.8s" }}
          />
        </svg>
      </div>

      <div
        className="decor-element absolute top-2/3 right-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        data-depth="0.2"
        style={{ opacity: width < 640 ? 0.6 : 0.9 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="#e8c4c4" strokeWidth="1.5" fill="none" className="animate-draw-svg" />
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="#e8c4c4"
            strokeWidth="1"
            fill="none"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            stroke="#e8c4c4"
            strokeWidth="0.5"
            fill="#e8c4c4"
            fillOpacity={width < 640 ? "0.15" : "0.2"}
            className="animate-draw-svg"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M20,50 H40"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "0.9s" }}
          />
          <path
            d="M60,50 H80"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.2s" }}
          />
          <path
            d="M50,20 V40"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.5s" }}
          />
          <path
            d="M50,60 V80"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-draw-svg"
            style={{ animationDelay: "1.8s" }}
          />
        </svg>
      </div>
    </div>
  )
}
