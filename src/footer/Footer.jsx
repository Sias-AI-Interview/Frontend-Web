"use client"

import {
    FaBrain,
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaEnvelope
} from "react-icons/fa"

import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function FooterSectionLanding() {
    const { t } = useTranslation()

    const footerLinks = {
        product: t("footer.product.links", { returnObjects: true }),
        company: t("footer.company.links", { returnObjects: true }),
        resources: t("footer.resources.links", { returnObjects: true })
    }

    return (
        <footer className="py-16 px-6 border-t border-white/10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to='/'>
                            <div className="flex items-center gap-3 mb-4">
                                <img src='/images/logo/sias.svg?v=1' className="w-13" />
                                <span className="font-cushion text-lg font-semibold tracking-wide text-white">SIAS</span>
                            </div>
                        </Link>

                        <p className="text-slate-400 mb-6 max-w-sm">
                            {t("footer.brandDesc")}
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                aria-label={t("footer.social.twitter")}
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#6EACDA] hover:bg-[#6EACDA]/10 transition-all duration-300"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>

                            <a
                                href="#"
                                aria-label={t("footer.social.linkedin")}
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#6EACDA] hover:bg-[#6EACDA]/10 transition-all duration-300"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>

                            <a
                                href="#"
                                aria-label={t("footer.social.github")}
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#6EACDA] hover:bg-[#6EACDA]/10 transition-all duration-300"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>

                            <a
                                href="#"
                                aria-label={t("footer.social.mail")}
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#6EACDA] hover:bg-[#6EACDA]/10 transition-all duration-300"
                            >
                                <FaEnvelope className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            {t("footer.product.title")}
                        </h4>

                        <ul className="space-y-3">
                            {footerLinks.product.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-400 hover:text-[#6EACDA] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            {t("footer.company.title")}
                        </h4>

                        <ul className="space-y-3">
                            {footerLinks.company.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-400 hover:text-[#6EACDA] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            {t("footer.resources.title")}
                        </h4>

                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-slate-400 hover:text-[#6EACDA] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} SIAS. {t("footer.bottom.rights")}
                    </p>
                    <p className="text-slate-500 text-sm">{t("footer.bottom.made")}</p>
                </div>
            </div>
        </footer>
    )
}
