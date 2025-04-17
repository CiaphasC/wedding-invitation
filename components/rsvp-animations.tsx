"use client"

import { useRef, memo } from "react"
import { motion } from "framer-motion"

// This component contains SVG animations exclusively for the RSVP view
// Using Framer Motion instead of GSAP to avoid plugin dependencies
const RsvpAnimations = memo(function RsvpAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Decorative Frame */}
      <motion.div
        className="absolute inset-0 opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      >
        <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.rect
            x="50"
            y="50"
            width="900"
            height="900"
            rx="20"
            stroke="#e8c4c4"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.rect
            x="70"
            y="70"
            width="860"
            height="860"
            rx="15"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M50,200 Q500,150 950,200"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M50,800 Q500,850 950,800"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
          />
          <motion.path
            d="M200,50 Q150,500 200,950"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }}
          />
          <motion.path
            d="M800,50 Q850,500 800,950"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
          />

          {/* Corner Ornaments */}
          <motion.path
            d="M100,100 C120,80 150,80 170,100 C150,120 120,120 100,100 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.8 }}
          />
          <motion.path
            d="M900,100 C880,80 850,80 830,100 C850,120 880,120 900,100 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 2.0 }}
          />
          <motion.path
            d="M100,900 C120,920 150,920 170,900 C150,880 120,880 100,900 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
          />
          <motion.path
            d="M900,900 C880,920 850,920 830,900 C850,880 880,880 900,900 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 2.4 }}
          />
        </svg>
      </motion.div>

      {/* Floral Elements */}
      <motion.div
        className="absolute top-10 left-10 w-60 h-60 opacity-0"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rose */}
          <motion.path
            d="M100,80 C100,80 80,60 100,40 C120,60 100,80 100,80 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,80 C100,80 120,60 140,80 C120,100 100,80 100,80 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M100,80 C100,80 120,100 100,120 C80,100 100,80 100,80 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M100,80 C100,80 80,60 60,80 C80,100 100,80 100,80 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Stem and Leaves */}
          <motion.path
            d="M100,120 L100,180"
            stroke="#d4b08c"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.path
            d="M100,140 C100,140 80,130 70,140 C80,150 100,140 100,140 Z"
            stroke="#d4b08c"
            strokeWidth="1.5"
            fill="#d4b08c"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M100,160 C100,160 120,150 130,160 C120,170 100,160 100,160 Z"
            stroke="#d4b08c"
            strokeWidth="1.5"
            fill="#d4b08c"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-10 right-10 w-60 h-60 opacity-0"
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flower */}
          <motion.path
            d="M100,60 C100,60 120,40 140,60 C120,80 100,60 100,60 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,60 C100,60 80,40 60,60 C80,80 100,60 100,60 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M100,60 C100,60 120,80 140,100 C120,120 100,60 100,60 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M100,60 C100,60 80,80 60,100 C80,120 100,60 100,60 Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="#edc3bf"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.circle
            cx="100"
            cy="60"
            r="10"
            fill="#edc3bf"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          />

          {/* Stem and Leaves */}
          <motion.path
            d="M100,120 C100,120 100,150 100,180"
            stroke="#d4b08c"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M100,150 C100,150 120,140 130,150 C120,160 100,150 100,150 Z"
            stroke="#d4b08c"
            strokeWidth="1.5"
            fill="#d4b08c"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10 w-60 h-60 opacity-0"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fancy Flower */}
          <motion.path
            d="M100,100 C100,100 80,80 60,60 C40,40 60,20 80,40 C100,60 100,100 100,100 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M100,100 C100,100 120,80 140,60 C160,40 180,20 160,40 C140,60 100,100 100,100 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M100,100 C100,100 120,120 140,140 C160,160 140,180 120,160 C100,140 100,100 100,100 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M100,100 C100,100 80,120 60,140 C40,160 20,180 40,160 C60,140 100,100 100,100 Z"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="15"
            fill="#e8c4c4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 opacity-0"
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.4 }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ornamental Design */}
          <motion.path
            d="M20,100 C20,100 60,60 100,60 C140,60 180,100 180,100"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M20,120 C20,120 60,160 100,160 C140,160 180,120 180,120"
            stroke="#d4af37"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M60,60 C60,60 80,40 100,60 C120,80 100,100 80,80 C60,60 60,60 60,60 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="#d4af37"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M140,60 C140,60 160,40 180,60 C200,80 180,100 160,80 C140,60 140,60 140,60 Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="#d4af37"
            initial={{ fillOpacity: 0, strokeDashoffset: 100, strokeDasharray: 100 }}
            animate={{ fillOpacity: 0.3, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
          />
        </svg>
      </motion.div>

      {/* Wedding Rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1.5, ease: "easeOut" },
          rotate: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            cx="80"
            cy="100"
            r="30"
            stroke="#d4af37"
            strokeWidth="2"
            initial={{ x: -20, rotate: -30, strokeDashoffset: 200, strokeDasharray: 200 }}
            animate={{ x: 0, rotate: 0, strokeDashoffset: 0 }}
            transition={{
              x: { duration: 1.5, ease: "easeOut", delay: 0.5 },
              rotate: { duration: 1.5, ease: "easeOut", delay: 0.5 },
              strokeDashoffset: { duration: 2, ease: "easeInOut" },
            }}
          />
          <motion.circle
            cx="120"
            cy="100"
            r="30"
            stroke="#d4af37"
            strokeWidth="2"
            initial={{ x: 20, rotate: 30, strokeDashoffset: 200, strokeDasharray: 200 }}
            animate={{ x: 0, rotate: 0, strokeDashoffset: 0 }}
            transition={{
              x: { duration: 1.5, ease: "easeOut", delay: 0.5 },
              rotate: { duration: 1.5, ease: "easeOut", delay: 0.5 },
              strokeDashoffset: { duration: 2, ease: "easeInOut" },
            }}
          />
        </svg>
      </motion.div>

      {/* Hearts */}
      <motion.div
        className="absolute top-20 left-1/3 w-20 h-20 opacity-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2 }}
        style={{
          animation: "heartbeat 2s infinite ease-in-out",
          animationDelay: "3s",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M50,30 C50,30 20,10 20,40 C20,70 50,90 50,90 C50,90 80,70 80,40 C80,10 50,30 50,30 Z"
            stroke="#e8c4c4"
            strokeWidth="2"
            fill="#e8c4c4"
            initial={{ fillOpacity: 0, strokeDashoffset: 300, strokeDasharray: 300 }}
            animate={{ fillOpacity: 0.6, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 right-1/3 w-16 h-16 opacity-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 2.2 }}
        style={{
          animation: "heartbeat 2s infinite ease-in-out",
          animationDelay: "3.5s",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M50,30 C50,30 20,10 20,40 C20,70 50,90 50,90 C50,90 80,70 80,40 C80,10 50,30 50,30 Z"
            stroke="#edc3bf"
            strokeWidth="2"
            fill="#edc3bf"
            initial={{ fillOpacity: 0, strokeDashoffset: 300, strokeDasharray: 300 }}
            animate={{ fillOpacity: 0.6, strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Butterflies */}
      <motion.div
        className="absolute top-1/4 left-20 w-24 h-24 opacity-0"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{
          opacity: 0.8,
          x: [0, 100, 200, 300, 200, 100, 0],
          y: [0, -50, -20, -70, -20, -50, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 2.5 },
          x: { duration: 20, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
          y: { duration: 20, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.path
              d="M50,50 C50,50 30,30 10,40 C10,60 30,70 50,50 Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 70,30 90,40 C90,60 70,70 50,50 Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 30,70 10,80 C10,60 30,50 50,50 Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 70,70 90,80 C90,60 70,50 50,50 Z"
              stroke="#edc3bf"
              strokeWidth="1.5"
              fill="#edc3bf"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <path d="M46,50 L54,50" stroke="#edc3bf" strokeWidth="2" />
            <circle cx="46" cy="50" r="2" fill="#edc3bf" />
            <circle cx="54" cy="50" r="2" fill="#edc3bf" />
          </motion.g>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-20 w-24 h-24 opacity-0"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{
          opacity: 0.8,
          x: [0, -100, -200, -300, -200, -100, 0],
          y: [0, 50, 20, 70, 20, 50, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 2.8 },
          x: { duration: 25, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
          y: { duration: 25, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.g
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.path
              d="M50,50 C50,50 30,30 10,40 C10,60 30,70 50,50 Z"
              stroke="#e8c4c4"
              strokeWidth="1.5"
              fill="#e8c4c4"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 70,30 90,40 C90,60 70,70 50,50 Z"
              stroke="#e8c4c4"
              strokeWidth="1.5"
              fill="#e8c4c4"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 30,70 10,80 C10,60 30,50 50,50 Z"
              stroke="#e8c4c4"
              strokeWidth="1.5"
              fill="#e8c4c4"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M50,50 C50,50 70,70 90,80 C90,60 70,50 50,50 Z"
              stroke="#e8c4c4"
              strokeWidth="1.5"
              fill="#e8c4c4"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.4 }}
              transition={{ duration: 1 }}
            />
            <path d="M46,50 L54,50" stroke="#e8c4c4" strokeWidth="2" />
            <circle cx="46" cy="50" r="2" fill="#e8c4c4" />
            <circle cx="54" cy="50" r="2" fill="#e8c4c4" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Particle Effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#e8c4c4]"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -100],
            x: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
})

export default RsvpAnimations
