"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop",
        title: "Precisão Extrema",
        subtitle: "Conheça a nova linha FX Impact"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1599313836746-121855a824cb?q=80&w=2070&auto=format&fit=crop",
        title: "Acessórios Táticos",
        subtitle: "Equipamentos de alta performance"
    },
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play do carrossel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[500px] bg-zinc-900 overflow-hidden group">
            {/* Imagem de Fundo */}
            <div
                className="w-full h-full transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${slides[currentIndex].url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Overlay Escuro para o texto aparecer melhor */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Conteúdo do Texto */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-lg mb-4">
                    {slides[currentIndex].title}
                </h1>
                <p className="text-xl text-yellow-500 font-light tracking-widest uppercase">
                    {slides[currentIndex].subtitle}
                </p>
            </div>

            {/* Indicadores (Bolinhas) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-yellow-600 w-6' : 'bg-white/50'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
