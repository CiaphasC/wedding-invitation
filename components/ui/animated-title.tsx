"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface AnimatedTitleProps {
  text: string
  className?: string
  textColor?: string
  highlightColor?: string
  size?: "sm" | "md" | "lg" | "xl"
  withUnderline?: boolean
  withGlow?: boolean
  withShimmer?: boolean
  delay?: number
}

export default function AnimatedTitle({
  text,
  className = "",
  textColor = "text-secondary",
  highlightColor = "#edc3bf",
  size = "lg",
  withUnderline = true,
  withGlow = true,
  withShimmer = true,
  delay = 0,
}: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])

  // Determine text size class based on size prop
  const sizeClass = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-7xl",
  }[size]

  useEffect(() => {
    if (!titleRef.current) return

    // Split text into individual letters for animation
    const letters = titleRef.current.querySelectorAll(".letter")
    lettersRef.current = Array.from(letters) as HTMLSpanElement[]

    // Create animation timeline
    const tl = gsap.timeline({ delay })

    // Animate each letter
    tl.fromTo(
      lettersRef.current,
      {
        y: -40,
        opacity: 0,
        rotationX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
    )

    // Animate underline if present
    if (underlineRef.current) {
      tl.fromTo(
        underlineRef.current,
        {
          width: "0%",
          opacity: 0,
        },
        {
          width: "100%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    // Add continuous animations
    if (withGlow) {
      gsap.to(titleRef.current, {
        textShadow: `0 0 10px ${highlightColor}40, 0 0 20px ${highlightColor}20`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    return () => {
      gsap.killTweensOf(lettersRef.current)
      gsap.killTweensOf(underlineRef.current)
      gsap.killTweensOf(titleRef.current)
    }
  }, [delay, highlightColor, withGlow])

  // Split text into spans for letter animation
  const renderLetters = () => {
    return text.split("").map((letter, index) => (
      <span key={index} className={`letter inline-block transform-gpu ${letter === " " ? "mr-2" : ""}`}>
        {letter}
      </span>
    ))
  }

  return (
    <h2
      ref={titleRef}
      className={`font-['Cormorant_Garamond'] ${sizeClass} ${textColor} font-semibold relative transform-gpu perspective-1000 ${className} ${withShimmer ? "animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-current via-current to-current bg-size-200" : ""}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <span className="relative inline-block px-4 py-2">
        {renderLetters()}

        {withUnderline && (
          <span
            ref={underlineRef}
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#edc3bf] to-transparent"
          ></span>
        )}
      </span>
    </h2>
  )
}
