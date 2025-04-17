"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function WeddingRingsAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const leftRing = svg.querySelector("#leftRing")
    const rightRing = svg.querySelector("#rightRing")
    const sparkles = svg.querySelectorAll(".sparkle")
    const diamonds = svg.querySelectorAll(".diamond")
    const ornaments = svg.querySelectorAll(".ornament")
    const engravings = svg.querySelectorAll(".engraving")
    const hearts = svg.querySelectorAll(".heart")
    const glows = svg.querySelectorAll(".glow")

    // Reset initial state
    gsap.set([leftRing, rightRing], {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "center center",
    })

    gsap.set(sparkles, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    })

    gsap.set(diamonds, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    })

    gsap.set(ornaments, {
      opacity: 0,
      drawSVG: "0%",
      transformOrigin: "center center",
    })

    gsap.set(engravings, {
      opacity: 0,
      drawSVG: "0%",
    })

    gsap.set(hearts, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    })

    gsap.set(glows, {
      opacity: 0,
    })

    // Create animation timeline
    const tl = gsap.timeline()

    // Animate rings
    tl.to(leftRing, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
    }).to(
      rightRing,
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      "-=0.7",
    )

    // Animate ornaments
    tl.to(
      ornaments,
      {
        opacity: 1,
        drawSVG: "100%",
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      "-=0.8",
    )

    // Animate engravings
    tl.to(
      engravings,
      {
        opacity: 1,
        drawSVG: "100%",
        duration: 1,
        stagger: 0.05,
        ease: "power1.inOut",
      },
      "-=1",
    )

    // Animate diamonds
    tl.to(
      diamonds,
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.5",
    )

    // Animate sparkles
    tl.to(
      sparkles,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3",
    )

    // Animate hearts
    tl.to(
      hearts,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)",
      },
      "-=0.3",
    )

    // Animate glows
    tl.to(
      glows,
      {
        opacity: 0.7,
        duration: 1,
        stagger: 0.2,
      },
      "-=0.5",
    )

    // Create continuous animations
    gsap.to(sparkles, {
      scale: 1.5,
      opacity: (i) => 0.4 + (i % 3) * 0.2,
      duration: 1.5,
      stagger: {
        each: 0.2,
        from: "random",
      },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(diamonds, {
      scale: 1.2,
      opacity: (i) => 0.7 + (i % 2) * 0.3,
      duration: 2,
      stagger: {
        each: 0.3,
        from: "center",
      },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(hearts, {
      y: -5,
      rotation: (i) => (i % 2 === 0 ? 5 : -5),
      duration: 2,
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Subtle rotation of rings
    gsap.to(leftRing, {
      rotation: -3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(rightRing, {
      rotation: 3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Pulsating glow effect
    gsap.to(glows, {
      opacity: (i) => 0.3 + (i % 3) * 0.2,
      scale: 1.1,
      duration: 2,
      stagger: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    return () => {
      // Cleanup animations
      gsap.killTweensOf([leftRing, rightRing, sparkles, diamonds, ornaments, engravings, hearts, glows])
    }
  }, [])

  return (
    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto my-4 md:my-6 transform-gpu transition-all duration-700 hover:scale-105 group">
      <svg
        ref={svgRef}
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Background glows */}
        <radialGradient id="goldGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#f7e7a3" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f7e7a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="roseGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
          <stop offset="0%" stopColor="#ffd1d1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffd1d1" stopOpacity="0" />
        </radialGradient>

        <circle cx="95" cy="90" r="50" fill="url(#goldGlow)" className="glow" />
        <circle cx="145" cy="90" r="50" fill="url(#roseGlow)" className="glow" />

        {/* Interlocking rings - Rose Gold (Jessica) */}
        <g id="leftRing" transform="translate(10, 0)" className="group-hover:animate-pulse">
          {/* Main ring structure - Rose Gold */}
          <ellipse cx="95" cy="90" rx="38" ry="38" stroke="#edc3bf" strokeWidth="4" fill="none" />
          <ellipse cx="95" cy="90" rx="33" ry="33" stroke="#edc3bf" strokeWidth="1" fill="none" />

          {/* Inner ring details */}
          <path
            d="M95 57C95 57 85 67 95 77C105 67 95 57 95 57Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M95 123C95 123 85 113 95 103C105 113 95 123 95 123Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M62 90C62 90 72 80 82 90C72 100 62 90 62 90Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M128 90C128 90 118 80 108 90C118 100 128 90 128 90Z"
            stroke="#edc3bf"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />

          {/* Decorative patterns - Rose Gold */}
          <path
            d="M95 52C100 57 105 62 105 67C105 72 100 77 95 77C90 77 85 72 85 67C85 62 90 57 95 52Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="ornament"
          />
          <path
            d="M95 128C100 123 105 118 105 113C105 108 100 103 95 103C90 103 85 108 85 113C85 118 90 123 95 128Z"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            className="ornament"
          />

          {/* Diamonds and gemstones - Rose Gold */}
          <path
            d="M95 52L98 55L95 58L92 55L95 52Z"
            fill="#ffffff"
            stroke="#edc3bf"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M95 128L98 125L95 122L92 125L95 128Z"
            fill="#ffffff"
            stroke="#edc3bf"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M62 90L65 93L62 96L59 93L62 90Z"
            fill="#ffffff"
            stroke="#edc3bf"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M128 90L131 93L128 96L125 93L128 90Z"
            fill="#ffffff"
            stroke="#edc3bf"
            strokeWidth="0.5"
            className="diamond"
          />

          {/* Engravings - Rose Gold */}
          <path
            d="M80 75C80 75 85 70 90 75C95 80 100 75 100 75"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M80 105C80 105 85 110 90 105C95 100 100 105 100 105"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M80 85C80 85 85 80 90 85C95 90 100 85 100 85"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M80 95C80 95 85 100 90 95C95 90 100 95 100 95"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />

          {/* Floral pattern - Rose Gold */}
          <path
            d="M95 65C97 63 99 62 101 63C103 64 103 66 101 68C99 70 97 70 95 68C93 66 93 64 95 65Z"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M95 115C97 113 99 112 101 113C103 114 103 116 101 118C99 120 97 120 95 118C93 116 93 114 95 115Z"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M75 90C77 88 79 87 81 88C83 89 83 91 81 93C79 95 77 95 75 93C73 91 73 89 75 90Z"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M115 90C117 88 119 87 121 88C123 89 123 91 121 93C119 95 117 95 115 93C113 91 113 89 115 90Z"
            stroke="#edc3bf"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
        </g>

        {/* Interlocking rings - Gold (Pablo) */}
        <g id="rightRing" transform="translate(-10, 0)" className="group-hover:animate-pulse">
          {/* Main ring structure - Gold */}
          <ellipse cx="145" cy="90" rx="38" ry="38" stroke="#d4af37" strokeWidth="4" fill="none" />
          <ellipse cx="145" cy="90" rx="33" ry="33" stroke="#d4af37" strokeWidth="1" fill="none" />

          {/* Inner ring details */}
          <path
            d="M145 57C145 57 135 67 145 77C155 67 145 57 145 57Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M145 123C145 123 135 113 145 103C155 113 145 123 145 123Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M112 90C112 90 122 80 132 90C122 100 112 90 112 90Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />
          <path
            d="M178 90C178 90 168 80 158 90C168 100 178 90 178 90Z"
            stroke="#d4af37"
            strokeWidth="1.5"
            fill="none"
            className="ornament"
          />

          {/* Decorative patterns - Gold */}
          <path
            d="M145 52C150 57 155 62 155 67C155 72 150 77 145 77C140 77 135 72 135 67C135 62 140 57 145 52Z"
            stroke="#d4af37"
            strokeWidth="1"
            fill="none"
            className="ornament"
          />
          <path
            d="M145 128C150 123 155 118 155 113C155 108 150 103 145 103C140 103 135 108 135 113C135 118 140 123 145 128Z"
            stroke="#d4af37"
            strokeWidth="1"
            fill="none"
            className="ornament"
          />

          {/* Diamonds and gemstones - Gold */}
          <path
            d="M145 52L148 55L145 58L142 55L145 52Z"
            fill="#ffffff"
            stroke="#d4af37"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M145 128L148 125L145 122L142 125L145 128Z"
            fill="#ffffff"
            stroke="#d4af37"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M112 90L115 93L112 96L109 93L112 90Z"
            fill="#ffffff"
            stroke="#d4af37"
            strokeWidth="0.5"
            className="diamond"
          />
          <path
            d="M178 90L181 93L178 96L175 93L178 90Z"
            fill="#ffffff"
            stroke="#d4af37"
            strokeWidth="0.5"
            className="diamond"
          />

          {/* Engravings - Gold */}
          <path
            d="M130 75C130 75 135 70 140 75C145 80 150 75 150 75"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M130 105C130 105 135 110 140 105C145 100 150 105 150 105"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M130 85C130 85 135 80 140 85C145 90 150 85 150 85"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />
          <path
            d="M130 95C130 95 135 100 140 95C145 90 150 95 150 95"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="engraving"
          />

          {/* Floral pattern - Gold */}
          <path
            d="M145 65C147 63 149 62 151 63C153 64 153 66 151 68C149 70 147 70 145 68C143 66 143 64 145 65Z"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M145 115C147 113 149 112 151 113C153 114 153 116 151 118C149 120 147 120 145 118C143 116 143 114 145 115Z"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M125 90C127 88 129 87 131 88C133 89 133 91 131 93C129 95 127 95 125 93C123 91 123 89 125 90Z"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
          <path
            d="M165 90C167 88 169 87 171 88C173 89 173 91 171 93C169 95 167 95 165 93C163 91 163 89 165 90Z"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="none"
            className="ornament"
          />
        </g>

        {/* Connecting elements - Interlocking design */}
        <path
          d="M120 90C120 90 125 80 130 75C135 70 140 70 145 75C150 80 150 85 145 90C140 95 135 95 130 90C125 85 120 90 120 90Z"
          stroke="#d4b08c"
          strokeWidth="1.5"
          fill="none"
          className="ornament"
        />
        <path
          d="M120 90C120 90 115 100 110 105C105 110 100 110 95 105C90 100 90 95 95 90C100 85 105 85 110 90C115 95 120 90 120 90Z"
          stroke="#d4b08c"
          strokeWidth="1.5"
          fill="none"
          className="ornament"
        />

        {/* Infinity symbol in the center */}
        <path
          d="M120 90C115 85 110 85 105 90C100 95 100 100 105 105C110 110 115 110 120 105C125 100 130 100 135 105C140 110 145 110 150 105C155 100 155 95 150 90C145 85 140 85 135 90C130 95 125 95 120 90Z"
          stroke="#d4b08c"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 1"
          className="ornament"
        />

        {/* Sparkles - Rose Gold (Jessica) */}
        <circle cx="95" cy="52" r="2" fill="#ffd1d1" className="sparkle" />
        <circle cx="62" cy="90" r="2" fill="#ffd1d1" className="sparkle" />
        <circle cx="95" cy="128" r="2" fill="#ffd1d1" className="sparkle" />
        <circle cx="128" cy="90" r="2" fill="#ffd1d1" className="sparkle" />
        <circle cx="85" cy="62" r="1.5" fill="#ffd1d1" className="sparkle" />
        <circle cx="105" cy="62" r="1.5" fill="#ffd1d1" className="sparkle" />
        <circle cx="85" cy="118" r="1.5" fill="#ffd1d1" className="sparkle" />
        <circle cx="105" cy="118" r="1.5" fill="#ffd1d1" className="sparkle" />

        {/* Sparkles - Gold (Pablo) */}
        <circle cx="145" cy="52" r="2" fill="#ffeb99" className="sparkle" />
        <circle cx="112" cy="90" r="2" fill="#ffeb99" className="sparkle" />
        <circle cx="145" cy="128" r="2" fill="#ffeb99" className="sparkle" />
        <circle cx="178" cy="90" r="2" fill="#ffeb99" className="sparkle" />
        <circle cx="135" cy="62" r="1.5" fill="#ffeb99" className="sparkle" />
        <circle cx="155" cy="62" r="1.5" fill="#ffeb99" className="sparkle" />
        <circle cx="135" cy="118" r="1.5" fill="#ffeb99" className="sparkle" />
        <circle cx="155" cy="118" r="1.5" fill="#ffeb99" className="sparkle" />

        {/* Center sparkles */}
        <circle cx="120" cy="90" r="2" fill="#ffffff" className="sparkle" />
        <circle cx="115" cy="85" r="1.5" fill="#ffffff" className="sparkle" />
        <circle cx="125" cy="85" r="1.5" fill="#ffffff" className="sparkle" />
        <circle cx="115" cy="95" r="1.5" fill="#ffffff" className="sparkle" />
        <circle cx="125" cy="95" r="1.5" fill="#ffffff" className="sparkle" />

        {/* Hearts */}
        <path
          d="M120 60C120 60 115 55 110 60C105 65 110 70 120 80C130 70 135 65 130 60C125 55 120 60 120 60Z"
          fill="#edc3bf"
          opacity="0.8"
          className="heart"
        />
        <path
          d="M120 120C120 120 115 125 110 120C105 115 110 110 120 100C130 100 135 115 130 120C125 125 120 120 120 120Z"
          fill="#d4af37"
          opacity="0.8"
          className="heart"
        />
        <path
          d="M70 90C70 90 65 85 60 90C55 95 60 100 70 110C80 100 85 95 80 90C75 85 70 90 70 90Z"
          fill="#edc3bf"
          opacity="0.6"
          className="heart"
        />
        <path
          d="M170 90C170 90 175 85 180 90C185 95 180 100 170 110C160 100 155 95 160 90C165 85 170 90 170 90Z"
          fill="#d4af37"
          opacity="0.6"
          className="heart"
        />
      </svg>

      {/* Nombres debajo de los anillos */}
      <div className="flex justify-between mt-2 md:mt-4 text-sm sm:text-base font-medium">
        <span className="text-rose-700 font-serif tracking-wide">Jessica</span>
        <span style={{ color: "#d4af37" }} className="font-serif tracking-wide">
          Pablo
        </span>
      </div>
    </div>
  )
}
