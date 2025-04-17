"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface OrnamentalElementsProps {
  className?: string
}

export default function OrnamentalElements({ className = "" }: OrnamentalElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<SVGElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize SVG animations
    const paths = containerRef.current.querySelectorAll("path")
    const circles = containerRef.current.querySelectorAll("circle")

    // Set initial state for paths
    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      })
    })

    // Set initial state for circles
    gsap.set(circles, {
      scale: 0,
      opacity: 0,
    })

    // Animate paths with drawing effect
    gsap.to(paths, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.05,
      ease: "power2.inOut",
    })

    // Animate circles
    gsap.to(circles, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      delay: 1,
      ease: "back.out(1.7)",
    })

    // Get all ornamental elements for floating animation
    const ornamentalElements = containerRef.current.querySelectorAll(".ornamental-element")

    // Create floating animations for each element
    ornamentalElements.forEach((element, index) => {
      // Random values for more natural movement
      const randomX = Math.random() * 20 - 10
      const randomY = Math.random() * 20 - 10
      const randomRotation = Math.random() * 10 - 5
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

    // Create parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2 // -1 to 1

      ornamentalElements.forEach((element, index) => {
        const depth = 0.05 + (index % 5) * 0.02

        gsap.to(element, {
          x: x * 30 * depth,
          y: y * 20 * depth,
          rotation: x * 5 * depth,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        })
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Fine ornamental lines */}
      <svg
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-10 ornamental-element"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 10H190" stroke="#edc3bf" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
        <circle cx="10" cy="10" r="2" fill="#edc3bf" />
        <circle cx="100" cy="10" r="2" fill="#edc3bf" />
        <circle cx="190" cy="10" r="2" fill="#edc3bf" />
        <path d="M40 5C40 5 50 10 60 10C70 10 80 5 80 5" stroke="#edc3bf" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M40 15C40 15 50 10 60 10C70 10 80 15 80 15" stroke="#edc3bf" strokeWidth="0.8" strokeLinecap="round" />
        <path
          d="M120 5C120 5 130 10 140 10C150 10 160 5 160 5"
          stroke="#edc3bf"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M120 15C120 15 130 10 140 10C150 10 160 15 160 15"
          stroke="#edc3bf"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-10 ornamental-element"
        viewBox="0 0 200 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 10H190" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
        <circle cx="10" cy="10" r="2" fill="#d4af37" />
        <circle cx="100" cy="10" r="2" fill="#d4af37" />
        <circle cx="190" cy="10" r="2" fill="#d4af37" />
        <path d="M40 5C40 5 50 10 60 10C70 10 80 5 80 5" stroke="#d4af37" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M40 15C40 15 50 10 60 10C70 10 80 15 80 15" stroke="#d4af37" strokeWidth="0.8" strokeLinecap="round" />
        <path
          d="M120 5C120 5 130 10 140 10C150 10 160 5 160 5"
          stroke="#d4af37"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M120 15C120 15 130 10 140 10C150 10 160 15 160 15"
          stroke="#d4af37"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Ornamental roses */}
      <svg
        className="absolute top-20 left-20 w-24 h-24 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 40 40 50 50C60 40 50 30 50 30Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 60 40 70 30C60 20 50 30 50 30Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <path d="M50 50V80" stroke="#5e6e64" strokeWidth="1.5" />
        <path
          d="M50 65C50 65 40 60 35 65C40 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.1"
        />
        <path
          d="M50 65C50 65 60 60 65 65C60 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.1"
        />
      </svg>

      <svg
        className="absolute bottom-20 right-20 w-24 h-24 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 40 40 50 50C60 40 50 30 50 30Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <path
          d="M50 30C50 30 60 40 70 30C60 20 50 30 50 30Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <path d="M50 50V80" stroke="#5e6e64" strokeWidth="1.5" />
        <path
          d="M50 65C50 65 40 60 35 65C40 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.1"
        />
        <path
          d="M50 65C50 65 60 60 65 65C60 70 50 65 50 65Z"
          stroke="#5e6e64"
          strokeWidth="1"
          fill="#5e6e64"
          fillOpacity="0.1"
        />
      </svg>

      {/* Ornamental flowers */}
      <svg
        className="absolute top-40 right-20 w-20 h-20 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <circle cx="50" cy="40" r="3" fill="#edc3bf" />
      </svg>

      <svg
        className="absolute bottom-40 left-20 w-20 h-20 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <circle cx="50" cy="40" r="3" fill="#d4af37" />
      </svg>

      {/* Sparkles and glitters */}
      <svg
        className="absolute top-1/4 left-1/3 w-12 h-12 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20L53 40L73 43L53 46L50 66L47 46L27 43L47 40L50 20Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <circle cx="50" cy="43" r="3" fill="#d4af37" />
      </svg>

      <svg
        className="absolute top-2/3 right-1/3 w-12 h-12 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20L53 40L73 43L53 46L50 66L47 46L27 43L47 40L50 20Z"
          stroke="#edc3bf"
          strokeWidth="1.5"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <circle cx="50" cy="43" r="3" fill="#edc3bf" />
      </svg>

      {/* Ornamental swirls */}
      <svg
        className="absolute top-1/2 left-10 w-16 h-16 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#edc3bf" strokeWidth="1.5" fill="none" />
        <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#edc3bf" strokeWidth="1.5" fill="none" />
        <path
          d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
          stroke="#edc3bf"
          strokeWidth="1"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <path
          d="M50 80C50 80 40 70 50 60C60 70 50 80 50 80Z"
          stroke="#edc3bf"
          strokeWidth="1"
          fill="#edc3bf"
          fillOpacity="0.1"
        />
        <circle cx="20" cy="50" r="2" fill="#edc3bf" />
        <circle cx="80" cy="50" r="2" fill="#edc3bf" />
      </svg>

      <svg
        className="absolute top-1/2 right-10 w-16 h-16 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 50C20 50 30 20 50 20C70 20 80 50 80 50" stroke="#d4af37" strokeWidth="1.5" fill="none" />
        <path d="M20 50C20 50 30 80 50 80C70 80 80 50 80 50" stroke="#d4af37" strokeWidth="1.5" fill="none" />
        <path
          d="M50 20C50 20 40 30 50 40C60 30 50 20 50 20Z"
          stroke="#d4af37"
          strokeWidth="1"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <path
          d="M50 80C50 80 40 70 50 60C60 70 50 80 50 80Z"
          stroke="#d4af37"
          strokeWidth="1"
          fill="#d4af37"
          fillOpacity="0.1"
        />
        <circle cx="20" cy="50" r="2" fill="#d4af37" />
        <circle cx="80" cy="50" r="2" fill="#d4af37" />
      </svg>

      {/* Central ornamental element */}
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 ornamental-element"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="40" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="30" stroke="#d4af37" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" stroke="#edc3bf" strokeWidth="0.5" strokeDasharray="1 2" />
        <path d="M50 10V90" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
        <path d="M10 50H90" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
        <path d="M22 22L78 78" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
        <path d="M78 22L22 78" stroke="#edc3bf" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 3" />
      </svg>
    </div>
  )
}
