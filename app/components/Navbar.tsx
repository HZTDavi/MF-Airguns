import Link from 'next/link';
import { Crosshair } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo e Nome */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-yellow-600 p-2 rounded-md group-hover:bg-yellow-500 transition">
                            <Crosshair className="text-black w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-wider uppercase">
                            M&F <span className="text-yellow-600">Air Guns</span>
                        </span>
                    </Link>

                    {/* Links Rápidos */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/sobre" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Sobre</Link>
                            <Link href="/armas" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Armas</Link>
                            <Link href="/acessorios" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">Acessórios</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
