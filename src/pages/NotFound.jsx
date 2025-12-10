import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NotFound() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const floatingAnimation = {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br bg-[#021526] flex items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl w-full"
            >
                <Card className="shadow-2xl border-0 bg-[#021526]/90 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {/* 404 Illustration */}
                        <motion.div
                            animate={floatingAnimation}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                                >
                                    404
                                </motion.div>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-4 -right-4"
                                >
                                    <FileQuestion className="w-12 h-12 text-indigo-400 opacity-50" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div variants={itemVariants} className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
                                Halaman Tidak Ditemukan
                            </h1>
                            <p className="text-gray-500 text-lg mb-2">
                                Oops! Halaman yang Anda cari tidak tersedia.
                            </p>
                            <p className="text-gray-400">
                                URL mungkin salah atau halaman telah dipindahkan.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                onClick={() => navigate(-1)}
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto group hover:border-indigo-400 hover:text-indigo-600 transition-all"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                Kembali
                            </Button>

                            <Button
                                onClick={() => navigate("/")}
                                size="lg"
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group"
                            >
                                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                Ke Halaman Utama
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-12 pt-8 border-t border-gray-200"
                        >
                            <div className="flex items-center justify-center text-sm text-gray-500">
                                <Search className="w-4 h-4 mr-2" />
                                <span>Butuh bantuan? Hubungi support kami</span>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-20 -z-10"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -z-10"
                />
            </motion.div>
        </div>
    );
}