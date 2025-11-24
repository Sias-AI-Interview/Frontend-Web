"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const activeLanguage = i18n.language
  const langs = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" }
  ]

  const containerRef = useRef(null)
  const buttonsRef = useRef([])
  const underlineRef = useRef(null)

  const [active, setActive] = useState(activeLanguage)

  useEffect(() => {
    const updateUnderline = () => {
      const activeIndex = langs.findIndex(l => l.code === active)
      const activeButton = buttonsRef.current[activeIndex]

      if (activeButton && underlineRef.current) {
        gsap.to(underlineRef.current, {
          width: activeButton.offsetWidth,
          left: activeButton.offsetLeft,
          duration: 0.4,
          ease: "power2.inOut"
        })
      }
    }

    setTimeout(updateUnderline, 0)

    const resizeObserver = new ResizeObserver(updateUnderline)
    if (containerRef.current) resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [active])

  const handleSwitch = (lng) => {
    i18n.changeLanguage(lng)
    setActive(lng)

    const idx = langs.findIndex(l => l.code === lng)
    const btn = buttonsRef.current[idx]

    if (btn) {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-2 rounded-lg border border-gray-600/40 bg-gray-900/40 p-1 backdrop-blur-sm transition-colors hover:border-gray-500/60"
    >
      <div className="relative flex gap-1">
        <div
          ref={underlineRef}
          className="pointer-events-none absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
          style={{ left: 0, width: 0 }}
        />

        {langs.map((lng, index) => (
          <button
            key={lng.code}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => handleSwitch(lng.code)}
            className={`relative px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${active === lng.code
                ? "text-cyan-300"
                : "text-gray-400 hover:text-gray-300"
              }`}
          >
            {lng.label}
          </button>
        ))}
      </div>
    </div>
  )
}
