"use client"

import { useRef, useEffect, memo } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"

// Memoized Rose component for better performance
const Rose = memo(function Rose({
  position,
  size,
  color = "#e8c4c4",
  rotation = 0,
  delay = 0,
}: {
  position: string
  size: string
  color?: string
  rotation?: number
  delay?: number
}) {
  const roseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!roseRef.current) return

    // Set initial rotation
    gsap.set(roseRef.current, {
      rotation: rotation,
      scale: 0,
      opacity: 0,
    })

    // Animate in
    gsap.to(roseRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      delay: delay,
      ease: "elastic.out(1, 0.5)",
    })

    // Create subtle animation
    gsap.to(roseRef.current, {
      rotation: rotation + (Math.random() * 10 - 5),
      y: Math.random() * 10 - 5,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animate SVG paths
    const paths = roseRef.current.querySelectorAll("path")
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: color,
        fillOpacity: 0,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay + 0.2,
        ease: "power2.inOut",
      })

      gsap.to(path, {
        fillOpacity: 0.2,
        duration: 1,
        delay: delay + 1,
        ease: "power2.inOut",
      })
    })
  }, [rotation, delay, color])

  return (
    <div ref={roseRef} className={`absolute ${position} ${size} rose-element`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="rose-petal"
          d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 60 40 50 50C40 40 50 30 50 30Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="rose-petal"
          d="M50 30C50 30 40 20 30 30C40 40 50 30 50 30Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="rose-stem"
          d="M50 50V80"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="rose-leaf"
          d="M40 60H60"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
})

// Memoized Flower component
const Flower = memo(function Flower({
  position,
  size,
  color = "#edc3bf",
  rotation = 0,
  delay = 0,
}: {
  position: string
  size: string
  color?: string
  rotation?: number
  delay?: number
}) {
  const flowerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flowerRef.current) return

    // Set initial rotation
    gsap.set(flowerRef.current, {
      rotation: rotation,
      scale: 0,
      opacity: 0,
    })

    // Animate in
    gsap.to(flowerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      delay: delay,
      ease: "elastic.out(1, 0.5)",
    })

    // Create subtle animation
    gsap.to(flowerRef.current, {
      rotation: rotation + (Math.random() * 10 - 5),
      y: Math.random() * 10 - 5,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animate SVG paths
    const paths = flowerRef.current.querySelectorAll("path")
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength ? (path as SVGPathElement).getTotalLength() : 100

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: color,
        fillOpacity: 0,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay + 0.2,
        ease: "power2.inOut",
      })

      gsap.to(path, {
        fillOpacity: 0.2,
        duration: 1,
        delay: delay + 1,
        ease: "power2.inOut",
      })
    })

    // Animate circle
    const circle = flowerRef.current.querySelector("circle")
    if (circle) {
      gsap.set(circle, {
        opacity: 0,
        scale: 0,
      })

      gsap.to(circle, {
        opacity: 0.8,
        scale: 1,
        duration: 0.5,
        delay: delay + 1.2,
        ease: "back.out(1.7)",
      })
    }
  }, [rotation, delay, color])

  return (
    <div ref={flowerRef} className={`absolute ${position} ${size} flower-element`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="flower-petal"
          d="M50 20C50 20 60 35 75 35C75 35 60 45 60 60C60 60 45 50 30 60C30 60 40 45 25 35C25 35 40 35 50 20Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="40" r="5" fill={color} />
      </svg>
    </div>
  )
})

// Memoized StemWithFlowers component
const StemWithFlowers = memo(function StemWithFlowers({
  position,
  size,
  stemColor = "#d4b08c",
  flowerColor = "#e8c4c4",
  rotation = 0,
  delay = 0,
}: {
  position: string
  size: string
  stemColor?: string
  flowerColor?: string
  rotation?: number
  delay?: number
}) {
  const stemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stemRef.current) return

    // Set initial rotation
    gsap.set(stemRef.current, {
      rotation: rotation,
      scale: 0,
      opacity: 0,
    })

    // Animate in
    gsap.to(stemRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      delay: delay,
      ease: "elastic.out(1, 0.5)",
    })

    // Create subtle animation
    gsap.to(stemRef.current, {
      rotation: rotation + (Math.random() * 6 - 3),
      y: Math.random() * 5 - 2.5,
      duration: 4 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animate SVG paths - stem first
    const stem = stemRef.current.querySelector(".stem")
    if (stem) {
      const length = (stem as SVGPathElement).getTotalLength ? (stem as SVGPathElement).getTotalLength() : 100

      gsap.set(stem, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(stem, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay,
        ease: "power2.inOut",
      })
    }

    // Then animate leaves
    const leaves = stemRef.current.querySelectorAll(".leaf")
    leaves.forEach((leaf, index) => {
      const length = (leaf as SVGPathElement).getTotalLength ? (leaf as SVGPathElement).getTotalLength() : 100

      gsap.set(leaf, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(leaf, {
        strokeDashoffset: 0,
        duration: 1,
        delay: delay + 0.8 + index * 0.2,
        ease: "power2.inOut",
      })
    })

    // Finally animate flowers
    const flowers = stemRef.current.querySelectorAll(".flower")
    flowers.forEach((flower, index) => {
      const length = (flower as SVGPathElement).getTotalLength ? (flower as SVGPathElement).getTotalLength() : 100

      gsap.set(flower, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: flowerColor,
        fillOpacity: 0,
      })

      gsap.to(flower, {
        strokeDashoffset: 0,
        duration: 1,
        delay: delay + 1.5 + index * 0.3,
        ease: "power2.inOut",
      })

      gsap.to(flower, {
        fillOpacity: 0.2,
        duration: 0.8,
        delay: delay + 2 + index * 0.3,
        ease: "power2.inOut",
      })
    })
  }, [rotation, delay, stemColor, flowerColor])

  return (
    <div ref={stemRef} className={`absolute ${position} ${size} stem-element`}>
      <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="stem" d="M50 30V180" stroke={stemColor} strokeWidth="1.5" strokeLinecap="round" />
        <path
          className="leaf"
          d="M50 60C50 60 30 50 20 60C30 70 50 60 50 60Z"
          stroke={stemColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="leaf"
          d="M50 100C50 100 70 90 80 100C70 110 50 100 50 100Z"
          stroke={stemColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="leaf"
          d="M50 140C50 140 30 130 20 140C30 150 50 140 50 140Z"
          stroke={stemColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="flower"
          d="M50 30C50 30 40 20 50 10C60 20 50 30 50 30Z"
          stroke={flowerColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="flower"
          d="M50 30C50 30 60 20 70 30C60 40 50 30 50 30Z"
          stroke={flowerColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="flower"
          d="M50 30C50 30 60 40 50 50C40 40 50 30 50 30Z"
          stroke={flowerColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="flower"
          d="M50 30C50 30 40 20 30 30C40 40 50 30 50 30Z"
          stroke={flowerColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
})

// Memoized OrnamentalLine component
const OrnamentalLine = memo(function OrnamentalLine({
  position,
  width,
  color = "#d4af37",
  delay = 0,
}: {
  position: string
  width: string
  color?: string
  delay?: number
}) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lineRef.current) return

    // Set initial state
    gsap.set(lineRef.current, {
      scaleX: 0,
      opacity: 0,
    })

    // Animate in
    gsap.to(lineRef.current, {
      scaleX: 1,
      opacity: 1,
      duration: 1.5,
      delay: delay,
      ease: "power3.out",
    })

    // Animate dots
    const dots = lineRef.current.querySelectorAll("circle")
    dots.forEach((dot, index) => {
      gsap.set(dot, {
        scale: 0,
        opacity: 0,
      })

      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: delay + 1 + index * 0.2,
        ease: "back.out(1.7)",
      })
    })
  }, [delay])

  return (
    <div ref={lineRef} className={`absolute ${position} ${width} h-4 ornamental-line`}>
      <svg viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5H200" stroke={color} strokeWidth="1" strokeDasharray="1 3" />
        <circle cx="0" cy="5" r="2" fill={color} />
        <circle cx="50" cy="5" r="2" fill={color} />
        <circle cx="100" cy="5" r="2" fill={color} />
        <circle cx="150" cy="5" r="2" fill={color} />
        <circle cx="200" cy="5" r="2" fill={color} />
      </svg>
    </div>
  )
})

// Main component that combines all floral decorations
export default function FloralDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-40"
      >
        <Rose position="top-10 left-10" size="w-32 h-32" color="#e8c4c4" rotation={-15} delay={0.2} />
        <Flower position="top-5 right-20" size="w-24 h-24" color="#edc3bf" rotation={10} delay={0.5} />
        <OrnamentalLine
          position="top-20 left-1/2 transform -translate-x-1/2"
          width="w-64"
          color="#d4af37"
          delay={0.8}
        />
      </motion.div>

      {/* Left side decorations */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute left-0 top-1/4 bottom-1/4 w-40"
      >
        <StemWithFlowers
          position="top-0 left-5"
          size="w-20 h-80"
          stemColor="#d4b08c"
          flowerColor="#e8c4c4"
          rotation={5}
          delay={0.4}
        />
        <Rose position="bottom-20 left-20" size="w-24 h-24" color="#edc3bf" rotation={-10} delay={0.7} />
      </motion.div>

      {/* Right side decorations */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-0 top-1/4 bottom-1/4 w-40"
      >
        <Flower position="top-10 right-10" size="w-28 h-28" color="#e8c4c4" rotation={-5} delay={0.6} />
        <StemWithFlowers
          position="bottom-0 right-5"
          size="w-20 h-80"
          stemColor="#d4b08c"
          flowerColor="#edc3bf"
          rotation={-5}
          delay={0.8}
        />
      </motion.div>

      {/* Bottom decorations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-full h-40"
      >
        <Rose position="bottom-10 left-1/4" size="w-24 h-24" color="#e8c4c4" rotation={10} delay={1} />
        <Flower position="bottom-15 right-1/4" size="w-20 h-20" color="#edc3bf" rotation={-10} delay={1.2} />
        <OrnamentalLine
          position="bottom-10 left-1/2 transform -translate-x-1/2"
          width="w-64"
          color="#d4af37"
          delay={1.4}
        />
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => {
          const size = 10 + Math.random() * 10
          const delay = Math.random() * 2
          const duration = 15 + Math.random() * 10
          const startX = Math.random() * 100
          const startY = -size

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${startX}%`,
                top: startY,
                width: size,
                height: size,
              }}
              animate={{
                y: ["0vh", "100vh"],
                x: [`${startX}%`, `${startX + (Math.random() * 20 - 10)}%`, `${startX + (Math.random() * 40 - 20)}%`],
                rotate: [0, 360],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                times: [0, 0.1, 1],
              }}
            >
              <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 1C5 1 7 3 7 5C7 7 5 9 3 7C1 5 3 3 5 1Z"
                  fill={["#e8c4c4", "#edc3bf", "#d4b08c"][i % 3]}
                  fillOpacity="0.6"
                />
              </svg>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
