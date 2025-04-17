"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useWindowSize } from "@/hooks/use-window-size"

export default function ContentBackgroundDecorations() {
  const decorationsRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { width, height } = useWindowSize()
  const isMobile = width < 768

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }

    // Only add mouse move listener on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Apply parallax effect based on mouse position
  useEffect(() => {
    if (!decorationsRef.current) return

    const leftElements = decorationsRef.current.querySelectorAll(".left-decoration")
    const rightElements = decorationsRef.current.querySelectorAll(".right-decoration")
    const floatingElements = decorationsRef.current.querySelectorAll(".floating-decoration")

    // Apply different parallax effects based on element position
    leftElements.forEach((element, index) => {
      const depth = 0.05 + (index % 3) * 0.02
      gsap.to(element, {
        x: mousePosition.x * -30 * depth,
        y: mousePosition.y * -20 * depth,
        rotation: mousePosition.x * -5 * depth,
        duration: 1,
        ease: "power2.out",
      })
    })

    rightElements.forEach((element, index) => {
      const depth = 0.05 + (index % 3) * 0.02
      gsap.to(element, {
        x: mousePosition.x * 30 * depth,
        y: mousePosition.y * -20 * depth,
        rotation: mousePosition.x * 5 * depth,
        duration: 1,
        ease: "power2.out",
      })
    })

    floatingElements.forEach((element, index) => {
      const depth = 0.08 + (index % 3) * 0.03
      gsap.to(element, {
        x: mousePosition.x * 40 * depth,
        y: mousePosition.y * 30 * depth,
        rotation: mousePosition.x * 10 * depth,
        duration: 1.2,
        ease: "power2.out",
      })
    })
  }, [mousePosition])

  // Initial animations
  useEffect(() => {
    if (!decorationsRef.current) return

    // Animate in the decorations
    const elements = decorationsRef.current.querySelectorAll("svg")

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
      },
    )

    // Continuous subtle animations for floating elements
    const floatingElements = decorationsRef.current.querySelectorAll(".floating-decoration")

    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: `${Math.sin(index) * 15}px`,
        rotation: Math.sin(index) * 5,
        duration: 3 + (index % 2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [])

  return (
    <div ref={decorationsRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Left side decorations */}
      <div className="absolute left-0 top-0 h-full w-1/6 flex flex-col justify-between">
        {/* Top left corner decoration */}
        <svg
          className="left-decoration w-full max-w-[180px] h-auto opacity-70"
          viewBox="0 0 100 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,10 Q30,30 20,60 T30,100 Q40,130 20,160 T10,190"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M10,10 C40,20 60,40 30,60 S40,100 20,120 S30,150 10,190"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3 5"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="20"
            cy="60"
            r="5"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="30"
            cy="100"
            r="8"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="20"
            cy="140"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>

        {/* Middle left decoration */}
        <svg
          className="left-decoration w-full max-w-[150px] h-auto opacity-70 ml-4 md:ml-8"
          viewBox="0 0 100 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20,10 C40,30 30,50 50,70 S40,90 60,110 S50,130 70,140"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M50,70 C60,60 70,65 80,60"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
          />
          <path
            d="M60,110 C70,100 75,105 85,95"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
            style={{ animationDelay: "0.4s" }}
          />
          <path
            d="M50,70 C45,60 40,55 30,50"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
            style={{ animationDelay: "0.6s" }}
          />
          <circle
            cx="80"
            cy="60"
            r="7"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="85"
            cy="95"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            cx="30"
            cy="50"
            r="5"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.6s" }}
          />
        </svg>

        {/* Bottom left decoration */}
        <svg
          className="left-decoration w-full max-w-[120px] h-auto opacity-70"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,100 C30,80 20,60 40,40 S30,20 50,10"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M10,100 C20,90 25,85 30,70"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
          />
          <path
            d="M40,40 C50,35 55,30 60,20"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="30"
            cy="70"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="60"
            cy="20"
            r="7"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.3s" }}
          />
        </svg>
      </div>

      {/* Right side decorations */}
      <div className="absolute right-0 top-0 h-full w-1/6 flex flex-col justify-between items-end">
        {/* Top right corner decoration */}
        <svg
          className="right-decoration w-full max-w-[160px] h-auto opacity-70"
          viewBox="0 0 100 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M90,10 Q70,30 80,60 T70,100 Q60,130 80,160"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M90,10 C60,20 40,40 70,60 S60,100 80,120 S70,150 90,170"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3 5"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="80"
            cy="60"
            r="5"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="70"
            cy="100"
            r="8"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.5s" }}
          />
          <circle
            cx="80"
            cy="140"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.8s" }}
          />
        </svg>

        {/* Middle right decoration */}
        <svg
          className="right-decoration w-full max-w-[140px] h-auto opacity-70 mr-4 md:mr-8"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80,10 C60,30 70,50 50,70 S60,90 40,110 S50,130 30,140"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M50,70 C40,60 30,65 20,60"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
          />
          <path
            d="M40,110 C30,100 25,105 15,95"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            cx="20"
            cy="60"
            r="7"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="15"
            cy="95"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>

        {/* Bottom right decoration */}
        <svg
          className="right-decoration w-full max-w-[130px] h-auto opacity-70"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M90,100 C70,80 80,60 60,40 S70,20 50,10"
            stroke="#e8c4c4"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M90,100 C80,90 75,85 70,70"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
          />
          <path
            d="M60,40 C50,35 45,30 40,20"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="rose-stem"
            style={{ animationDelay: "0.3s" }}
          />
          <circle
            cx="70"
            cy="70"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.2"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
          />
          <circle
            cx="40"
            cy="20"
            r="7"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="rose-petal"
            style={{ animationDelay: "0.3s" }}
          />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0">
        {/* Top floating decoration */}
        <svg
          className="floating-decoration absolute top-[15%] left-[25%] w-16 h-16 opacity-60"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="25"
            cy="25"
            r="8"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-pulse-soft"
          />
          <path
            d="M25,15 C28,18 28,22 25,25 C22,28 18,28 15,25"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M25,35 C22,32 22,28 25,25 C28,22 32,22 35,25"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="animate-draw-svg"
            style={{ animationDelay: "0.3s" }}
          />
        </svg>

        {/* Middle floating decoration */}
        <svg
          className="floating-decoration absolute top-[45%] right-[30%] w-14 h-14 opacity-60"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15,15 C25,20 30,25 35,35"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="animate-draw-svg"
          />
          <path
            d="M35,15 C25,20 20,25 15,35"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeLinecap="round"
            className="animate-draw-svg"
            style={{ animationDelay: "0.2s" }}
          />
          <circle
            cx="25"
            cy="25"
            r="6"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-pulse-soft"
          />
        </svg>

        {/* Bottom floating decoration */}
        <svg
          className="floating-decoration absolute bottom-[20%] left-[40%] w-12 h-12 opacity-60"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="10"
            stroke="#e8c4c4"
            strokeWidth="1"
            strokeDasharray="2 4"
            className="animate-spin-slow"
          />
          <circle
            cx="20"
            cy="20"
            r="5"
            fill="#e8c4c4"
            fillOpacity="0.15"
            stroke="#e8c4c4"
            strokeWidth="1"
            className="animate-pulse-soft"
          />
        </svg>
      </div>

      {/* Additional small decorative elements - only show on larger screens */}
      {!isMobile && (
        <>
          <svg
            className="floating-decoration absolute top-[30%] right-[15%] w-10 h-10 opacity-50"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5,15 Q15,5 25,15 Q15,25 5,15"
              stroke="#e8c4c4"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-draw-svg"
            />
            <circle cx="15" cy="15" r="3" fill="#e8c4c4" fillOpacity="0.2" className="animate-pulse-soft" />
          </svg>

          <svg
            className="floating-decoration absolute bottom-[35%] left-[20%] w-8 h-8 opacity-50"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10,5 L20,25 M5,15 L25,15"
              stroke="#e8c4c4"
              strokeWidth="1"
              strokeLinecap="round"
              className="animate-draw-svg"
            />
            <circle cx="15" cy="15" r="2" fill="#e8c4c4" fillOpacity="0.2" className="animate-pulse-soft" />
          </svg>
        </>
      )}
    </div>
  )
}
