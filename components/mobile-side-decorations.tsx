"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useWindowSize } from "@/hooks/use-window-size"

export default function MobileSideDecorations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftDecorRef = useRef<HTMLDivElement>(null)
  const rightDecorRef = useRef<HTMLDivElement>(null)

  // Referencias para las nuevas animaciones SVG
  const topDecorRef = useRef<HTMLDivElement>(null)
  const bottomDecorRef = useRef<HTMLDivElement>(null)
  const centerDecorRef = useRef<HTMLDivElement>(null)

  const { width } = useWindowSize()

  // Solo mostrar en móvil
  const isMobile = width < 768

  useEffect(() => {
    if (!isMobile || !containerRef.current || !leftDecorRef.current || !rightDecorRef.current) return

    // Configuración inicial para decoraciones laterales
    gsap.set([leftDecorRef.current, rightDecorRef.current], {
      opacity: 0.7,
    })

    // Configuración inicial para nuevas decoraciones
    if (topDecorRef.current && bottomDecorRef.current && centerDecorRef.current) {
      gsap.set([topDecorRef.current, bottomDecorRef.current, centerDecorRef.current], {
        opacity: 0,
        scale: 0.9,
      })
    }

    // Efecto de aparición para decoraciones laterales
    gsap.to([leftDecorRef.current, rightDecorRef.current], {
      opacity: 0.7,
      duration: 1.5,
      ease: "power2.inOut",
    })

    // Efecto de aparición para nuevas decoraciones
    if (topDecorRef.current && bottomDecorRef.current && centerDecorRef.current) {
      gsap.to(topDecorRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.8,
        delay: 0.3,
        ease: "power2.out",
      })

      gsap.to(bottomDecorRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.8,
        delay: 0.6,
        ease: "power2.out",
      })

      gsap.to(centerDecorRef.current, {
        opacity: 0.5,
        scale: 1,
        duration: 2,
        delay: 0.9,
        ease: "power2.out",
      })
    }

    // Función para manejar el efecto parallax basado en la orientación del dispositivo
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return

      // Convertir los valores de orientación a un rango utilizable
      const tiltY = Math.min(Math.max(event.beta, -10), 10) / 10 // -1 a 1 (inclinación adelante/atrás)
      const tiltX = Math.min(Math.max(event.gamma, -10), 10) / 10 // -1 a 1 (inclinación izquierda/derecha)

      // Aplicar el efecto parallax a decoraciones laterales
      gsap.to(leftDecorRef.current, {
        x: -5 - tiltX * 10,
        y: tiltY * 5,
        rotation: -tiltX * 2,
        duration: 0.5,
        ease: "power1.out",
      })

      gsap.to(rightDecorRef.current, {
        x: 5 + tiltX * 10,
        y: tiltY * 5,
        rotation: tiltX * 2,
        duration: 0.5,
        ease: "power1.out",
      })

      // Aplicar efecto parallax a nuevas decoraciones
      if (topDecorRef.current && bottomDecorRef.current && centerDecorRef.current) {
        gsap.to(topDecorRef.current, {
          x: tiltX * 15,
          y: -5 + tiltY * 8,
          rotation: tiltX * 3,
          duration: 0.6,
          ease: "power1.out",
        })

        gsap.to(bottomDecorRef.current, {
          x: -tiltX * 15,
          y: 5 + tiltY * 8,
          rotation: -tiltX * 3,
          duration: 0.6,
          ease: "power1.out",
        })

        gsap.to(centerDecorRef.current, {
          x: tiltX * 20,
          y: tiltY * 15,
          scale: 1 + Math.abs(tiltX) * 0.05,
          duration: 0.7,
          ease: "power1.out",
        })
      }
    }

    // Función para manejar el efecto parallax basado en el movimiento del mouse/táctil
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY

      if ("touches" in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const moveX = (clientX / window.innerWidth - 0.5) * 2 // -1 a 1
      const moveY = (clientY / window.innerHeight - 0.5) * 2 // -1 a 1

      // Aplicar efecto parallax a decoraciones laterales
      gsap.to(leftDecorRef.current, {
        x: -5 - moveX * 10,
        y: moveY * 5,
        rotation: -moveX * 2,
        duration: 0.5,
        ease: "power1.out",
      })

      gsap.to(rightDecorRef.current, {
        x: 5 + moveX * 10,
        y: moveY * 5,
        rotation: moveX * 2,
        duration: 0.5,
        ease: "power1.out",
      })

      // Aplicar efecto parallax a nuevas decoraciones
      if (topDecorRef.current && bottomDecorRef.current && centerDecorRef.current) {
        gsap.to(topDecorRef.current, {
          x: moveX * 15,
          y: -5 + moveY * 8,
          rotation: moveX * 3,
          duration: 0.6,
          ease: "power1.out",
        })

        gsap.to(bottomDecorRef.current, {
          x: -moveX * 15,
          y: 5 + moveY * 8,
          rotation: -moveX * 3,
          duration: 0.6,
          ease: "power1.out",
        })

        gsap.to(centerDecorRef.current, {
          x: moveX * 20,
          y: moveY * 15,
          scale: 1 + Math.abs(moveX) * 0.05,
          duration: 0.7,
          ease: "power1.out",
        })
      }
    }

    // Función para manejar el efecto parallax basado en el desplazamiento
    const handleScroll = () => {
      if (!topDecorRef.current || !bottomDecorRef.current || !centerDecorRef.current) return

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const scrollFactor = scrollY / windowHeight // Factor de desplazamiento normalizado

      // Aplicar efecto parallax basado en desplazamiento
      gsap.to(topDecorRef.current, {
        y: -5 - scrollFactor * 30,
        opacity: Math.max(0.1, 0.6 - scrollFactor * 0.3),
        duration: 0.3,
      })

      gsap.to(bottomDecorRef.current, {
        y: 5 + scrollFactor * 40,
        opacity: Math.max(0.1, 0.6 - scrollFactor * 0.3),
        duration: 0.3,
      })

      gsap.to(centerDecorRef.current, {
        scale: 1 + scrollFactor * 0.1,
        opacity: Math.max(0.1, 0.5 - scrollFactor * 0.2),
        duration: 0.3,
      })
    }

    // Registrar eventos
    window.addEventListener("deviceorientation", handleDeviceOrientation)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Animación sutil continua para dar vida a las decoraciones laterales
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.to(leftDecorRef.current, {
      y: "+=5",
      rotation: "-=1",
      duration: 3,
      ease: "sine.inOut",
    }).to(leftDecorRef.current, {
      y: "-=5",
      rotation: "+=1",
      duration: 3,
      ease: "sine.inOut",
    })

    const tr = gsap.timeline({ repeat: -1, yoyo: true })

    tr.to(rightDecorRef.current, {
      y: "-=5",
      rotation: "+=1",
      duration: 3.5,
      ease: "sine.inOut",
    }).to(rightDecorRef.current, {
      y: "+=5",
      rotation: "-=1",
      duration: 3.5,
      ease: "sine.inOut",
    })

    // Animaciones continuas para las nuevas decoraciones
    if (topDecorRef.current && bottomDecorRef.current && centerDecorRef.current) {
      const ttop = gsap.timeline({ repeat: -1, yoyo: true })
      ttop
        .to(topDecorRef.current, {
          y: "-=8",
          rotation: "+=2",
          scale: 1.03,
          duration: 4,
          ease: "sine.inOut",
        })
        .to(topDecorRef.current, {
          y: "+=8",
          rotation: "-=2",
          scale: 1,
          duration: 4,
          ease: "sine.inOut",
        })

      const tbottom = gsap.timeline({ repeat: -1, yoyo: true })
      tbottom
        .to(bottomDecorRef.current, {
          y: "+=8",
          rotation: "-=2",
          scale: 1.03,
          duration: 4.5,
          ease: "sine.inOut",
        })
        .to(bottomDecorRef.current, {
          y: "-=8",
          rotation: "+=2",
          scale: 1,
          duration: 4.5,
          ease: "sine.inOut",
        })

      const tcenter = gsap.timeline({ repeat: -1, yoyo: true })
      tcenter
        .to(centerDecorRef.current, {
          rotation: "+=3",
          scale: 1.05,
          duration: 5,
          ease: "sine.inOut",
        })
        .to(centerDecorRef.current, {
          rotation: "-=3",
          scale: 1,
          duration: 5,
          ease: "sine.inOut",
        })
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      tl.kill()
      tr.kill()

      // Limpiar las nuevas animaciones
      gsap.killTweensOf([topDecorRef.current, bottomDecorRef.current, centerDecorRef.current])
    }
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Decoración superior con nuevo diseño SVG */}
      <div ref={topDecorRef} className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ opacity: 0 }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 390 120"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Patrón de encaje superior */}
          <path
            d="M-10,40 C30,10 60,50 100,30 C140,10 180,40 220,20 C260,0 300,30 340,10 C380,-10 420,20 450,0"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            strokeOpacity="0.6"
          />

          <path
            d="M-10,50 C30,20 60,60 100,40 C140,20 180,50 220,30 C260,10 300,40 340,20 C380,0 420,30 450,10"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
            strokeDasharray="4 3"
          />

          {/* Elementos florales decorativos */}
          <g transform="translate(50, 60)">
            <circle cx="0" cy="0" r="6" fill="#edc3bf" fillOpacity="0.3" />
            <path
              d="M0 -10C3 -7 7 -3 7 0C7 3 3 7 0 10C-3 7 -7 3 -7 0C-7 -3 -3 -7 0 -10Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
          </g>

          <g transform="translate(150, 40)">
            <circle cx="0" cy="0" r="8" fill="#edc3bf" fillOpacity="0.25" />
            <path
              d="M0 -12C4 -8 8 -4 8 0C8 4 4 8 0 12C-4 8 -8 4 -8 0C-8 -4 -4 -8 0 -12Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
            <path
              d="M-12 0C-8 -4 -4 -8 0 -8C4 -8 8 -4 12 0C8 4 4 8 0 8C-4 8 -8 4 -12 0Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
          </g>

          <g transform="translate(250, 70)">
            <circle cx="0" cy="0" r="5" fill="#edc3bf" fillOpacity="0.3" />
            <path
              d="M0 -8C2.5 -5.5 5.5 -2.5 5.5 0C5.5 2.5 2.5 5.5 0 8C-2.5 5.5 -5.5 2.5 -5.5 0C-5.5 -2.5 -2.5 -5.5 0 -8Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
          </g>

          <g transform="translate(330, 50)">
            <circle cx="0" cy="0" r="7" fill="#edc3bf" fillOpacity="0.25" />
            <path
              d="M-10 0C-7 -3 -3 -7 0 -7C3 -7 7 -3 10 0C7 3 3 7 0 7C-3 7 -7 3 -10 0Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
          </g>

          {/* Pequeños puntos decorativos */}
          <circle cx="30" cy="30" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="100" cy="20" r="1.5" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="180" cy="25" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="220" cy="15" r="1.5" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="280" cy="30" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="350" cy="25" r="1.5" fill="#edc3bf" fillOpacity="0.4" />

          {/* Líneas curvas decorativas */}
          <path
            d="M20,80 C50,70 80,90 110,75 C140,60 170,80 200,65"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
          />

          <path
            d="M200,85 C230,70 260,90 290,75 C320,60 350,80 380,65"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* Decoración central con nuevo diseño SVG */}
      <div
        ref={centerDecorRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mandala central */}
          <circle cx="100" cy="100" r="50" stroke="#edc3bf" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="#edc3bf" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="#edc3bf" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />

          {/* Pétalos decorativos */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x1 = 100 + 50 * Math.cos(angle)
            const y1 = 100 + 50 * Math.sin(angle)
            const x2 = 100 + 70 * Math.cos(angle)
            const y2 = 100 + 70 * Math.sin(angle)

            return (
              <g key={i}>
                <path
                  d={`M${x1},${y1} Q${100 + 65 * Math.cos(angle + 0.2)},${100 + 65 * Math.sin(angle + 0.2)} ${x2},${y2} Q${100 + 65 * Math.cos(angle - 0.2)},${100 + 65 * Math.sin(angle - 0.2)} ${x1},${y1}`}
                  stroke="#edc3bf"
                  strokeWidth="0.5"
                  fill="#edc3bf"
                  fillOpacity="0.15"
                  strokeOpacity="0.4"
                />
              </g>
            )
          })}

          {/* Puntos decorativos */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x = 100 + 60 * Math.cos(angle)
            const y = 100 + 60 * Math.sin(angle)

            return <circle key={i} cx={x} cy={y} r="2" fill="#edc3bf" fillOpacity="0.4" />
          })}

          {/* Centro ornamental */}
          <circle cx="100" cy="100" r="10" fill="#edc3bf" fillOpacity="0.2" />
          <circle cx="100" cy="100" r="5" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="100" cy="100" r="2" fill="#edc3bf" fillOpacity="0.4" />

          {/* Líneas radiales */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const x1 = 100 + 20 * Math.cos(angle)
            const y1 = 100 + 20 * Math.sin(angle)
            const x2 = 100 + 40 * Math.cos(angle)
            const y2 = 100 + 40 * Math.sin(angle)

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#edc3bf"
                strokeWidth="0.5"
                strokeOpacity="0.3"
                strokeDasharray={i % 2 === 0 ? "2 2" : ""}
              />
            )
          })}
        </svg>
      </div>

      {/* Decoración inferior con nuevo diseño SVG */}
      <div
        ref={bottomDecorRef}
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 390 120"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Patrón de encaje inferior */}
          <path
            d="M-10,80 C30,110 60,70 100,90 C140,110 180,80 220,100 C260,120 300,90 340,110 C380,130 420,100 450,120"
            stroke="#edc3bf"
            strokeWidth="1"
            fill="none"
            strokeOpacity="0.6"
          />

          <path
            d="M-10,70 C30,100 60,60 100,80 C140,100 180,70 220,90 C260,110 300,80 340,100 C380,120 420,90 450,110"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
            strokeDasharray="4 3"
          />

          {/* Elementos florales decorativos */}
          <g transform="translate(70, 60)">
            <circle cx="0" cy="0" r="7" fill="#edc3bf" fillOpacity="0.25" />
            <path
              d="M-10 0C-7 -3 -3 -7 0 -7C3 -7 7 -3 10 0C7 3 3 7 0 7C-3 7 -7 3 -10 0Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
          </g>

          <g transform="translate(180, 70)">
            <circle cx="0" cy="0" r="8" fill="#edc3bf" fillOpacity="0.25" />
            <path
              d="M0 -12C4 -8 8 -4 8 0C8 4 4 8 0 12C-4 8 -8 4 -8 0C-8 -4 -4 -8 0 -12Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
            <path
              d="M-12 0C-8 -4 -4 -8 0 -8C4 -8 8 -4 12 0C8 4 4 8 0 8C-4 8 -8 4 -12 0Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.15"
            />
          </g>

          <g transform="translate(290, 50)">
            <circle cx="0" cy="0" r="6" fill="#edc3bf" fillOpacity="0.3" />
            <path
              d="M0 -10C3 -7 7 -3 7 0C7 3 3 7 0 10C-3 7 -7 3 -7 0C-7 -3 -3 -7 0 -10Z"
              stroke="#edc3bf"
              strokeWidth="0.8"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
          </g>

          {/* Pequeños puntos decorativos */}
          <circle cx="40" cy="90" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="120" cy="100" r="1.5" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="200" cy="95" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="240" cy="105" r="1.5" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="320" cy="90" r="2" fill="#edc3bf" fillOpacity="0.4" />
          <circle cx="360" cy="100" r="1.5" fill="#edc3bf" fillOpacity="0.4" />

          {/* Líneas curvas decorativas */}
          <path
            d="M20,40 C50,50 80,30 110,45 C140,60 170,40 200,55"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
          />

          <path
            d="M200,35 C230,50 260,30 290,45 C320,60 350,40 380,55"
            stroke="#edc3bf"
            strokeWidth="0.8"
            fill="none"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* Decoración izquierda (original) */}
      <div
        ref={leftDecorRef}
        className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 60 800"
          fill="none"
          preserveAspectRatio="xMinYMin slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Línea vertical decorativa */}
          <path d="M20 0V800" stroke="#edc3bf" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.4" />

          {/* Flores y elementos decorativos a lo largo del lado */}
          {/* Flor superior */}
          <g transform="translate(20, 100)">
            <circle cx="0" cy="0" r="8" fill="#edc3bf" fillOpacity="0.3" />
            <path
              d="M0 -12C0 -12 -8 -4 -8 0C-8 4 0 12 0 12C0 12 8 4 8 0C8 -4 0 -12 0 -12Z"
              stroke="#edc3bf"
              strokeWidth="1.2"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M-12 0C-12 0 -4 -8 0 -8C4 -8 12 0 12 0C12 0 4 8 0 8C-4 8 -12 0 -12 0Z"
              stroke="#edc3bf"
              strokeWidth="1.2"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
          </g>

          {/* Hojas decorativas */}
          <g transform="translate(15, 200)">
            <path
              d="M0 0C0 0 15 15 0 30C-15 15 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path d="M0 0V30" stroke="#edc3bf" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>

          {/* Círculos decorativos */}
          <circle cx="20" cy="300" r="6" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="20" cy="320" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="20" cy="335" r="1.5" fill="#edc3bf" fillOpacity="0.3" />

          {/* Rosa central */}
          <g transform="translate(25, 400)">
            <circle cx="0" cy="0" r="4" fill="#edc3bf" fillOpacity="0.4" />
            <path
              d="M0 0C0 0 -5 -5 0 -10C5 -5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 5 -5 10 0C5 5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 5 5 0 10C-5 5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 -5 5 -10 0C-5 -5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path d="M0 10V25" stroke="#edc3bf" strokeWidth="1" />
            <path d="M0 15C0 15 -5 15 -5 20C-5 20 0 20 0 20" stroke="#edc3bf" strokeWidth="0.8" />
          </g>

          {/* Espirales decorativas */}
          <path d="M20 500C20 500 30 510 20 520C10 530 20 540 30 540" stroke="#edc3bf" strokeWidth="1" fill="none" />

          {/* Pequeñas flores inferiores */}
          <g transform="translate(20, 600)">
            <circle cx="0" cy="0" r="5" fill="#edc3bf" fillOpacity="0.3" />
            <path d="M-7 -7L7 7M-7 7L7 -7" stroke="#edc3bf" strokeWidth="1" />
          </g>

          <g transform="translate(20, 650)">
            <circle cx="0" cy="0" r="3" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="0" cy="-8" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="8" cy="0" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="0" cy="8" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="-8" cy="0" r="2" fill="#edc3bf" fillOpacity="0.3" />
          </g>

          {/* Puntos decorativos finales */}
          <circle cx="20" cy="700" r="4" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="20" cy="720" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="20" cy="735" r="2" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="20" cy="745" r="1" fill="#edc3bf" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Decoración derecha (original) */}
      <div
        ref={rightDecorRef}
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 60 800"
          fill="none"
          preserveAspectRatio="xMaxYMin slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Línea vertical decorativa */}
          <path d="M40 0V800" stroke="#edc3bf" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.4" />

          {/* Elementos decorativos a lo largo del lado derecho */}
          {/* Patrón de hojas */}
          <g transform="translate(40, 80)">
            <path
              d="M0 0C0 0 -15 15 0 30C15 15 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path d="M0 0V30" stroke="#edc3bf" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>

          {/* Círculos decorativos */}
          <circle cx="40" cy="150" r="6" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="170" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="185" r="1.5" fill="#edc3bf" fillOpacity="0.3" />

          {/* Flor estilizada */}
          <g transform="translate(40, 250)">
            <circle cx="0" cy="0" r="8" fill="#edc3bf" fillOpacity="0.3" />
            <path
              d="M0 -12C0 -12 8 -4 8 0C8 4 0 12 0 12C0 12 -8 4 -8 0C-8 -4 0 -12 0 -12Z"
              stroke="#edc3bf"
              strokeWidth="1.2"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M12 0C12 0 4 -8 0 -8C-4 -8 -12 0 -12 0C-12 0 -4 8 0 8C4 8 12 0 12 0Z"
              stroke="#edc3bf"
              strokeWidth="1.2"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
          </g>

          {/* Rosa central */}
          <g transform="translate(35, 350)">
            <circle cx="0" cy="0" r="4" fill="#edc3bf" fillOpacity="0.4" />
            <path
              d="M0 0C0 0 5 -5 0 -10C-5 -5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 -5 -5 -10 0C-5 5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 -5 5 0 10C5 5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path
              d="M0 0C0 0 5 5 10 0C5 -5 0 0 0 0Z"
              stroke="#edc3bf"
              strokeWidth="1"
              fill="#edc3bf"
              fillOpacity="0.2"
            />
            <path d="M0 10V25" stroke="#edc3bf" strokeWidth="1" />
            <path d="M0 15C0 15 5 15 5 20C5 20 0 20 0 20" stroke="#edc3bf" strokeWidth="0.8" />
          </g>

          {/* Espirales decorativas */}
          <path d="M40 450C40 450 30 460 40 470C50 480 40 490 30 490" stroke="#edc3bf" strokeWidth="1" fill="none" />

          {/* Patrón de puntos */}
          <circle cx="40" cy="520" r="4" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="535" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="550" r="4" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="565" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="580" r="4" fill="#edc3bf" fillOpacity="0.3" />

          {/* Flor inferior */}
          <g transform="translate(40, 650)">
            <circle cx="0" cy="0" r="3" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="0" cy="-8" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="8" cy="0" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="0" cy="8" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="-8" cy="0" r="2" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="-5.5" cy="-5.5" r="1.5" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="5.5" cy="-5.5" r="1.5" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="5.5" cy="5.5" r="1.5" fill="#edc3bf" fillOpacity="0.3" />
            <circle cx="-5.5" cy="5.5" r="1.5" fill="#edc3bf" fillOpacity="0.3" />
          </g>

          {/* Puntos decorativos finales */}
          <circle cx="40" cy="700" r="4" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="720" r="3" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="735" r="2" fill="#edc3bf" fillOpacity="0.3" />
          <circle cx="40" cy="745" r="1" fill="#edc3bf" fillOpacity="0.3" />
        </svg>
      </div>
    </div>
  )
}
