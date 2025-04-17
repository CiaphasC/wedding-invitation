"use client"

import type React from "react"
import { useState, useCallback, memo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, Send, Heart, Mail, Phone, Users, MessageSquare, Calendar, Star } from "lucide-react"
import RsvpAnimations from "@/components/rsvp-animations"

interface FormData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
  attending: string
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  guests: "1",
  message: "",
  attending: "yes",
}

// Memoized form input component with enhanced glass effect
const FormInput = memo(function FormInput({
  label,
  id,
  type,
  name,
  value,
  onChange,
  required = false,
  className = "",
  icon,
}: {
  label: string
  id: string
  type: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  required?: boolean
  className?: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className={`${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={id} className="block text-sm font-medium text-foreground/90 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-rose/10 via-gold/5 to-accent/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-accent/70 group-hover:text-accent transition-colors duration-300">
            {icon}
          </span>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-xl border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)]"
            placeholder={label}
          />
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-rose group-hover:w-full transition-all duration-500"></span>
        </div>
      </div>
    </motion.div>
  )
})

// Memoized form select component with enhanced glass effect
const FormSelect = memo(function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  options,
  className = "",
  icon,
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  className?: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className={`${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={id} className="block text-sm font-medium text-foreground/90 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-rose/10 via-gold/5 to-accent/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-accent/70 group-hover:text-accent transition-colors duration-300">
            {icon}
          </span>
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full appearance-none pl-10 pr-10 py-3 bg-white/20 backdrop-blur-xl border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)]"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 text-accent/70 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-rose group-hover:w-full transition-all duration-500"></span>
        </div>
      </div>
    </motion.div>
  )
})

// Memoized form textarea component with enhanced glass effect
const FormTextarea = memo(function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  rows = 3,
  className = "",
  icon,
}: {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      className={`${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={id} className="block text-sm font-medium text-foreground/90 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-rose/10 via-gold/5 to-accent/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex">
          <span className="absolute left-3 top-3 text-accent/70 group-hover:text-accent transition-colors duration-300">
            {icon}
          </span>
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-xl border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)]"
            placeholder={label}
          ></textarea>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-rose group-hover:w-full transition-all duration-500"></span>
        </div>
      </div>
    </motion.div>
  )
})

// Memoized radio group component with enhanced glass effect
const RadioGroup = memo(function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  className = "",
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: { value: string; label: string; icon: React.ReactNode }[]
  className?: string
}) {
  return (
    <motion.div
      className={`${className} relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-foreground/90 mb-2">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only peer"
            />
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-accent/20 bg-white/20 backdrop-blur-xl cursor-pointer transition-all duration-300
                          peer-checked:border-accent/60 peer-checked:bg-white/30 peer-checked:shadow-[0_8px_30px_rgba(212,175,55,0.2)]
                          hover:shadow-md hover:border-accent/40 hover:bg-white/30"
            >
              <span className="text-accent/70 peer-checked:text-accent transition-colors duration-300">
                {option.icon}
              </span>
              <span className="text-foreground/90">{option.label}</span>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent/0 peer-checked:bg-accent/80 transition-all duration-300 
                             peer-checked:scale-100 scale-0 peer-checked:opacity-100 opacity-0"
              >
                <Check className="w-3 h-3 text-white" />
              </span>
            </div>
          </label>
        ))}
      </div>
    </motion.div>
  )
})

// Success message component with enhanced animations
const SuccessMessage = memo(function SuccessMessage() {
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!successRef.current) return

    // Create confetti effect
    const createConfetti = () => {
      const colors = ["#edc3bf", "#d4b08c", "#d4af37", "#e8c4c4"]

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div")
        confetti.className = "absolute w-2 h-2 rounded-full animate-confetti"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${Math.random() * 100}%`
        confetti.style.top = "0"
        confetti.style.animationDelay = `${Math.random() * 2}s`
        confetti.style.animationDuration = `${3 + Math.random() * 2}s`

        successRef.current?.appendChild(confetti)

        setTimeout(() => {
          if (successRef.current?.contains(confetti)) {
            successRef.current.removeChild(confetti)
          }
        }, 5000)
      }
    }

    createConfetti()
  }, [])

  return (
    <motion.div
      ref={successRef}
      className="relative overflow-hidden text-center p-8 bg-white/30 backdrop-blur-xl rounded-2xl border border-accent/20 shadow-[0_10px_40px_rgba(212,175,55,0.25)]"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose/10 via-transparent to-gold/10 opacity-50"></div>
      <div className="relative z-10">
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping-slow"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-rose rounded-full shadow-lg">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </div>
        <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold mb-3">
          ¡Gracias por confirmar!
        </h3>
        <p className="text-foreground/90 text-lg mb-4">Hemos recibido tu confirmación. ¡Nos vemos en la boda!</p>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-accent to-rose rounded-full opacity-70"></div>
      </div>
    </motion.div>
  )
})

export const RsvpForm = memo(function RsvpForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const formElementsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    if (!formRef.current) return

    // Collect form elements for animations
    formElementsRef.current = Array.from(formRef.current.querySelectorAll(".form-element")) as HTMLElement[]
  }, [])

  // Memoized change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  // Memoized submit handler
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // In a real app, you would submit this data to your backend
      console.log("Form submitted:", formData)

      // Set submitted state to show success message
      setIsSubmitted(true)
    },
    [formData],
  )

  if (isSubmitted) {
    return (
      <div className="relative">
        <RsvpAnimations />
        <SuccessMessage />
      </div>
    )
  }

  return (
    <div className="relative">
      <RsvpAnimations />

      {/* Glass card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/30 border border-accent/20 shadow-[0_10px_40px_rgba(212,175,55,0.15)] p-6 md:p-8"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose/10 via-transparent to-gold/10 opacity-50"></div>

        {/* Form header */}
        <div className="relative mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-gold animate-pulse" />
              <h3 className="font-['Cormorant_Garamond'] text-3xl text-secondary font-semibold">
                Confirma tu asistencia
              </h3>
              <Star className="w-5 h-5 text-gold animate-pulse" />
            </div>
            <p className="text-foreground/80">Nos encantaría contar con tu presencia en nuestro día especial</p>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-accent to-rose rounded-full opacity-70"></div>
          </motion.div>
        </div>

        {/* Form content */}
        <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Nombre completo"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-element"
              icon={<Heart className="w-4 h-4" />}
            />

            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-element"
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Teléfono"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-element"
              icon={<Phone className="w-4 h-4" />}
            />

            <FormSelect
              label="Número de invitados"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              options={[
                { value: "1", label: "1 persona" },
                { value: "2", label: "2 personas" },
                { value: "3", label: "3 personas" },
                { value: "4", label: "4 personas" },
              ]}
              className="form-element"
              icon={<Users className="w-4 h-4" />}
            />
          </div>

          <RadioGroup
            label="¿Asistirás?"
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            options={[
              { value: "yes", label: "Sí, asistiré", icon: <Check className="w-4 h-4" /> },
              {
                value: "no",
                label: "No podré asistir",
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
            ]}
            className="form-element"
          />

          <FormTextarea
            label="Mensaje para los novios (opcional)"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-element"
            icon={<MessageSquare className="w-4 h-4" />}
          />

          <motion.div
            className="text-center form-element pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              variant="gold"
              size="pillLg"
              glowEffect={true}
              className="font-['Poppins'] transition-all duration-500 hardware-accelerated group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold/80 to-copper/80 group-hover:opacity-0 transition-opacity duration-500"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-rose opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" />
                <span>Confirmar Asistencia</span>
                <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full">
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <span className="absolute bottom-0 right-0 w-full h-0.5 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
                <span className="absolute left-0 top-0 h-full w-0.5 bg-white/30 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></span>
                <span className="absolute right-0 top-0 h-full w-0.5 bg-white/30 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></span>
              </span>
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
})
