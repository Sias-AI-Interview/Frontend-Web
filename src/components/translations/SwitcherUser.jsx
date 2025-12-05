import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"

import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function LanguageSwitcherUser() {
    const { i18n, t } = useTranslation()

    const activeLanguage = i18n.language || "id"

    const langs = [
        { code: "en", label: "English" },
        { code: "id", label: "Bahasa Indonesia" },
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
                    ease: "power2.inOut",
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
                ease: "power2.out",
            })
        }
    }

    return (
        <div className="space-y-2">
            <Label className="text-gray-300">
                {t("settings.appearance.language")}
            </Label>

            <Select
                value={active}
                onValueChange={handleSwitch}
            >
                <SelectTrigger className="border-[#6EACDA]/20 bg-[#021526] text-white">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent className="border-[#6EACDA]/20 bg-[#0a2a3f]">
                    {langs.map((lang, i) => (
                        <SelectItem
                            key={lang.code}
                            value={lang.code}
                            ref={(el) => (buttonsRef.current[i] = el)}
                        >
                            {lang.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
