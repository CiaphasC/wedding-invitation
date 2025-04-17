"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface HeartAnimationProps {
  className?: string
}

export default function HeartAnimation({ className = "" }: HeartAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const heart = svg.querySelector("#heart")
    const particles = svg.querySelectorAll(".heart-particle")
    const sparkles = svg.querySelectorAll(".sparkle")
    const pulses = svg.querySelectorAll(".pulse-circle")

    // Reset initial state
    gsap.set(heart, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    })

    gsap.set(particles, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    })

    gsap.set(sparkles, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    })

    gsap.set(pulses, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    })

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.5 })

    // Animate heart
    tl.to(heart, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    })

    // Animate particles
    tl.to(
      particles,
      {
        scale: 1,
        opacity: 0.7,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.4",
    )

    // Animate sparkles
    tl.to(
      sparkles,
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.3",
    )

    // Animate pulse circles
    tl.to(
      pulses,
      {
        scale: 1,
        opacity: 0.3,
        duration: 0.5,
        stagger: 0.2,
        ease: "power1.out",
      },
      "-=0.5",
    )

    // Create continuous animations
    gsap.to(sparkles, {
      scale: 1.5,
      opacity: 0.7,
      duration: 1.5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Pulse animation for the heart
    gsap.to(heart, {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Pulse circles animation
    pulses.forEach((pulse) => {
      gsap.to(pulse, {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
        delay: Math.random() * 2,
      })
    })

    return () => {
      // Cleanup animations
      gsap.killTweensOf([heart, particles, sparkles, pulses])
    }
  }, [])

  return (
    <div className={`w-full max-w-[180px] mx-auto ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Pulse circles */}
        <circle cx="100" cy="90" r="40" className="pulse-circle" fill="#edc3bf" fillOpacity="0.2" />
        <circle cx="100" cy="90" r="30" className="pulse-circle" fill="#edc3bf" fillOpacity="0.3" />

        {/* Heart */}
        <path
          id="heart"
          d="M100 150C100 150 160 120 160 70C160 50 145 35 125 35C115 35 105 45 100 55C95 45 85 35 75 35C55 35 40 50 40 70C40 120 100 150 100 150Z"
          fill="#edc3bf"
          stroke="#d4af37"
          strokeWidth="2"
        />

        {/* Heart particles */}
        <circle cx="70" cy="60" r="5" className="heart-particle" fill="#d4af37" />
        <circle cx="130" cy="60" r="5" className="heart-particle" fill="#d4af37" />
        <circle cx="100" cy="120" r="5" className="heart-particle" fill="#d4af37" />

        {/* Sparkles */}
        <path
          d="M60 30L63 40L73 43L63 46L60 56L57 46L47 43L57 40L60 30Z"
          className="sparkle"
          fill="#d4af37"
          fillOpacity="0.6"
        />
        <path
          d="M140 30L143 40L153 43L143 46L140 56L137 46L127 43L137 40L140 30Z"
          className="sparkle"
          fill="#d4af37"
          fillOpacity="0.6"
        />
        <path
          d="M100 160L103 170L113 173L103 176L100 186L97 176L87 173L97 170L100 160Z"
          className="sparkle"
          fill="#d4af37"
          fillOpacity="0.6"
        />

        {/* Small decorative elements */}
        <circle cx="85" cy="70" r="2" fill="#ffffff" />
        <circle cx="115" cy="70" r="2" fill="#ffffff" />
      </svg>
    </div>
  )
}
