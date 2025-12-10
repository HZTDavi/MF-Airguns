import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import HeroCarousel from '@/app/components/HeroCarousel';

export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-950 text-gray-100">
            <Navbar />
            <HeroCarousel />

            {/* Seção Principal de Navegação */}
            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
                        Categorias
                    </h2>
                    <div className="w-24 h-1 bg-yellow-600 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Sobre Nós */}
                    <Link href="/sobre" className="group relative block h-96 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                        {/* Simulação de imagem de fundo para o card */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555663748-03fdc46cfc94?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-transparent group-hover:border-yellow-600/50 transition-all duration-300 m-2 rounded">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Sobre Nós</h3>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Conheça a história da M&F Air Guns e nossa paixão pelo tiro esportivo.
                            </p>
                        </div>
                    </Link>

                    {/* Card 2: Armas */}
                    <Link href="/armas" className="group relative block h-96 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-transparent group-hover:border-yellow-600/50 transition-all duration-300 m-2 rounded">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Armas</h3>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Carabinas de pressão, PCP e rifles de alta precisão.
                            </p>
                            <span className="mt-4 px-4 py-2 bg-yellow-600 text-black font-bold text-xs uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                Ver Catálogo
                            </span>
                        </div>
                    </Link>

                    {/* Card 3: Acessórios */}
                    <Link href="/acessorios" className="group relative block h-96 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585844876273-047f6368d44d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-transparent group-hover:border-yellow-600/50 transition-all duration-300 m-2 rounded">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">Acessórios</h3>
                            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Lunetas, supressores, bipés e cronógrafos.
                            </p>
                            <span className="mt-4 px-4 py-2 bg-yellow-600 text-black font-bold text-xs uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                Ver Equipamentos
                            </span>
                        </div>
                    </Link>

                </div>
            </section>
        </main>
    );
}
